import React, { PureComponent } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import Footer from './Footer'
import Header from './Header'
import '../css/ework.css'
class Faq extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="about wrapper">
                <Header />
                
                <div className="acontent">
                <div className="abanner top-banner">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="container-fluid"><h3>Frequently Asked Questions</h3></div>
                            </div>
                        </div>
                    </div>
                    <div className="faq-questions container">
                        <div className="row">
                            <div className="col-sm-10 mx-auto">
                                <Accordion defaultActiveKey="0">
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="0" className="font-arial">
                                            Q: How does this work?
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body className="font-arial">Hello! I'm the body</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="1" className="font-arial">
                                            Q: What is Bootstrap 4?
                                </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="1">
                                            <Card.Body className="font-arial">Hello! I'm another body</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="2" className="font-arial">
                                            Q. What is another question?
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="2" >
                                            <Card.Body className="font-arial">Hello! I'm another body</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="3" className="font-arial">
                                            Q. What is another question?
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="3" >
                                            <Card.Body className="font-arial">Hello! I'm another body</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Faq