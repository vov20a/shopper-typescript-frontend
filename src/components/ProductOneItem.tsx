import React from 'react'
import { Button, Col } from 'react-bootstrap';
import { Product } from '../redux/slices/productSlice';
import { Link, } from 'react-router-dom';
import star from "../assets/img/icons8-звезда-24.png"
import CartModal from './cart/CartModal';
import { useAppDispatch } from '../redux/store';
import { addItem } from '../redux/slices/cartSlice';
import { CartProduct, Category } from '../types/data';
import { convertProductToCart } from '../utils/convertProductToCart';


type ProductOneItemsProps = {
    product: Product;
}

const ProductOneItem: React.FC<ProductOneItemsProps> = ({ product }) => {
    const dispatch = useAppDispatch()

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

    let categoryRandomize: Category = {} as Category;
    if (product.category) {
        categoryRandomize = product.category[0];
    } else {
        categoryRandomize = product.categoryId;
    }

    const [description, setDescription] = React.useState<boolean>(false)
    const [isVisible, setVisible] = React.useState<boolean>(false)

    const cartHandle = () => {
        const cartProduct: CartProduct = convertProductToCart(product, sizeOption, colorOption)
        dispatch(addItem(cartProduct))
        setVisible(true);
    }
    return (
        <div className="product-box ">
            <span className="sale_tag "></span>
            <div className="img-background">
                <Link to={`/products/${categoryRandomize._id}/${product._id}`}><img src={product.productUrl}
                    alt=" " /></Link>
            </div>
            <div className="product-title">
                <Link to={`/products/${categoryRandomize._id}/${product._id}`} className="title ">{product.title}</Link>
            </div>
            <div className="product-title">
                <Link to={`/categories/${product.category ? product.category[0]._id : product.categoryId._id}`}
                    className="title ">{product.category ? product.category[0].title : product.categoryId?.title}</Link>
            </div>
            {description &&
                <div className="product-title">
                    <Link to={`/products/${categoryRandomize._id}/${product._id}`} className="title ">{product.description}</Link>
                </div>
            }
            <Button className="mt-2" variant={description ? "primary" : "light"} size="sm" onClick={() => setDescription(prev => !prev)}>{description ? "CLOSE" : "OPEN"} </Button>

            <div className="product-rating">
                {Array(...Array(product.rating)).map((_, i) =>
                    <img className='product-star' key={i} src={star} />
                )}
            </div>

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

            <div onClick={() => cartHandle()} className="product-price">
                <p className="price ">${product.price}</p>
            </div>
            {isVisible ? <CartModal isVisible={isVisible} setVisible={setVisible} /> : <></>}

        </div>
    )
}

export default ProductOneItem

