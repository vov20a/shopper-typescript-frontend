import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import SideBar from '../components/sidebar/SideBar'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../redux/store'
import { selectCategories } from '../redux/slices/categorySlice'
import { Product, fetchProducts, fetchProductsCount, selectCurrentPage, selectProducts, selectProductsCount, selectStatus, setCurrentPage } from '../redux/slices/productSlice'
import Loader from '../components/loader/Loader'
import { pagesCount } from '../utils/pagesCount'
import PaginationElement from '../components/PaginationElement'
import { Category } from '../types/data'
import { selectSort } from '../redux/slices/filterSlice'
import { useFetchingBestProducts } from '../hooks/useFetchingBestProducts'
import ProductService from '../API/ProductService'
import ProductOneItem from '../components/ProductOneItem'



const CategoryElement: React.FC = () => {
    const dispatch = useAppDispatch()
    const location = useLocation()

    const products = useSelector(selectProducts)
    const status = useSelector(selectStatus)
    const isLoading: boolean = status === 'loading'
    const errorProducts: string = status === 'error' ? 'error' : ''

    const { id } = useParams();
    const cats = useSelector(selectCategories)
    const cat = cats.find((cat: Category) => cat._id === id)
    const categoryParentId = cat?.categoryParent;
    const catParent = cats.find((cat: Category) => cat._id == categoryParentId || '')

    const limit: number = 6;
    const currentPage: number = useSelector(selectCurrentPage)
    const productsCount = useSelector(selectProductsCount);
    const pageCount = pagesCount(productsCount, limit);

    location.search = `page=${currentPage}`
    window.history.pushState(null, '', location.pathname + '?' + location.search);

    const sort = useSelector(selectSort)


    const [bestProducts, setBestProducts] = React.useState<Product[]>([])
    const [fetchBests, isBestLoading, bestError] = useFetchingBestProducts(async () => {
        const sort = '-rating';
        const data = await ProductService.getProducts(sort, limit, 0);
        setBestProducts(data);
    });

    const [randomizeProducts, setRandomizeProducts] = React.useState<Product[]>([])
    const [fetchRandomize, isRandomizeLoading, randomizeError] = useFetchingBestProducts(async () => {
        const data = await ProductService.getProductsRandomize();
        setRandomizeProducts(data);
    });

    React.useEffect(() => {
        const params = {
            categoryId: id !== 'all' ? id : undefined,
            limit,
            startProduct: 0,
            sort: sort.sortProperty,
        };
        dispatch(fetchProducts(params))
        dispatch(fetchProductsCount({ categoryId: id !== 'all' ? id : '' }))
        fetchBests();
        fetchRandomize()
    }, [id, sort])

    //startProduct other
    React.useEffect(() => {
        const params = {
            categoryId: id !== 'all' ? id : undefined,
            limit,
            startProduct: currentPage * limit - limit,
            sort: sort.sortProperty,
        };
        dispatch(fetchProducts(params))
        dispatch(fetchProductsCount({ categoryId: id !== 'all' ? id : '' }))
        fetchBests();
        fetchRandomize()
    }, [currentPage, sort])

    if (errorProducts) {
        return <h1 style={{ height: "50vh", textAlign: 'center', paddingTop: 150 }}>{errorProducts}</h1>
    }

    return (
        <section className="main-content">
            <div className="content-title text-center">
                <h4><span >{catParent?.title ? catParent?.title + ' / ' : ''}</span>  {cat?.title}</h4>
            </div>
            {isLoading ? <Loader /> :
                <Row>
                    <Col md={9}>
                        <Row>
                            {products.map((product) =>
                                <Col md={4} key={product._id}>
                                    <ProductOneItem product={product} />
                                </Col>
                            )}
                        </Row>
                        <hr />
                        <Row className="justify-content-md-center">
                            <Col md={6} >
                                <nav aria-label="Page navigation">
                                    {!isLoading && pageCount > 1 && (
                                        <PaginationElement limit={limit} currentPage={currentPage} onChangePage={(page) => dispatch(setCurrentPage(page))} pageCount={pageCount} />
                                    )}
                                </nav>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={3}>
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
        </section>
    )
}

export default CategoryElement