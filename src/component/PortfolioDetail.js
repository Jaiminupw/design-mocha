import React, { PureComponent } from 'react'
import '../css/ework.css'
import Footer from './Footer'
import Header from './Header'
import { Card } from 'react-bootstrap'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { getPortfolioById } from '../services/getPortfolioById'
import { Link, Redirect } from 'react-router-dom'
import { getAuth } from '../services/getAuth'
import { getProfileById } from '../services/getProfileById'
import { getPortfolios } from '../services/getPortfolios'
class PortfolioDetail extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            isAthenticated: false,
            portfolio: {},
            portfolios: [],
            media: [],
            uid: '',
            user: {}
        }
    }
    async componentDidMount() {
        var auth = getAuth()
        this.setState({ isAuthenticated: auth })
        var pid = this.props.match.params.id;
        getPortfolioById(pid).then(async (res) => {
            await this.setState({ portfolio: res.data, media: res.data.media_urls })
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
                this.setState({ portfolios: portfolios })
                portfolios.map((portfolio) => {
                    if(this.state.portfolio.portfolio_id === portfolio.portfolio_id) {
                        var nportfolio = {...this.state.portfolio}
                        nportfolio.uid = portfolio.uid
                        this.setState({uid: portfolio.uid, portfolio:nportfolio})
                    }
                    return true
                })
                getProfileById(this.state.uid).then(async (res) => {
                    await this.setState({user: res.data})
                }).catch((err) => {
                    this.setState({isAthenticated: false})
                })
            }).catch((err) => {
                this.setState({ error: "something went wrong", isAthenticated: false })
            })
        }).catch((error) => {
            this.setState({ isAthenticated: false })
        })
    }
    render() {
        if (this.state.isAuthenticated === false) {
            return <Redirect
                to={{
                    pathname: "/login",
                    state: { redirect: true, rpath: this.props.location.pathname }
                }}
            />
        }
        return (
            <div className="portfolio-details wrapper">
                <Header />
                <div className="user-detail mt-3 container-fluid">
                    <Card>
                        <Card.Body>
                            <div className="user-flex py-3">
                                <div className="user-av rounded-circle"><img alt="profile" src={this.state.user.photo_url} /></div>
                                <div><h2 className="font-arial"><b className="font-arial">{this.state.user.profile_name}</b></h2></div>
                                <p className="font-arial">Logo and Graphic Designers</p>
                                <div className="mt-4">
                                    <h5 className="text-center"><b className="font-arial">Design for me is :</b></h5>
                                    <p className="font-arial text-center">{this.state.user.design_journey}</p>
                                </div>
                                <div className="mt-4">
                                    <h5 className="text-center"><b className="font-arial">Areas of Expertise :</b></h5>
                                    <p className="font-arial text-center expertise">{this.state.user.sub_category}</p>
                                </div>
                                <div className="poptions">
                                    <i className="fa fa-lightbulb-o px-2 float-left pt-1 fa-2x"></i><p className="font-arial float-left pr-3">0</p>
                                    <i className="fa fa-eye px-2 float-left pt-1 fa-2x"></i><p className="font-arial float-left pr-3">{this.state.portfolio.views}</p>
                                    <i className="fa fa-heart px-2 float-left pt-1 fa-2x"></i><p className="font-arial float-left pr-3">{this.state.portfolio.likes}</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="container-fluid portfolio-info mt-4">
                    <div className="row pflex row-eq-height">
                        <div className="col-sm-8 col">
                            <OwlCarousel className='owl-theme' loop margin={10} items={1} nav autoplay>
                                {
                                    this.state.media.map((img) => {
                                        return (
                                            <div className='item'>
                                                <div className="pdimg">
                                                    <img alt="pimg" src={img}></img>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </OwlCarousel>
                        </div>
                        <div className="col-sm-4 col pdesc font-arial">
                            {this.state.portfolio.description}
                        </div>
                    </div>
                </div>
                <div className="container-fluid more-posts mborder mt-5 py-4">
                    <div className="mheader">
                        <h3 className="font-arial mb-3 float-left">More from Designguru</h3>
                        <p className="font-arial float-right">Veiw more &gt;</p>
                    </div>
                    <div className="row ml-0">
                        <div className="col-sm-3">
                            <Card>
                                <Card.Body className="p-0 rounded"><img className="rounded" alt="portfolio img" src="" width="100%" /></Card.Body>
                            </Card>
                        </div>
                        <div className="col-sm-3">
                            <Card>
                                <Card.Body className="p-0 rounded"><img className="rounded" alt="portfolio img" src="" width="100%" /></Card.Body>
                            </Card>
                        </div>
                        <div className="col-sm-3">
                            <Card>
                                <Card.Body className="p-0 rounded"><img className="rounded" alt="portfolio img" src="" width="100%" /></Card.Body>
                            </Card>
                        </div>
                        <div className="col-sm-3">
                            <Card>
                                <Card.Body className="p-0 rounded"><img className="rounded" alt="portfolio img" src="" width="100%" /></Card.Body>
                            </Card>
                        </div>
                    </div>
                    <button className="cbtn btn my-btn mt-5 text-color font-arial">connect with me</button>
                </div>
                <div className="container-fluid more-posts mtrans mt-5">
                    <div className="mheader">
                        <h3 className="font-arial mb-3 float-left">You might also like</h3>
                        <p className="font-arial float-right"><Link to="/explore">Veiw more &gt;</Link></p>
                    </div>
                    <div className="row ml-0">
                        {
                            this.state.portfolios.slice(0, 4).map((portfolio) => {
                                return (
                                    <div className="col-sm-3">
                                        <a href={"/portfolio/" + portfolio.portfolio_id} >
                                        <Card>
                                            <Card.Body className="p-0 rounded"><img className="rounded" alt="portfolio img" src={portfolio.media_urls[0]} width="100%" /></Card.Body>
                                        </Card>
                                        <Card.Footer className="px-0">
                                            <div className="emeta">
                                                <div className="euser">
                                                    <i className="fa fa-user px-2 float-left pt-1"></i><p className="font-arial float-left">Designmocha</p>
                                                </div>
                                                <div className="eoptions">
                                                    <i className="fa fa-lightbulb-o px-2 float-left pt-1"></i><p className="font-arial float-left">0</p>
                                                    <i className="fa fa-eye px-2 float-left pt-1"></i><p className="font-arial float-left">{portfolio.views}</p>
                                                    <i className="fa fa-heart px-2 float-left pt-1"></i><p className="font-arial float-left">{portfolio.likes}</p>
                                                    <i className="fa fa-comment px-2 float-left pt-1"></i><p className="font-arial float-left">0</p>
                                                </div>
                                            </div>
                                        </Card.Footer>
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default PortfolioDetail