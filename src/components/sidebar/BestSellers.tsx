import React from 'react'
import { Product } from '../../redux/slices/productSlice'
import { Link } from 'react-router-dom'
import Loader from '../loader/Loader'


interface BestSellersProps {
    bestProducts: Product[];
    errorBestProducts: string;
    isBestLoading: boolean;
}

const BestSellers: React.FC<BestSellersProps> = ({ bestProducts, errorBestProducts, isBestLoading }) => {

    if (errorBestProducts) {
        return <span>{errorBestProducts}</span>
    }

    return (
        <>
            {isBestLoading ? <Loader />
                :
                <ul className="small-product">
                    {bestProducts.map((product: Product) =>
                        <li key={product._id}>
                            <Link to={`/products/${product.categoryId._id}/${product._id}`}>
                                <img src={product.productUrl} alt={product.title} />
                            </Link>
                            <Link to={`/categories/${product.categoryId._id}`}>{product.categoryId.title}</Link> <br />
                            <span style={{ marginLeft: 60 }}>RATING:{product.rating}</span>
                        </li>
                    )}
                </ul>
            }
        </>
    )
}

export default BestSellers