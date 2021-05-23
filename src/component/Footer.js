import React from 'react';
import { Nav } from 'react-bootstrap'
import logo from '../images/logo.png'
class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <footer className="footer">
                    <div className='container'>
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="footer-flex">
                                <div className="company-logo">
                                    <img src={logo} alt="img13" />
                                </div>
                                <p className='text-color'>A one of its kind marketplace specially created to promote India's hand picked design & creative talents.</p>
                                </div>
                            </div>
                            <div className="col-sm-4 pleft">
                                <h4>Menu</h4>
                                <Nav className="flex-column">
                                    <Nav.Link href="/" className="text-color">Why Choose Us</Nav.Link>
                                    <Nav.Link href="/about-us" className="text-color">About Us</Nav.Link>
                                    <Nav.Link href="/contact-us" className="text-color">Contact US</Nav.Link>
                                    <Nav.Link href="/faq" className="text-color">How It Works</Nav.Link>
                                    <Nav.Link className="text-color">FAQ</Nav.Link>
                                    <Nav.Link href="/terms-and-conditions" className="text-color">Privacy &amp; Policy</Nav.Link>
                                </Nav>
                            </div>
                            <div className="col-sm-4 pleft">
                                <h4>Follow Us</h4>
                                <Nav className="flex-column">
                                    <div className="vmiddle"><Nav.Link href="/instagram" className="text-color"><i className="fa fa-instagram"></i>Instagram</Nav.Link></div>
                                    <div className="vmiddle"><Nav.Link href="/twitter" className="text-color"><i alt="twitter" className="fa fa-twitter"></i>Twitter</Nav.Link></div>
                                    <div className="vmiddle"><Nav.Link href="/facebook" className="text-color"><i className="fa fa-facebook"></i>Facebook</Nav.Link></div>
                                </Nav>
                            </div>
                        </div>
                        <center><hr className="line" />
                            <p className="copyright mb-0">Breathing Crafts Private Limited © All rights reserved 2021</p>
                        </center>
                    </div>
                </footer>
            </div>
        );
    }
}

Footer.propTypes = {};

export default Footer;
