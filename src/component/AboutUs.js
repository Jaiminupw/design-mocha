import React, { PureComponent } from 'react'
import Footer from './Footer'
import Header from './Header'
import auser from '../images/auser.png'
import { Card } from 'react-bootstrap'
import '../css/ework.css'
class AboutUs extends PureComponent {
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
                            <div className="col-sm-4">
                                <div className="container-fluid"><h3>The team</h3></div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-sm-4 px-4">
                                <Card className="border-0">
                                    <Card.Img src={auser} />
                                    <Card.Body className="px-0">
                                        <p className="font-arial">
                                            <b className="font-arial">Gaurav Raheja</b> is the co-founder and the CEO of Designmocha.
                                            A design activist with an experience of almost 2 decades. Has
                                            worked multiple fashion companies in the country and has
                                            been instrumental in launchmany celebrity and non-celebrity
                                            brands as well. When not working, he can be found playing in
                                            the squash court. Inspite of being a fashion designer himself,
                                            he keeps his wardrobe pretty minimal. You can easily recognize
                                            him with his black t-shirt most of the times.
                                        </p>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="col-sm-4 px-4">
                                <Card className="border-0">
                                    <Card.Img src={auser} />
                                    <Card.Body className="px-0">
                                        <p className="font-arial">
                                            <b className="font-arial">Smita Goel</b> is the co-founder and the CFO of Designmocha.
                                            With her deep knowledge and wide experience of over 15 years
                                            in corporate tax, international tax, M&A and transaction tax as
                                            well as in regulatory and policy matters. She has been advising
                                            major global and domestic companies on a range of tax and
                                            regulatory issues for over a decade. Her appreciation for borderless cusines is undying. She loves travelling to find unique
                                            experiences.

                                        </p>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="col-sm-4 px-4">
                                <Card className="border-0">
                                    <Card.Img src={auser} />
                                    <Card.Body className="px-0">
                                        <p className="font-arial">
                                            <b className="font-arial">Sahil Mahajen</b> Lorem Ipsum is simply dummy text of the printing
                                            and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                                            took a galley of type and scrambled it to make a type specimen
                                            book. It has survived not only five centuries, but also the leap into
                                            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                                            Lorem Ipsum passages, and more recently with desktop

                                        </p>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                        <div className="row mt-5 mb-5">
                            <div className="col-sm-4 px-4">
                                <Card className="border-0">
                                    <Card.Img src={auser} />
                                    <Card.Body className="px-0">
                                        <p className="font-arial">
                                            <b className="font-arial">Puneet Relan</b> is veteran in IT Services and Digital Business
                                            Transformation space, with experience in managing global
                                            product and engineering teams, as part of multi-million-dollar
                                            programmes.His expertise in defining stratregy around product,
                                            quality, visual design, and management inform of his competitive approach.
                                            Puneet is fueled by his passion of providing simplistic, yet appealing, and smooth experience for the customers.
                                            A learning mindset, humble in nature, attentive listner, and a
                                            diligent approach to work, he make best use of information
                                            available to provide what customer wants.
                                        </p>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="col-sm-4 px-4">
                                <Card className="border-0">
                                    <Card.Img src={auser} />
                                    <Card.Body className="px-0">
                                        <p className="font-arial">  
                                            <b className="font-arial">Krishna</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                                            dummy text ever since the 1500s, when an unknown printer took a
                                            galley of type and scrambled it to make a type specimen book. It
                                            has survived not only five centuries, but also the leap into electronic
                                            typesetting, remaining essentially unchanged. It was popularised in
                                            the 1960s with the release of Letraset sheets containing Lorem
                                            Ipsum passages, and more recently with desktop
                                            diligent approach to work, he make best use of information
                                        </p>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default AboutUs