import React, { PureComponent } from 'react'
import '../css/ework.css'
import Footer from './Footer'
import Header from './Header'
import { Card, Form, Nav } from 'react-bootstrap'
import { getPortfolios } from '../services/getPortfolios'
import { getAuth } from '../services/getAuth'
import { Redirect } from 'react-router-dom'
class ExploreWork extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            portfolios: [],
            fportfolios: [],
            isAuthenticated: false
        }
    }
    componentDidMount() {
        var auth = getAuth()
        if (auth === false) {
            this.setState({ isAuthenticated: "false" })
        }
        else {
            this.setState({ isAuthenticated: true })
        }
        getPortfolios()
            .then((res) => {
                var portfolios = []
                res.data.map((user) => {
                    for (let key in user) {
                        user[key].map((portfolio) => {
                            portfolio.uid = key;
                            portfolios.push(portfolio)
                            return true
                        })
                    }
                    return true
                })
                this.setState({ portfolios: portfolios, fportfolios: portfolios })
            }).catch((err) => {
                this.setState({ error: "something went wrong" })
                this.setState({ isAuthenticated: "false" })
            })
    }
    applyFilter = (e) => {
        var cat = e.target.getAttribute("data-filter");
        console.log(cat)
        var portfolios = [];
        this.state.fportfolios.map((pr) => {
            if(pr.category === cat) {
                portfolios.push(pr);
            }
            return pr
        })
        this.setState({portfolios: portfolios})
    }
    render() {
        if (this.state.isAuthenticated === "false") {
            return <Redirect
                to={{
                    pathname: "/login",
                    state: { redirect: true, rpath: this.props.location.pathname }
                }}
            />
        }
        return (
            <div className="ework wrapper mnhide">
                <Header active="explore"/>
                <div className="top-banner pbanner">
                    <div className="row ml-0">
                        <div className="col-sm-12">
                            <div className="container-fluid"><h3>Discover India's best<br></br> design &amp; creative talent</h3></div>
                        </div>
                    </div>
                </div>
                <div className="e-content">
                    <div className="top-filters mt-5 mb-5 px-5">
                        <div className="efilters">
                            <Form.Control as="select" defaultValue="Choose..." className="font-arial">
                                <option className="font-arial">inspiring</option>
                                <option className="font-arial">likes</option>
                                <option className="font-arial">views</option>
                            </Form.Control>
                        </div>
                        <div className="ecats">
                            <Nav defaultActiveKey="/home" as="ul">
                                <Nav.Item as="li">
                                    <Nav.Link className="font-arial active" href="/explore" data-filter="All">All</Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link className="font-arial" eventKey="link-1" data-fiter="BRANDING">Branding</Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link className="font-arial" eventKey="link-2" data-filter="FASHION DESIGN">Fashion Design</Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link className="font-arial" eventKey="link-3" data-filter="ARTISTIC DESIGN">Artistic Design</Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link className="font-arial" eventKey="link-4" data-filter="Others" onClick={this.applyFilter}>Digital Design</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                        <div className="esearch">
                            <Form.Control type="text" placeholder="Search tags" className="font-arial" />
                        </div>
                    </div>
                    {
                        (this.state.portfolios.length !== 0) ? (<div className="blog-area">
                            <div className="row ml-0">
                                {
                                    this.state.portfolios.map((portfolio) => {
                                        return (
                                            <div className="col-sm-4 mb-2">
                                                <a href={"/portfolio/" + portfolio.portfolio_id}>
                                                    <Card>
                                                        <Card.Body className="p-0 rounded"><img className="rounded" alt="portfolio img" src={portfolio.media_urls[0]} width="100%" /></Card.Body>
                                                    </Card>
                                                    <Card.Footer className="px-0 pd-40">
                                                        <div className="emeta">
                                                            <div className="euser">
                                                                <div className="float-left eav"><img src={portfolio.photo_url} alt="pimg"/></div><p className="font-arial float-left user">{portfolio.username}</p>
                                                            </div>
                                                            <div className="eoptions">
                                                                <i className="fa fa-lightbulb-o px-2 float-left pt-1"></i><p className="font-arial float-left">{portfolio.inspiring_view}</p>
                                                                <i className="fa fa-eye px-2 float-left pt-1"></i><p className="font-arial float-left">{portfolio.views}</p>
                                                                <i className="fa fa-heart px-2 float-left pt-1"></i><p className="font-arial float-left">{portfolio.likes}</p>
                                                                <i className="fa fa-comment px-2 float-left pt-1"></i>
                                                            </div>
                                                        </div>
                                                    </Card.Footer>
                                                </a>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>) : (<div><h5 className="text-center my-4">Loading please wait...</h5></div>)
                    }
                </div>
                <Footer />
            </div>
        )
    }
}

export default ExploreWork