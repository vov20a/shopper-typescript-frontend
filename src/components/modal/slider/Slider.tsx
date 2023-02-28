import React from 'react'
import { Carousel } from 'react-bootstrap'
import { Product } from '../../../redux/slices/productSlice'
import "./Slider.css"


interface SliderProps {
    viewsProducts: Product[];
    setVisible: (isVisible: boolean) => void
}

const Slider: React.FC<SliderProps> = ({ viewsProducts, setVisible }) => {
    return (
        <Carousel id="carousel-product">
            {viewsProducts.map((product: Product) =>
                <Carousel.Item key={product._id}>
                    <img
                        className="d-block w-100"
                        src={product.productUrl}
                        alt="First slide"
                    />
                </Carousel.Item>
            )}
        </Carousel>
    )
}

export default Slider