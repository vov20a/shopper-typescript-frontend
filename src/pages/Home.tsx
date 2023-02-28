import React from 'react';
import ProductList from '../components/PoductList';
import { fetchProducts, selectProducts } from '../redux/slices/productSlice';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { selectStatus } from '../redux/slices/productSlice';
import Loader from '../components/loader/Loader';
import { Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';



const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation()

    const products = useSelector(selectProducts);
    const status = useSelector(selectStatus);
    const isLoading = status === 'loading' || false;

    React.useEffect(() => {
        const params = {
            categoryId: '63ce9a9e790857857298139f',
            limit: 16,
            startProduct: 0,
            sort: ''
        };
        dispatch(fetchProducts(params));
    }, [dispatch])

    return (
        <>
            {location.state === 'sendEmail' &&
                <Alert variant='primary'>
                    На Ваш Email отправлено письмо!
                </Alert>}
            {isLoading ? <Loader /> :
                <ProductList products={products} />
            }
        </>
    );
}

export default Home;


