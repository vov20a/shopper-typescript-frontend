import React from 'react'
import { Carousel } from 'react-bootstrap'
import banner1 from '../assets/img/carousel/banner-1.jpg'
import banner2 from '../assets/img/carousel/banner-2.jpg';

const HeaderSlider: React.FC = () => {
    return (
        <>
            <section className="homepage-slider" id="home-slider">
                <Carousel slide={false} className='fade'>
                    <Carousel.Item className='carousel-item'>
                        <img
                            className="d-block w-100"
                            src={banner1}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item className='carousel-item'>
                        <img
                            className="d-block w-100"
                            src={banner2}
                            alt="Second slide"
                        />
                        <div className="intro">
                            <h1>Mid season sale</h1>
                            <p><span>Up to 50% Off</span></p>
                            <p><span>On selected items online and in stores</span></p>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </section>
            <section className="header_text text-center">
                We stand for top quality templates. Our genuine developers always optimized bootstrap commercial templates.
                <br />Don't miss to use our cheap abd best bootstrap templates.
            </section>
        </>
    )
}

export default HeaderSlider