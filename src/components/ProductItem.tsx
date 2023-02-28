import React from 'react'
import { Product } from '../redux/slices/productSlice'
import ProductOneItem from './ProductOneItem';
import { Col } from 'react-bootstrap';

type ProductItemsProps = {
    products: Product[];
    md: number
}

const ProductItem: React.FC<ProductItemsProps> = ({ products, md }) => {


    return (
        <>
            {
                products.map((product: Product) =>
                    <Col md={md} key={product._id}>
                        <ProductOneItem product={product} />
                    </Col>)
            }
        </>
    )
}

export default ProductItem;