import React from 'react';
import { Redirect } from 'react-router-dom';
import siteLogo from '../images/logo-dark.png'
import toggleMenu from '../images/menu.png'
import { Nav, Navbar, Dropdown } from 'react-bootstrap'
// import { LinkContainer } from 'react-router-bootstrap'
import { getAuth } from '../services/getAuth';
import { Logout } from '../services/Logout';
import { getProfile } from '../services/getProfile';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mdisplay: 0, mwidth: 0, isAuth: "", user: {} };
    }
    menuToggle = () => {
        if (this.state.mdisplay === 0) {
            this.setState({ mdisplay: 100, mwidth: 100 })
        }
        else {
            this.setState({ mdisplay: 0, mwidth: 0 })
        }
    }
    async componentDidMount() {
        getProfile().then(async (res) => {
            await this.setState({ user: res.data })
            console.log("user", this.state.user)
        })
        var auth = getAuth()
        if (auth === true) {
            await this.setState({ isAuth: "Logout" })
        }
        const mscript = document.createElement("script");
        mscript.src = "/scripts/main.js";
        mscript.async = true;
        document.body.appendChild(mscript);
    }
    LogoutMe = (e) => {
        e.preventDefault()
        Logout()
            .then((res) => {
                this.setState({ isAuth: "Login" })
            })
            .catch((err) => {
                this.setState({ isAuth: "Login" })
            })
    }
    render() {
        if ((window.location.pathname === "/explore") && (this.state.isAuth === "Login")) {
            return <Redirect to="/login" />
        }
        return (
            <header className="sticky-top" id="stickytop">
                <div id="site-header">
                    <a href="/">
                        <div className="site-logo">
                            <img src={siteLogo} alt="logo" />
                        </div>
                    </a>
                    <div className='nav-toggle' onClick={this.menuToggle}>
                        <img src={toggleMenu} alt="nav-menu" />
                    </div>
                    <div className="slide-menu" style={{ opacity: this.state.mdisplay, maxWidth: this.state.mwidth + "%" }}>
                        <Navbar id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <div className="nav-close" onClick={this.menuToggle}><i className="fa fa-close fa-2x float-right"></i></div>
                                <Nav.Item>
                                    <Nav.Link href="/" className="text-color px-3">Home</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/explore" className="text-color px-3">Explore Work</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/" className="text-color px-3">DM Cafe</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/about-us" className="text-color px-3">About Us</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/contact-us" className="text-color px-3">Say Hello</Nav.Link>
                                </Nav.Item>
                                {
                                    ((this.state.isAuth === "Login") || (this.state.isAuth === "")) ? (<Nav.Item>
                                        <Nav.Link href="/login" className="text-color px-3">Login</Nav.Link>
                                    </Nav.Item>) : (<>

                                        <Dropdown>
                                            <Dropdown.Toggle className="nav-item font-arial nav-link" id="dropdown-basic">
                                                {this.state.user.first_name ? (<span className="font-arial"><div className="header-av float-left mr-2"><img src={this.state.user.photo_url} alt="user"></img></div>{this.state.user.full_name}</span>) : "Designmocha"}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="/" className="font-arial">View Profile</Dropdown.Item>
                                                <Dropdown.Item href="/create-profile" className="font-arial">Setting</Dropdown.Item>
                                                <Dropdown.Item href="/" className="p-0">
                                                    <Nav.Item>
                                                        <Nav.Link href="/" className="text-color px-3" onClick={this.LogoutMe}>{this.state.isAuth}</Nav.Link>
                                                    </Nav.Item>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        {/* <Nav.Item to="/create-profile">
                                            <Nav.Link href="/create-profile" className="text-color px-3" >My Profile</Nav.Link>
                                        </Nav.Item> */}
                                    </>)
                                }
                                <Nav.Item>
                                    <Nav.Link href="/" className="text-color px-3"><i className="fa fa-search"></i></Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Navbar>
                    </div>
                </div>
            </header>
        );
    }
}

Header.propTypes = {};

export default Header;
