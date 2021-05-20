import React from 'react'
import Footer from './Footer'
import Header from './Header'
import '../css/contact.css'
import { Nav, Form, Button } from 'react-bootstrap'
class Contact extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <div className="contact-page">
                <Header />
                <div className="top-banner cbanner">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4">
                            <div className="container-fluid"><h3>We would love<br />to hear from you</h3></div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row row-eq-height">
                        <div className="col-sm-6 ccol cpadding2">
                            <div className="cinfo">
                                <p className="mb-0"><Nav.Link className="pb-0 font-arial" href="tel:9739000486">Call us at +91-9739000486</Nav.Link></p>
                                <p className="mb-0"><Nav.Link className="pb-0 font-arial" href="mailto:hello.designmocha@breathingcrafts.com">Mail us at hello.designmocha@breathingcrafts.com</Nav.Link></p>
                            </div>
                        </div>
                        <div className="col-sm-6 cpadding">
                            <Form>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label className="font-arial">Full Name</Form.Label>
                                    <Form.Control placeholder="" size="sm" name="full_name" onChange={this.handleChange} required />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label className="font-arial">Email address</Form.Label>
                                    <Form.Control type="email" placeholder="" size="sm" name="email" onChange={this.handleChange} required />
                                </Form.Group>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label className="font-arial">Contact Number</Form.Label>
                                    <Form.Control placeholder="" size="sm" name="contact" onChange={this.handleChange} required />
                                </Form.Group>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label className="font-arial">Organiztion</Form.Label>
                                    <Form.Control placeholder="" size="sm" name="organization" onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label className="font-arial">Designation</Form.Label>
                                    <Form.Control placeholder="" size="sm" name="designation" onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label className="font-arial">Country</Form.Label>
                                    <Form.Control placeholder="" size="sm" name="country" onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label className="font-arial">City</Form.Label>
                                    <Form.Control placeholder="" size="sm" name="city" onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group controlId="formGridAddress1">
                                <Form.Label className="font-arial">Purpose of contacting</Form.Label>
                                <Form.Control as="select" required className="font-arial" size="sm" name="purpose" onChange={this.handleChange}>
                                    <option className="font-arial">Enquiry</option>
                                    <option className="font-arial">Feedback</option>
                                    <option className="font-arial">opportunities with Designmocha</option>
                                    <option className="font-arial">Others</option>
                                </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label className="font-arial">Comment / Query</Form.Label>
                                    <Form.Control as="textarea" rows={3} required size="sm" name="query" onChange={this.handleChange} />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mochabtn bg font-arial">
                                    Submit
                                </Button>
                                <Button type="reset" className="mochabtn bg left font-arial">
                                    Reset
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Contact