import React from 'react'
import feature1 from "../assets/img/feature_img_1.png";
import feature2 from "../assets/img/feature_img_2.png";
import feature3 from "../assets/img/feature_img_3.png";
import { Col, Container, Row, Carousel } from 'react-bootstrap';
import { Product } from '../redux/slices/productSlice';
import ProductItem from './ProductItem';

type ProductListProps = {
    products: Product[];
}

const PoductList: React.FC<ProductListProps> = ({ products }) => {
    const car1 = products.slice(0, 4);
    const car2 = products.slice(4, 8);
    const car3 = products.slice(8, 12);
    const car4 = products.slice(12, 16);

    if (!products.length) {
        return <h1>There are not products</h1>
    }

    return (
        <section className="main-content">
            <Row>
                <Col md={12}>
                    <div data-ride="carousel">
                        <h4 className="title">
                            <span className="pull-left "><span className="text">Latest</span><span
                                className="line"><strong>Products</strong></span></span>
                        </h4>
                        <Carousel id="carousel-latest" interval={3000} >
                            <Carousel.Item >
                                <Container>
                                    <Row>
                                        <ProductItem products={car1} md={3} />
                                    </Row>

                                </Container>
                            </Carousel.Item>
                            <Carousel.Item >
                                <Container>
                                    <Row>
                                        <ProductItem products={car2} md={3} />
                                    </Row>

                                </Container>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <div className="carousel-feature" data-ride="carousel">
                        <h4 className="title">
                            <span className="pull-left "><span className="text">Feature</span><span
                                className="line"><strong>Products</strong></span></span>
                        </h4>
                        <Carousel id="carousel-feature" interval={2000} >
                            <Carousel.Item >
                                <Container>
                                    <Row>
                                        <ProductItem products={car3} md={3} />
                                    </Row>
                                </Container>
                            </Carousel.Item>
                            <Carousel.Item >
                                <Container>
                                    <Row>
                                        <ProductItem products={car4} md={3} />
                                    </Row>
                                </Container>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </Col>
            </Row>
            {/* feature box */}
            <Row className="feature_box">
                <Col md={4} >
                    <div className="service">
                        <div className="responsive">
                            <img src={feature2} alt="" />
                            <h4>MODERN <strong>DESIGN</strong></h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and printing industry unknown printer.
                            </p>
                        </div>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="service">
                        <div className="customize">
                            <img src={feature3} alt="" />
                            <h4>FREE <strong>SHIPPING</strong></h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and printing industry unknown printer.
                            </p>
                        </div>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="service">
                        <div className="support">
                            <img src={feature1} alt="" />
                            <h4>24/7 LIVE <strong>SUPPORT</strong></h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and printing industry unknown printer.
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </section >
    )
}

export default PoductList