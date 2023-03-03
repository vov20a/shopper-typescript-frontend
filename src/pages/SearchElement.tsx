import React from 'react'
import { Col, Row } from 'react-bootstrap'
import SideBar from '../components/sidebar/SideBar'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../redux/store'
import { Product, selectCurrentPage, selectProductsCount, setCurrentPage } from '../redux/slices/productSlice'
import Loader from '../components/loader/Loader'
import { pagesCount } from '../utils/pagesCount'
import PaginationElement from '../components/PaginationElement'
import { fetchSearchProducts, fetchSearchProductsCount, selectSearch, selectSearchProducts, selectSearchStatus, selectSort } from '../redux/slices/filterSlice'
import { useFetchingBestProducts } from '../hooks/useFetchingBestProducts'
import ProductService from '../API/ProductService'
import ProductOneItem from '../components/ProductOneItem'



const CategoryElement: React.FC = () => {
    const dispatch = useAppDispatch()

    const products: Product[] = useSelector(selectSearchProducts)
    const status = useSelector(selectSearchStatus)
    const isLoading: boolean = status === 'loading'
    const errorProducts: string = status === 'error' ? 'error' : ''

    const limit: number = 6;
    const currentPage: number = useSelector(selectCurrentPage)
    const productsCount = useSelector(selectProductsCount);
    const pageCount = pagesCount(productsCount, limit);

    const search = useSelector(selectSearch)
    const sort = useSelector(selectSort)


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
        const params = {
            search,
            limit,
            startProduct: currentPage * limit - limit,
            sort: sort.sortProperty,
        };
        dispatch(fetchSearchProducts(params))
        dispatch(fetchSearchProductsCount({ search }))
        fetchBests();
        fetchRandomize()
    }, [search, currentPage, sort.sortProperty])

    if (errorProducts) {
        return <h1 style={{ height: "50vh", textAlign: 'center', paddingTop: 150 }}>{errorProducts}</h1>
    }

    return (
        <section className="main-content">
            <div className="content-title text-center">
                <h4><span >Search</span>  Product by <i>'{search}'</i></h4>
            </div>
            {!products.length && <h4>There are not products</h4>}
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
                                        <PaginationElement limit={limit} currentPage={currentPage}
                                            onChangePage={(page) => dispatch(setCurrentPage(page))} pageCount={pageCount} />
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