import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import '../css/register.css'
import { RegisterMe } from '../services/RegisterMe';
var passwordValidator = require('password-validator');
var Cookies = require("js-cookie")
var schema = new passwordValidator();
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123'])
.is().symbols(); // Blacklist these values
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            successMessage: false,
            show: false,
            accept: false,
            registered: false,
            validated: false,
            acd: "none",
            acMessage: "",
            pdisplay: false
        };
    }
    handleShow = () => {
        if (!this.state.accept) {
            this.setState({ show: true, accept: true })
        }
        else {
            this.setState({ show: false, accept: false })
        }
    }
    handleClose = () => {
        this.setState({ show: false })
    }
    handleChange = async (e) => {
        if(e.target.name === "accept") {
            await this.setState({ [e.target.name]: e.target.checked })
            this.setState({ successMessage: "" })
        }
        await this.setState({ [e.target.name]: e.target.value })
        this.setState({ successMessage: "" })
    }
    formSubmit = (e) => {
        e.preventDefault();
        this.setState({acd: "none"})
        console.log(this.state.accept)
        const form = e.currentTarget;
        if(this.state.accept === false) {
            this.setState({acd: "block", acMessage: "Please accept Privacy Policy and Terms of Services"})
        }
        else if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            var vpass = schema.validate(this.state.password, {list: true})
            if(vpass.length !== 0) {
                if(vpass[1] === "uppercase"){
                    this.setState({successMessage: "Password must include atleast one uppercase letter"})
                }
                else if(vpass[1] === "digits"){
                    this.setState({successMessage: "Password must contain atleast two numbers"})
                }
                else if(vpass[1] === "symbols"){
                    this.setState({successMessage: "Password must contain symbols"})
                }
                else {
                    this.setState({successMessage: "Password lenth must be minimum 8 charachters"})
                }
            }
            else if (this.state.password !== this.state.cpassword) {
                this.setState({ successMessage: "Password doesn't match" })
            }
            else if(this.state.username.split(" ")[1]){
                this.setState({ successMessage: "Incorrect username" })
            }
            else {
                this.setState({ successMessage: "" })
                this.setState({ isloading: true })
                var data = {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    confirmPassword: this.state.password
                }
                RegisterMe(data).then(async (res) => {
                    this.setState({ isloading: false })
                    if (res.status === 201) {
                        await Cookies.remove("session")
                        await Cookies.remove("userProfile")
                        var in60Minutes = 1/24;
                        Cookies.set("username", this.state.username, {expires: in60Minutes})
                        this.setState({ successMessage: "Registration Successful", registered: true })
                    }
                }).catch((err) => {
                    if (err.response) {
                        if (err.response.data.username) {
                            this.setState({ successMessage: "This username is already taken", isloading: false })
                        }
                        else if (err.response.data.email) {
                            this.setState({ successMessage: err.response.data.email, isloading: false })
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
        }
        this.setState({validated: true})
    }
    showPass = () => {
        this.setState({pdisplay: !this.state.pdisplay})
    }
    render() {
        if (this.state.registered) {
            return <Redirect
            to={{
                pathname: "/create-profile",
                state: { username: this.state.username }
            }}
        />
        }
        return (
            <div>
                {/* {this.state.isloading ? (<div className="loader"><img src = {loader} alt="loader"/></div>) : ''} */}
                <div className="rsection signup">
                    <div className="container">
                        <div className="row itemcenter">
                            <div className="col-sm-6 center ">
                                <div className="welcome">
                                    <h4 className="sectionwel">WELCOME TO <br />DESIGNMOCHA.</h4>
                                </div>
                            </div>
                            <div className="col-sm-6 form">
                                <div className="rflex">
                                    <Form noValidate validated={this.state.validated} onSubmit={this.formSubmit}>
                                        {!this.state.successMessage ? '' : (<p className="text-color">{this.state.successMessage}</p>)}
                                        {!this.state.isloading ? '' : (<p className="text-color">Loading please wait..</p>)}
                                        <Form.Group controlId="validationCustom01">
                                            <label for="exampleInputEmail1" className="mochalabel">Username</label>
                                            <input type="text" name="username" className="form-control mochainput " id="exampleInputEmail1" aria-describedby="FullName"  required onChange={this.handleChange} />
                                            <Form.Control.Feedback type="invalid">username is required</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group controlId="validationCustom02">
                                            <label for="exampleInputEmail1" className="mochalabel"> Email Address</label>
                                            <input type="email" name="email" className="form-control mochainput " id="exampleInputEmail1" aria-describedby="Email"  required onChange={this.handleChange} />
                                            <Form.Control.Feedback type="invalid">Enter valid Email Address</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group controlId="validationCustom03" className="prelative">
                                            <label for="exampleInputPassword1" className="mochalabel">Password</label>
                                            <input type={this.state.pdisplay ? "text" : "password"} name="password" className="form-control mochainput " id="exampleInputPassword1"  required onChange={this.handleChange} />
                                            <div className="show-pass" onClick={this.showPass}>
                                                <i className="fa fa-eye primary-color"></i>
                                            </div>
                                            <Form.Control.Feedback type="invalid">Password is required</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group controlId="validationCustom04" className="prelative">
                                            <label for="exampleInputPassword1" className="mochalabel">Confirm Password</label>
                                            <input type={this.state.pdisplay ? "text" : "password"} name="cpassword" className="form-control mochainput" id="exampleInputPassword1"  required onChange={this.handleChange} />
                                            {/* <div className="show-pass" onClick={this.showPass}>
                                                <i className="fa fa-eye primary-color"></i>
                                            </div> */}
                                            <Form.Control.Feedback type="invalid">Enter password</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group controlId="validationCustom04">
                                        <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                            label="Privacy&nbsp;Policy, &nbsp; Terms&nbsp;Of&nbsp;Service"
                                            className="text-color"
                                            name="accept"
                                            required
                                            onClick={this.handleShow}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{display: this.state.acd}}>{this.state.acMessage}</Form.Control.Feedback>
                                        </Form.Group>
                                        <button type="submit" className="mochabtn bg text-color" disabled={this.state.isloading}>Sign Up</button>
                                        <Link to="/login" className="btn form a px-0 text-color">Already A Member</Link>
                                    </Form>
                                    {/* <span className="flow"> or connect with -
                                        <Nav.Link href="/"><i className="cl fa fa-facebook" aria-hidden="true"></i></Nav.Link>
                                        <Nav.Link href="/"><i className="cl fa fa-instagram" aria-hidden="true"></i></Nav.Link>
                                        <Nav.Link href="/"><i className="cl fa fa-twitter" aria-hidden="true"></i></Nav.Link>
                                        <Nav.Link href="/"><i className="cl fa fa-pinterest-p" aria-hidden="true"></i></Nav.Link>
                                    </span> */}
                                </div>
                                <div className="btohome">
                                <a href="/"><p><i className="fa fa-arrow-circle-o-left float-left primary-color"></i><p className="float-left primary-color">Back To Home</p></p></a>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <Modal centered show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>PRIVACY POLICY, TERMS OF SERVICE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Modal.Body>
                    <Modal.Footer>
                        <Button className="mochabtn bg" onClick={this.handleClose}>
                            I Understand
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

Register.propTypes = {};

export default Register;
