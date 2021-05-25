import React from 'react';
// import { Nav } from 'react-bootstrap';
import '../css/login.css'
import { Link, Redirect } from 'react-router-dom'
import { LoginMe } from '../services/LoginMe';
import { getSession } from '../services/getSession'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Form } from 'react-bootstrap';
// import loader from '../images/loader.gif'
class Login extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            isloggedin: false,
            Redirect: "false",
            validated: false,
            pdisplay: false
        };
    }
    handleChange = async (e) => {
        await this.setState({ [e.target.name]: e.target.value })
        this.setState({ successMessage: "" })
    }
    formSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            this.setState({ isloading: true, successMessage: "" })
            var data = {
                password: this.state.password,
                email: this.state.email
            }
            LoginMe(data).then((res) => {
                if (res.status === 200) {
                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + res.data.token
                    }
                    getSession(headers)
                        .then(async (response) => {
                            const { cookies } = this.props
                            cookies.set("session", response.data.session, { maxAge: 3600, secure: true, sameSite: "none" })
                            // cookies.set("authenticated", response.data.authenticated, { maxAge: 3600 })
                            cookies.set("userProfile", response.data.userProfile, { maxAge: 3600, secure: true, sameSite: "none" })
                            if (this.props.location.state) {
                                if (this.props.location.state.redirect) {
                                    await this.setState({ Redirect: "true" })
                                }
                            }
                            await this.setState({ successMessage: "Login Successful", isloggedin: true, isloading: false })
                        })
                        .catch((err) => {
                            this.setState({ successMessage: "Something went wrong", isloading: false })
                        })
                }
            }).catch((err) => {
                if (err.response) {
                    if (err.response.data.general) {
                        this.setState({ successMessage: err.response.data.general, isloading: false })
                    }
                    else {
                        this.setState({ successMessage: "something went wrong", isloading: false })
                    }
                }
                else {
                    this.setState({ successMessage: "something went wrong", isloading: false })
                }
            })
        }
        this.setState({ validated: true })
    }
    showPass = () => {
        this.setState({pdisplay: !this.state.pdisplay})
    }
    render() {
        if (this.state.Redirect === "false") {
            if (this.state.isloggedin === true) {
                return <Redirect to='/explore' />
            }
        }
        if (this.state.Redirect !== "false") {
            return <Redirect to={this.props.location.state.rpath} />
        }
        return (
            <div>
                {/* {this.state.isloading ? (<div className="loader"><img src = {loader} alt="loader"/></div>) : ''} */}
                <div className="logsection signup">
                    <div className="container">
                        <div className="row itemcenter row-eq-height">
                            <div className="col-sm-6 center ">
                                <h4 className="sectionwel">WELCOME TO <br />DESIGNMOCHA.</h4>
                            </div>
                            <div className="col-sm-6 form">
                                <div className="lflex">
                                    <Form noValidate validated={this.state.validated} onSubmit={this.formSubmit} autoComplete="off">
                                        {!this.state.successMessage ? '' : (<p className="text-color">{this.state.successMessage}</p>)}
                                        {!this.state.isloading ? '' : (<p className="text-color">Loading please wait..</p>)}
                                        <Form.Group controlId="validationCustom01">
                                            <label htmlFor="exampleInputEmail1" className="mochalabel">Email Address</label>
                                            <input type="email" autoComplete="off" name='email' className="form-control mochainput" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.handleChange} required />
                                            <Form.Control.Feedback type="invalid">Enter valid Email Address</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group controlId="validationCustom02">
                                            <label htmlFor="exampleInputPassword1" className="mochalabel">Password</label>
                                            <input type={this.state.pdisplay ? "text" : "password"} autoComplete="new password" name='password' className="form-control mochainput" id="exampleInputPassword1" onChange={this.handleChange} required />
                                            <Form.Control.Feedback type="invalid">Please Enter Password</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group controlId="validationCustom03">
                                        <Form.Check
                                            type="checkbox"
                                            id="custom-checkbox"
                                            label="Show Password"
                                            className="text-color form-check-warning"
                                            name="accept"
                                            onClick={this.showPass}
                                        />
                                        </Form.Group>
                                        <Form.Group>
                                            <button type="submit" className="mochabtn bg text-color" disabled={this.state.isloading}>Login</button>
                                            <Link to="/register" className="btn form a text-color px-0">Create Account Now</Link>
                                        </Form.Group>
                                        <Form.Group>
                                            <Link to='reset-password' className='btn form a forget ml-0 border-0 px-0 pt-0'>Forgot Password?</Link>
                                        </Form.Group>

                                    </Form>

                                    {/* <span className="flow"> or connect with -
                                        <Nav.Link to="/"><i className="cl fa fa-facebook" aria-hidden="true"></i></Nav.Link>
                                        <Nav.Link to="/"><i className="cl fa fa-instagram" aria-hidden="true"></i></Nav.Link>
                                        <Nav.Link to="/"><i className="cl fa fa-twitter" aria-hidden="true"></i></Nav.Link>
                                        <Nav.Link to="/"><i className="cl fa fa-pinterest-p" aria-hidden="true"></i></Nav.Link>
                                    </span> */}
                                </div>
                                <div className="btohome">
                                    <a href="/"><p><i className="fa fa-arrow-circle-o-left float-left primary-color"></i><p className="float-left primary-color">Back To Home</p></p></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withCookies(Login);
