import React from 'react'
import { Button, Carousel } from 'react-bootstrap'
import { Product } from '../../redux/slices/productSlice'
import { Link } from 'react-router-dom';
import star from "../../assets/img/icons8-звезда-24.png"
import Loader from '../loader/Loader';
import ProductOneItem from '../ProductOneItem';


interface RandomizeProps {
    randomizeProducts: Product[];
    errorRandomizeProducts: string;
    isRandomizeLoading: boolean;
}

const Randomize: React.FC<RandomizeProps> = ({ randomizeProducts, errorRandomizeProducts, isRandomizeLoading }) => {

    const [description, setDescription] = React.useState<boolean>(false)
    // console.log(randomizeProducts)
    if (errorRandomizeProducts) {
        return <span>{errorRandomizeProducts}</span>
    }
    return (
        <>
            {isRandomizeLoading ? <Loader /> :
                <div id="carousel-sidebar" className="carousel slide" data-ride="carousel">
                    <h4 className="title-sidebar">
                        <span className="text ">Randomize</span>
                    </h4>
                    <Carousel slide={true} className=''>
                        {randomizeProducts.map((product) =>
                            <Carousel.Item className='carousel-item' key={product._id}>
                                <div className=" active ">
                                    <div className="container ">
                                        <ProductOneItem product={product} />
                                    </div>
                                </div>
                            </Carousel.Item>
                        )}
                    </Carousel>

                </div>
            }
        </>
    )
}

export default Randomize