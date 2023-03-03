import React from 'react'
import { Product } from '../redux/slices/productSlice'
import { useParams } from 'react-router-dom'
import Loader from '../components/loader/Loader'
import { Carousel, Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import SideBar from '../components/sidebar/SideBar'
import ProductItem from '../components/ProductItem'
import Slider from '../components/modal/slider/Slider'
import ModalSlider from '../components/modal/ModalSlider'
import { useFetchingBestProducts } from '../hooks/useFetchingBestProducts'
import ProductService from '../API/ProductService'
import CartModal from '../components/cart/CartModal'
import { useAppDispatch } from '../redux/store'
import { addItem, setCountItem } from '../redux/slices/cartSlice'
import { CartProduct } from '../types/data'
import { convertProductToCart } from '../utils/convertProductToCart'

const ProductPage: React.FC = () => {
    const dispatch = useAppDispatch()

    const params = useParams();
    const [isVisible, setVisible] = React.useState<boolean>(false)
    const [product, setProduct] = React.useState<Product>({} as Product)
    const [cartProduct, setCartProduct] = React.useState<CartProduct>({} as CartProduct)

    const [isVisibleCart, setVisibleCart] = React.useState<boolean>(false)
    const [qtyValue, setQtyValue] = React.useState<number>(1)
    const handleQtyValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const num: number = Number(e.target.value);
        if (num) {
            setQtyValue(num)
        }
    }

    const sizeList = product.sizes;
    const colorList = product.colors;
    const [sizeOption, setSizeOption] = React.useState<number>(sizeList ? sizeList[0] : 0)
    const [colorOption, setColorOption] = React.useState<string>(colorList ? colorList[1] : '')
    const setColorHandle = (color: string) => {
        setColorOption(color)
    }
    const setSizeHandle = (size: number) => {
        setSizeOption(size)
    }

    const cartHandle = (product: Product) => {
        const cProduct: CartProduct = convertProductToCart(product, sizeOption, colorOption)
        dispatch(setCountItem(qtyValue))
        dispatch(addItem(cProduct))
        setVisibleCart(true);
    }

    const [productsRealated, setProductsRelated] = React.useState<Product[]>([])
    const [fetchRalated, isRelatedLoading, ralatedError] = useFetchingBestProducts(async () => {
        const data = await ProductService.getProductsRelated(params.cat_id);
        setProductsRelated(data);
    });

    const [bestProducts, setBestProducts] = React.useState<Product[]>([])
    const [fetchBests, isBestLoading, bestError] = useFetchingBestProducts(async () => {
        const sort = '-rating';
        const limit = 3;
        const data = await ProductService.getProducts(sort, limit, 0);
        setBestProducts(data);
    });

    const [randomizeProducts, setRandomizeProducts] = React.useState<Product[]>([])
    const [fetchRandomize, isRandomizeLoading, randomizeError] = useFetchingBestProducts(async () => {
        const data = await ProductService.getProductsRandomize();
        setRandomizeProducts(data);
    });

    React.useEffect(() => {
        fetchRalated();
        fetchBests();
        fetchRandomize()
    }, [params.id])
    // console.log(productsRealated, params.id)

    React.useEffect(() => {
        const productFind: Product | undefined = productsRealated.find((item: Product) => item._id === params.id);
        if (productFind) {
            setProduct(productFind);
            const cProduct: CartProduct = convertProductToCart(productFind, sizeOption, colorOption)
            setCartProduct(cProduct);
        }
    }, [productsRealated])

    const viewsProducts = productsRealated?.slice(0, 4);
    const relatedProducts1 = productsRealated?.slice(0, 3);
    const relatedProducts2 = productsRealated?.slice(3, 6);

    const sliderHandler = () => {
        setVisible(true)
    }

    if (ralatedError) {
        return <h1 style={{ height: "50vh", textAlign: 'center', paddingTop: 150 }}>{ralatedError}</h1>
    }
    return (
        <section className="main-content">
            <div className="content-title text-center">
                <h4><span >Product </span> Detail</h4>
            </div>
            {isRelatedLoading ? <Loader /> :
                <Row>
                    <Col md={9} >
                        <Row>
                            <Col md={5} className=" thumbnail">
                                <div className="thumbnail-img">
                                    <p className="fancybox thumbnail" data-fancybox-group="group1"
                                        title={product?.title}>
                                        <img onClick={sliderHandler} alt="" src={process.env.REACT_APP_API_URL + '/uploads/' + product?.productUrl} /></p>
                                </div>
                                <ul className="thumbnail-small">
                                    {viewsProducts.map((product: Product) =>
                                        <li className="w-md-20 w-100" key={product._id}>
                                            <a href={process.env.REACT_APP_API_URL + '/uploads/' + product.productUrl} className="fancybox thumbnail" data-fancybox-group="group1"
                                                title={product.description}><img src={process.env.REACT_APP_API_URL + '/uploads/' + product.productUrl} alt="" /></a>
                                        </li>
                                    )}
                                </ul>
                            </Col>
                            <Col md={7} >
                                <Row>
                                    <Col md={12} className="info-block">
                                        <address>
                                            <strong>Category:</strong> <span>{product?.categoryId?.title}</span><br />
                                            <strong>Product Code:</strong> <span>{product?.title}</span><br />
                                            <strong>Rating:</strong> <span>{product?.rating}</span><br />
                                        </address>
                                        <h4><strong>Price: ${product?.price}</strong></h4>
                                        <div className='product-box' style={{ maxHeight: 60, maxWidth: 240 }}>
                                            <div className='options-box'>
                                                <ul>
                                                    {colorList?.map((color) =>
                                                        <li onClick={() => setColorHandle(color)} key={color} className={color === colorOption ? 'active' : ''}>{color}</li>
                                                    )}
                                                </ul>
                                                <ul>
                                                    {sizeList?.map((size) =>
                                                        <li onClick={() => setSizeHandle(size)} key={size} className={size === sizeOption ? 'active' : ''}>{size}</li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <div className="form form-product">
                                            <label>Qty:</label>
                                            <input value={qtyValue} onChange={(e) => handleQtyValue(e)} type="text" className="col-2" placeholder="1" />
                                            <button onClick={() => cartHandle(product)} className="btn btn-cart" type="submit">Add to cart</button>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Tabs
                                    defaultActiveKey="profile"
                                    id="uncontrolled-tab-example"
                                    className="mb-3"
                                >
                                    <Tab eventKey="description" title="Description">
                                        <div className="tab-pane active tab-description">
                                            {product?.description}
                                        </div>
                                    </Tab>
                                    <Tab eventKey="profile" title="Profile">
                                        <div className="tab-pane tab-profile" >
                                            <table className="table table-striped shop_attributes">
                                                <tbody>
                                                    <tr className="">
                                                        <th>Size</th>
                                                        <td>{product?.sizes?.map((size) => <i key={size}>{size}, </i>)}</td>
                                                    </tr>
                                                    <tr className="alt">
                                                        <th>Color</th>
                                                        <td>{product?.colors?.map((color) => <i key={color}>{color}, </i>)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </Col>
                            <ModalSlider setVisible={setVisible} isVisible={isVisible}>
                                <Slider viewsProducts={viewsProducts} setVisible={setVisible} />
                            </ModalSlider>
                            <Col md={12}>
                                <div className="carousel-feature" data-ride="carousel">
                                    <h4 className="title">
                                        <span className="pull-left "><span className="text">Related</span><span
                                            className="line"><strong>Products</strong></span></span>
                                    </h4>
                                    <Carousel id="carousel-feature" interval={3000} >
                                        <Carousel.Item >
                                            <Container>
                                                <Row>
                                                    <ProductItem products={relatedProducts1} md={4} />
                                                </Row>

                                            </Container>
                                        </Carousel.Item>
                                        <Carousel.Item >
                                            <Container>
                                                <Row>
                                                    <ProductItem products={relatedProducts2} md={4} />
                                                </Row>

                                            </Container>
                                        </Carousel.Item>
                                    </Carousel>
                                </div>
                            </Col>
                        </Row>
                    </Col>

                    <Col md={3} >
                        <SideBar
                            errorRandomizeProducts={randomizeError}
                            isRandomizeLoading={isRandomizeLoading}
                            randomizeProducts={randomizeProducts}
                            errorBestProducts={bestError}
                            isBestLoading={isBestLoading}
                            bestProducts={bestProducts} />
                    </Col>
                </Row>
            }
            {isVisibleCart ? <CartModal isVisible={isVisibleCart} setVisible={setVisibleCart} /> : <></>}
        </section>
    )
}

export default ProductPage