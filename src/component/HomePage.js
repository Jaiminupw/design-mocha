import React from 'react';
import '../App.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import sdown from '../images/sdown.png'
import SliderVideo from '../images/slider-video.mp4'
// import {DotLoader} from 'react-spinners'
// import { Link } from 'react-router-dom';
import '../big-counter.css'
import { getAuth } from '../services/getAuth';
import Cookies from 'js-cookie';
// import axios from 'axios';
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, refresh: true };
    }
    componentDidMount() {
        // axios.get("/slider-video.mp4").then(() => {
        //     this.setState({loading: false})
        // })
        getAuth();
        var page = document.getElementsByClassName("main-section")[0];
        const script = document.createElement("script");
        script.id = "hscript";
        script.src = "/scripts/home.js";
        script.async = true;
        page.insertBefore(script, page.childNodes[0])
        const mscript = document.createElement("script");
        mscript.src = "/scripts/main.js";
        mscript.id = "mscript";
        mscript.async = true;
        page.insertBefore(mscript, page.childNodes[0])
        const pscript = document.createElement("script");
        pscript.src = "/scripts/pace.min.js";
        pscript.id = "pscript";
        pscript.async = true;
        page.insertBefore(pscript, page.childNodes[0])
    }
    componentWillUnmount() {
        document.getElementById("pscript").remove()
        document.getElementById("mscript").remove()
        document.getElementById("hscript").remove()
    }
    videoPlay = () => {
        this.setState({ loading: false })
    }
    render() {
        // if(this.state.loading) {
        //     return <div className="preloader"><DotLoader loading={this.state.loading}/></div>
        // }
        /* {
                    this.state.loading ? (<div className="preloader"><DotLoader loading={this.state.loading}/></div>) : ""
                } */
        return (
            <div className="page-container" id="page">
                <section className="main-section">
                    <div>
                        <div className='item slide-1'>
                            <video autoPlay loop muted id="background-video" preload="auto" onCanPlay={this.videoPlay}>
                                <source src={SliderVideo} type="video/mp4" />
                            </video>
                            <div className="sabsolute">
                                <div className="ball"></div>
                                {/* <div id="div1" className="cursor"></div> */}
                                <div className="container">
                                    <div className="slide-header">
                                        <h3 className="text-color text-center">Our vision is to be India`s biggest design crowdsourcing platform..</h3>
                                    </div>
                                    <div className="scroll-down" title="scroll down"><p><img src={sdown} alt="scroll" /></p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="section-even sectione1">
                    <div className="container">
                        <div className="row">
                            <h3 className="heading-1">“A PLATFORM WHERE YOU CAN ENGAGE WITH MULTIPLE DESIGN AND CREATIVE TALENTS”</h3>
                            <p>Weather for a long tem assignment or a short term quick gig.  We have solutions for all.<br /></p>
                            <p>Go ahead, view the work, select your talent basis work, reviews and ratings and connect.</p>
                            <h3 className="secondh3">“WHY THE NAME DESIGNMOCHA”</h3>
                            <p>Well just like mocha is considered to be one of the finest forms of coffee..
                        we are the same when itcomes to the world of design.</p>
                        </div>
                    </div>
                </div>
                <div className="section-three parallax psection full-height">
                    <div className='container'>
                        <h3 className='text-color text-center'>First of it`s kind platform showcasing
Indian design & creative talent to the world..</h3>
                    </div>
                </div>
                <div className="section-even sectione3">
                    <div className="container">
                        <div className="row">
                            <h3 className="heading-1">“SHOWCASE YOUR WORK TO MILLIONS”</h3>
                            <p>Thanks to digitalization of the world, we support and guide design and creative talentto build and showcase their portfolios with ease. Our team ofexperts help them in highling their real talent. </p>
                            <h3 className="secondh3">“OPPORTUNITY TO EARN”</h3>
                            <p>This platform also gives opportunities for the showcased talents to earn.No more closed cubicles or offices. Design from wherever they wish, whenever they wish.</p>
                        </div>
                    </div>
                </div>
                <div className="section-three2 parallax psection full-height">
                    <div className='container'>
                        <h3 className='text-color text-center'>A platform to address unique Indian needs.</h3>
                    </div>
                </div>
                <div className="section-even sectione2">
                    <div className="container">
                        <div className="row">
                            <h3 className="heading-2">“MANY INDIAS IN ONE,<br /> A WORLD IN ITSELF”</h3>
                            <p>India, a rapidly growing economy, with more youth than elderly population, the biggest
                            democracy in the world, and population of 1.37 Billion. Needless to say the  consumption of
                            good designed products is only going to go up. But
                            these needs are unique and specifice to India.
                            Given the length and breath of our Religions, Caste, Languages,Cultures, Festivals,
               Spiritual beliefs, Philosophies, Mythologies, etc..</p>
                            <p>And this is exactly where Designmocha contributes. We believe that unlike many other countries
                 in the world, Indian doesn`t blindly follow global design trends and practises, rather creates its own. </p>
                        </div>
                    </div>
                </div>
                <div className="section-five parallax psection full-height">
                    <div className='container'>
                        <h3 className='text-color text-center'>A community of creative minds.</h3>
                    </div>
                </div>
                <div className="section-even sectione3">
                    <div className="container">
                        <div className="row">
                            <h3 className="heading-1">“DM CAFE”</h3>
                            <p>The one stop destination for anthing around Design and Design people.</p>
                            <p className="sectionp1">WePost, Share, Comment, Review, Learn, Observe, Like, Inspire, Connect and Support<br />
                            Design and Creative talents. We learn from each other, spend time in understanding how they go about designing, evaluate different design methodologies and philosophies.</p>
                            <p>Making this world a bit more design senstive..</p>
                        </div>
                    </div>
                </div>
                <section>
                    <div className="section-three secthree parallax psection full-height">
                        <div className='container'>
                            <h3 className='text-color text-center'>Design services offered in multiple categories.
Branding,Fashion Design, Artistic Design, Digital Design..</h3>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="section-four">
                        <div className='container'>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className="feature-box">
                                        <h4 className="feature-heading">Branding</h4>
                                        <p className='fdesc'>We collaborate with you in building your brand`s story. </p>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className="feature-box img2">
                                        <h4 className="feature-heading">Artistic Design</h4>
                                        <p className='fdesc'>Design Will Always Be Incomplete Without Art</p>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-6 ptop'>
                                    <div className="feature-box">
                                        {/* <div className='feature-img img3'>
                                            <img src={icon3} alt="img7" />
                                        </div> */}
                                        <h4 className="feature-heading">Fashion Design</h4>
                                        <p className='fdesc'>Apparel, Accessories, Graphics, We have got you covered.</p>
                                    </div>
                                </div>
                                <div className='col-sm-6 ptop'>
                                    <div className="feature-box img4">
                                        <h4 className="feature-heading">Digital Design</h4>
                                        <p className='fdesc'>We support you in telling your brand`s story more effectively.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <center><hr className="line" /></center>
                    </div>
                </section>
                <div className="section">
                    <div className="container">
                        <div className="row">
                            <h3 style={{ paddingBbottom: 25 + 'px' }}>“THE SUB CATEGORIES”</h3>
                            <div className="col-sm-3">
                                <h4>Branding</h4>
                                <ul className="list-group">

                                    <li className="list"> Logo Design</li>
                                    <li className="list"> Brand Style Guides</li>
                                    <li className="list"> Packaging Design</li>
                                    <li className="list"> Brochure Design</li>
                                    <li className="list"> Signage and Banner Design</li>
                                    <li className="list"> Book Cover Design</li>
                                    <li className="list"> Podcast Cover Design</li>
                                    <li className="list"> Catalog Design</li>
                                    <li className="list"> Presentation Design</li>
                                    <li className="list"> Infographic Design</li>
                                </ul>
                            </div>
                            <div className="col-sm-3">
                                <h4>Artistic Design</h4>
                                <ul className="list-group">
                                    <li className="list"> Illustrations</li>
                                    <li className="list">Caricature and Portraits</li>
                                    <li className="list">Fine Arts</li>
                                    <li className="list">Pattern Design</li>
                                    <li className="list">Character Design</li>
                                    <li className="list">Comic Design</li>
                                    <li className="list">Vector Tracing</li>
                                    <li className="list">Textile Design</li>

                                </ul>
                            </div>
                            <div className="col-sm-3">
                                <h4>Fashion Design</h4>
                                <ul className="list-group">
                                    <li className="list">Mood Board Design</li>
                                    <li className="list">Graphic Design</li>
                                    <li className="list">T-Shirt Design</li>
                                    <li className="list">Look and Silhouette Design</li>
                                    <li className="list">Menswear Design</li>
                                    <li className="list">Womenswear Design</li>
                                    <li className="list">Kidswear Design</li>
                                    <li className="list">Ethnicwear Design</li>
                                    <li className="list">Activewear Design</li>
                                    <li className="list">Textile Design</li>

                                </ul>
                            </div>
                            <div className="col-sm-3">
                                <h4>Digital Design</h4>
                                <ul className="list-group">
                                    <li className="list"> Motion Logo</li>
                                    <li className="list">Motion Creatives</li>
                                    <li className="list">Animation Video</li>
                                    <li className="list">Video Design</li>
                                    <li className="list">UI/UX</li>
                                    <li className="list">3D</li>
                                    <li className="list">Copy Writing</li>
                                    <li className="list">Image/Video edits</li>
                                    <li className="list">Web Developer</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <section>
                    <div className="lsection">
                        <div className="section-eleven">
                            <div className='container'>
                                <h1 className='text-color text-center font-80'>JOIN THE COMMUNITY NOW</h1>
                                <p className="section-eleven-p">If  you are a designer or  creative individual and belong to any of the above mentioned  categories, then register now to join the team.</p>
                                <p className="mt-3 text-color text-center">LIMITED SPOTS AVAILABLE.</p>
                            </div>
                        </div>
                        <div className="section-twelve">
                            
                            <div className='container'>
                            <center>
                                <a className="mochabtn bg text-color" href={(Cookies.get("session") !== undefined) ? "/explore" : "/register"}>JOIN FOR FREE</a>
                                </center>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        );
    }
}
export default HomePage;