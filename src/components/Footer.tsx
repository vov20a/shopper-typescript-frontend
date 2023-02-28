import React from 'react'
import { Col, Row } from 'react-bootstrap'
import logo from '../assets/img/logo.png';

const Footer = () => {
    return (
        <>
            <section id="footer-bar">
                <Row>
                    <Col md={3} className="navigation">
                        <h4>Navigation</h4>
                        <ul className="nav">
                            <li><a href="./index.html">Homepage</a></li>
                            <li><a href="./about.html">About Us</a></li>
                            <li><a href="./contact.html">Contac Us</a></li>
                            <li><a href="./cart.html">Your Cart</a></li>
                            <li><a href="./register.html">Login</a></li>
                        </ul>
                    </Col>
                    <Col md={4} className="navigation">
                        <h4>My Account</h4>
                        <ul className="nav">
                            <li><a href="#">My Account</a></li>
                            <li><a href="#">Order History</a></li>
                            <li><a href="#">Wish List</a></li>
                            <li><a href="#">Newsletter</a></li>
                        </ul>
                    </Col>
                    <Col md={5} className="footer-logo">
                        <p className="logo"><img src={logo} className="site_logo" alt="" /></p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. the Lorem Ipsum has
                            been the industry's standard dummy text ever since the you.</p>
                    </Col>
                </Row>
            </section>
            <section id="copyright">
                <span>Copyright {new Date().getFullYear()} bootstrap v 4.2</span>
            </section>
        </>
    )
}

export default Footer