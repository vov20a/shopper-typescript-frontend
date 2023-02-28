import React from 'react'
import { Outlet, } from 'react-router-dom';
import { Col, Container, Row, Form, Navbar, Nav, NavDropdown, } from 'react-bootstrap';
import pageBanner from "../../assets/img/pageBanner.png"
import client1 from "../../assets/img/clients/1.png"
import client2 from "../../assets/img/clients/2.png"
import client3 from "../../assets/img/clients/3.png"
import client4 from "../../assets/img/clients/4.png"
import client5 from "../../assets/img/clients/14.png"
import client6 from "../../assets/img/clients/35.png"
import HeaderSlider from '../HeaderSlider';
import HeaderTop from '../HeaderTop';
import Footer from '../Footer';

type LayoutProps = {
    isMainLayout: boolean;
}


const Layout: React.FC<LayoutProps> = ({ isMainLayout }) => {
    return (
        <Container fluid>
            <HeaderTop />
            {isMainLayout ?
                <HeaderSlider />
                :
                <section>
                    <div className="product-bunner-layout" style={{ backgroundImage: `url(${pageBanner})` }}></div>
                </section>
            }
            <Outlet />
            <section className="our_client">
                <h4 className="title"><span className="text">Manufactures</span></h4>
                <Row>
                    <Col md={2} className="manufactores-item">
                        <a href="#"><img alt="" src={client1} /></a>
                    </Col>
                    <Col md={2} className="manufactores-item">
                        <a href="#"><img alt="" src={client2} /></a>
                    </Col>
                    <div className="col-md-2 manufactores-item">
                        <a href="#"><img alt="" src={client3} /></a>
                    </div>
                    <Col md={2} className="manufactores-item">
                        <a href="#"><img alt="" src={client4} /></a>
                    </Col>
                    <Col md={2} className="manufactores-item">
                        <a href="#"><img alt="" src={client5} /></a>
                    </Col>
                    <Col md={2} className="manufactores-item">
                        <a href="#"><img alt="" src={client6} /></a>
                    </Col>
                </Row>
            </section>

            <Footer />


        </Container >
    )
}

export default Layout