import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Row, Col, Modal } from 'react-bootstrap'
import '../css/profile.css'
import logo from '../images/logo-dark.png'
import { getCategories } from '../services/getCategories';
import csc from 'country-state-city'
import { getAvatars } from '../services/getAvatars';
import { uploadAvatar } from '../services/uploadAvatar';
import { getProfile } from '../services/getProfile';
import { updateProfile } from '../services/updateProfile';
import { uploadPortfolio } from '../services/uploadPortfolio';
import { getAuth } from '../services/getAuth';
import Cookies from 'js-cookie';
import { createProfile } from '../services/createProfile'
import { getPortfolioByUser } from '../services/getPortfolioByUser';
import { selectAvatar } from '../services/selectAvatar';
import { Logout } from '../services/Logout';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
const SortableItem = SortableElement(({ value }) => <img src={URL.createObjectURL(value)} alt="slected" height="100px" width="auto" className="pr-2" />);

const SortableList = SortableContainer(({ items }) => {
    return (
        <ul>
            {items.map((value, index) => (
                <SortableItem key={`item-${value}`} index={index} value={value} />
            ))}
        </ul>
    );
});

class CreateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pshow: false, show: false, catArr: [], Scat: [], SubCat: [], SubSelected: [], countries: [], states: [], avatars: [], fileName: '', fileError: '', profileImg: '', isAvatar: false, basicInfo: {}, djourney: { categories: '', sub_category: '' }, isAuthenticated: true, profile: {}, bloading: '', cloading: '', btn1: "Submit", btn2: "Submit", media: [], pmsg: '', portfolios: [{ title: " ", media_urls: [""], description: "" }], isportfolio: "block", addbtn: "none", pdisplay: "none", phide: "block", fbtn: false, prbtn: false, validated: false, bvalidated: false, cvalidated: false };
    }
    submitBasicProfile = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            e.preventDefault()
            this.setState({ bloading: "Loading please wait..." })
            var basicInfo = { ...this.state.basicInfo }
            basicInfo.full_name = basicInfo.first_name + " " + basicInfo.last_name
            await this.setState({ basicInfo: basicInfo })
            var basicProfile = { ...this.state.basicInfo }
            basicProfile = { first_name: basicProfile.first_name, last_name: basicProfile.last_name, email: basicProfile.email, mobile_number: basicProfile.mobile_number, gender: basicProfile.gender, country: basicProfile.country, state: basicProfile.state, city: basicProfile.city, address: basicProfile.address, date_of_birth: basicProfile.date_of_birth, pin_code: basicProfile.pin_code, full_name: basicProfile.full_name }
            if ((this.state.isProfile === "true") || (this.state.isProfile === true)) {
                basicProfile.profile_name = '';
                var d = new Date(basicProfile.date_of_birth)
                basicProfile.date_of_birth = d.toISOString()
                updateProfile(basicProfile)
                    .then((res) => {
                        this.setState({ bloading: "Profile has been updated successfully" })
                    })
                    .catch((err) => {
                        if (err.response.data.detail === "Illegal session cookie provided: None. session cookie must be a non-empty string.") {
                            this.setState({ bloading: "Session Expired Please Login" })
                            this.setState({ isAuthenticated: false })
                        }
                    })
            }
            else {
                basicProfile.profile_name = '';
                d = new Date(basicProfile.date_of_birth)
                basicProfile.date_of_birth = d.toISOString()
                createProfile(basicProfile)
                    .then((res) => {
                        this.setState({ bloading: "Profile has been Created successfully" })
                        this.setState({ isProfile: true })
                        Cookies.set("userProfile", true)
                    })
                    .catch((err) => {
                        if (err.response.data.detail === "Illegal session cookie provided: None. session cookie must be a non-empty string.") {
                            this.setState({ bloading: "Session Expired Please Login" })
                            this.setState({ isAuthenticated: false })
                        }
                    })
            }
        }
        this.setState({ validated: true })
    }
    submitDesignJourney = async (e) => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            this.setState({ cloading: "Loading please wait..." })
            var djourney = { ...this.state.djourney }
            await this.setState({ djourney: djourney })
            updateProfile(this.state.djourney)
                .then((res) => {
                    this.setState({ cloading: "Profile has been updated successfully" })
                })
                .catch((err) => {
                    if (err.response.data.detail === "Illegal session cookie provided: None. session cookie must be a non-empty string.") {
                        this.setState({ cloading: "Session Expired Please Login" })
                        this.setState({ isAuthenticated: false })
                    }
                })
        }
        this.setState({ bvalidated: true })
    }
    async componentDidMount() {
        await this.setState({ isProfile: Cookies.get("userProfile") })
        var auth = getAuth()
        await this.setState({ isAuthenticated: auth })
        getProfile().then(async (res) => {
            var profile = { ...res.data }
            if (profile.date_of_birth) {
                profile.date_of_birth = profile.date_of_birth.split("T")[0]
            }
            if (profile.first_name) {
                await this.setState({ btn1: "Update", phide: "none" })
            }
            if (profile.profile_name) {
                await this.setState({ btn2: "Update" })
            }
            if (profile.photo_url) {
                await this.setState({ profileImg: profile.photo_url, isAvatar: true })
            }
            await this.setState({ basicInfo: profile, profileImg: profile.photo_url, djourney: profile })
            if (profile.country) {
                var country = this.state.countries.filter((country) => {
                    return profile.country === country.name
                })
                var isoCode = country[0].isoCode
                var states = await csc.getStatesOfCountry(isoCode)
                await this.setState({ states: states })
                if (profile.categories !== "Other") {
                    getCategories()
                        .then(async (res) => {
                            await this.setState({ categories: res })
                            var catArr = []
                            for (let cat in res) {
                                catArr.push(cat)
                            }
                            this.setState({ catArr: catArr })
                            var SubCat = []
                            var scat = this.state.djourney.categories.split(",")
                            scat.map((cat) => {
                                this.state.categories[cat].map((subcat) => {
                                    SubCat.push(subcat)
                                    return subcat
                                })
                                return cat
                            })
                            await this.setState({ SubCat: SubCat })
                        })
                }
            }
        }).catch((err) => {
            // this.setState({isAuthenticated: false})
        })
        var cavatars = await getAvatars()
        cavatars.shift()
        await this.setState({ avatars: cavatars })
        var countries = csc.getAllCountries()
        await this.setState({ countries: countries })

        getCategories()
            .then(async (res) => {
                await this.setState({ categories: res })
                var catArr = []
                for (let cat in res) {
                    catArr.push(cat)
                }
                this.setState({ catArr: catArr })
            })
        getPortfolioByUser().then(async (res) => {
            if (res.data[0].title) {
                await this.setState({ portfolios: res.data, isportfolio: "none", addbtn: "block", pdisplay: "block" })
            }
        }).catch(err => {
            // this.setState({isAuthenticated: false})
        })
    }
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ media }) => ({
            media: arrayMove(media, oldIndex, newIndex),
        }));
    };
    addPortfolio = () => {
        if (this.state.isportfolio === "none") {
            this.setState({ isportfolio: "block", pdisplay: "none", portfolio: {}, pmsg: '', pfileName: "" })
        }
        else {
            this.setState({ isportfolio: "none", pdisplay: "block" })
        }

    }
    clearMessage = () => {
        this.setState({ cloading: "", bloading: "", pmsg: "" })
    }
    handleInput = async (e) => {
        var basicInfo = { ...this.state.basicInfo }
        basicInfo[e.target.name] = e.target.value
        await this.setState({ basicInfo: basicInfo })
    }
    portfolioInput = async (e) => {
        this.setState({ prbtn: false })
        var portfolio = { ...this.state.portfolio }
        portfolio[e.target.name] = e.target.value
        await this.setState({ portfolio: portfolio })
    }
    handleInput2 = async (e) => {
        var djourney = { ...this.state.djourney }
        djourney[e.target.name] = e.target.value
        await this.setState({ djourney: djourney })
    }
    selectAvatar = (e) => {
        this.setState({ fileError: "Please wait..." })
        if (this.state.basicInfo.first_name) {
            var user = {
                photo_url: e.target.getAttribute("src")
            }
            selectAvatar(user)
                .then((res) => {
                    this.setState({ fileError: "Profile updated" })
                    this.setState({ profileImg: e.target.getAttribute("src"), isAvatar: true })
                    this.handleClose()
                }).catch((err) => {
                    this.setState({ fileError: "something went wrong" })
                })
        }
        else {
            this.setState({ fileError: "submit basic information first" })
        }
    }
    submitPortfolio = (e) => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            if (this.state.media.length === 0) {
                this.setState({ pfileName: "please select porfolio images" })
            }
        }
        else {
            if (this.state.media.length === 0) {
                this.setState({ pfileName: "please select porfolio images" })
            }
            this.setState({ pmsg: "Please wait...", prbtn: true })
            var data = {
                portfolio_metadata: JSON.stringify(this.state.portfolio),
                media: this.state.media
            }
            uploadPortfolio(data, (progress) => {
                this.setState({ pfileName: `Uploading Images... - ${progress}%` })
            }).then(res => {
                this.setState({ pmsg: "portfolio uploaded successfully", portfolio: {}, media: [], pfileName: "" })
                getPortfolioByUser().then(async (res) => {
                    await this.setState({ portfolios: res.data, isportfolio: "none", addbtn: "block", pdisplay: "block", prbtn: false, vportfolio: "" })
                }).catch(err => {
                    this.setState({ isAuthenticated: false })
                })
            })
                .catch((err) => {
                    this.setState({ pmsg: "something went wrong", prbtn: false })
                })
        }
        this.setState({ cvalidated: true })
    }
    handleOthers = async (e) => {
        if (e.target.checked) {
            var djourney = { ...this.state.djourney }
            var cats = [djourney.categories.split(",")]
            cats.push("others")
            djourney[e.target.name] = cats.join()
            await this.setState({ djourney: djourney })
        }
        else {

        }
    }
    selectFile = async (e) => {
        if (e.target.files.length !== 0) {
            await this.setState({ fbtn: true })
            var fileExt = e.target.files[0].name.split(".")
            if ((fileExt[fileExt.length - 1].toLowerCase() === "png") || (fileExt[fileExt.length - 1].toLowerCase() === "jpeg") || (fileExt[fileExt.length - 1].toLowerCase() === "jpg")) {

                uploadAvatar(e.target.files[0], async (pr) => {
                    this.setState({ fileName: `Uploading please wait - ${pr}%` })
                }).then((res) => {
                    getProfile()
                        .then(async (res) => {
                            await this.setState({ profileImg: res.data.photo_url, isAvatar: true })
                            this.handleClose()
                        })
                        .catch((err) => {
                            this.setState({ fileName: "create profile first" })
                        })

                })
                    .catch((err) => {
                        if (err.response.data.detail === "Invalid session: Illegal session cookie provided: None. session cookie must be a non-empty string.") {
                            this.setState({ fileName: "Session Expired Please Login" })
                            setTimeout(() => {
                                this.setState({ isAuthenticated: false })
                            }, 2000)
                        }
                    })
            }
            else {
                this.setState({ fileName: "select .png or .jpg file" })
            }
        }
    }
    selectPFile = async (e) => {
        for (var i = 0; i < e.target.files.length; i++) {
            var fileExt = e.target.files[i].name.split(".")
            if ((fileExt[fileExt.length - 1].toLowerCase() === "png") || (fileExt[fileExt.length - 1].toLowerCase() === "jpeg") || (fileExt[fileExt.length - 1].toLowerCase() === "jpg")) {
                var media = [...this.state.media]
                if (media.length !== 5) {
                    media.push(e.target.files[i])
                    await this.setState({ media: media })
                }
                else {
                    this.setState({ pfileName: "you can upload maximun 5 images" })
                }
            }
            else {
                this.setState({ fileName: "select .png or .jpg file" })
            }
        }
    }
    handleShow = () => {
        console.log(this.state.show)
        this.setState({ fileName: "", fbtn: false })
        if (Cookies.get("userProfile") === "true") {
            this.setState({ show: true })
        }
        else {
            alert("submit basic information first")
        }
    }
    handleClose = () => {
        this.setState({ show: false })
    }
    phandleShow = async (e) => {
        var vportfolio = {
            title: e.target.getAttribute("data-title"),
            description: e.target.getAttribute("data-desc"),
            media: e.target.getAttribute("media").split(",")
        }
        await this.setState({ pshow: true, vportfolio: vportfolio })
    }
    phandleClose = () => {
        this.setState({ pshow: false })
    }
    handleCheck = async (e) => {
        if (!this.state.Scat.includes(e.target.name)) {
            var Scat = [...this.state.Scat]
            Scat.push(e.target.name)
            await this.setState({ Scat: Scat })
            const djourney = { ...this.state.djourney }
            djourney.categories = Scat.join()
            await this.setState({ djourney: djourney })
            var SubCat = []
            this.state.Scat.map((cat) => {
                this.state.categories[cat].map((subcat) => {
                    SubCat.push(subcat)
                    return subcat
                })
                return cat
            })
            await this.setState({ SubCat: SubCat })
        }
        else {
            var Srcat = [...this.state.Scat]
            var rmindex = Srcat.findIndex((item) => (item === e.target.name))
            Srcat.splice(rmindex, 1)
            await this.setState({ Scat: Srcat })
            const djourney2 = { ...this.state.djourney }
            djourney2.categories = Srcat.join()
            await this.setState({ djourney: djourney2 })
            var eSubCat = []
            this.state.Scat.map((cat) => {
                this.state.categories[cat].map((subcat) => {
                    eSubCat.push(subcat)
                    return subcat
                })
                return cat
            })
            await this.setState({ SubCat: eSubCat })
        }
    }
    handleSubCat = async (e) => {
        if (e.target.checked) {
            const Subselected = this.state.SubSelected
            Subselected.push(e.target.name)
            await this.setState({ Subselected: Subselected })
            const djourney = { ...this.state.djourney }
            djourney.sub_category = Subselected.join()
            await this.setState({ djourney: djourney })
        }
        else {
            const Subselected = this.state.SubSelected
            var rindex = Subselected.findIndex((item) => { return item === e.target.name })
            Subselected.splice(rindex, 1)
            await this.setState({ Subselected: Subselected })
            const djourney2 = { ...this.state.djourney }
            djourney2.sub_category = Subselected.join()
            await this.setState({ djourney: djourney2 })
        }
    }
    countrySelect = async (e) => {
        var states = await csc.getStatesOfCountry(e.target.selectedOptions[0].getAttribute('data-iso'))
        await this.setState({ states: states })
        var basicInfo = { ...this.state.basicInfo }
        basicInfo[e.target.name] = e.target.value
        await this.setState({ basicInfo: basicInfo })
    }
    LogoutMe = (e) => {
        e.preventDefault()
        Logout()
            .then((res) => {
                this.setState({ isAuthenticated: false })
            })
            .catch((err) => {
                this.setState({ isAuthenticated: false })
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
        var username = 'SahilDesigns'
        if (this.props.location.state) {
            username = this.props.location.state.username;
        }
        if (this.state.basicInfo.firstname_name) {
            username = this.state.basicInfo.first_name + " " + this.state.basicInfo.last_name;
        }
        if (Cookies.get("username")) {
            username = Cookies.get("username");
        }
        return (
            <div className="cprofile">
                <div className="container-fluid cmain p-0">
                    <div className='row frow'>
                        <div className="col-sm-3 paside order-sm-12">
                            <div className="usr-profile pt-5 pb-2">
                                <div className='avatar mb-2'>
                                    <span className='davatar' style={{ display: !this.state.isAvatar ? "flex" : "none" }}>{username[0]}</span>
                                    <img src={this.state.profileImg} alt='profile' style={{ display: this.state.isAvatar ? "block" : "none" }} className="rounded-circle" />
                                </div>
                                <p className="font-roboto text-center mb-0 weight-600">Add an avatar</p>
                                <div className='ch-image'>
                                    <button className='btn btn-av font-roboto mb-2' onClick={this.handleShow}>Choose image</button>
                                </div>
                            </div>
                            <hr className='hr-white' />
                            <div className='ctoggle'>
                                <div href='/' className="icon" id="ctoggle">
                                    <i className="fa fa-bars"></i>
                                </div></div>
                            <div className='ptabs' id='ptabs'>
                                <ul className="nav nav-pills" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active text-color" data-toggle="pill" href="#pbasic" onClick={this.clearMessage}>Profile Basics</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-color" data-toggle="pill" href="#djourney" onClick={this.clearMessage}>Design journey</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-color" data-toggle="pill" href="#mwork" onClick={this.clearMessage}>My Work</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-color" data-toggle="pill" href="#vprofile" onClick={this.clearMessage}>Apply for Verification</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-color" data-toggle="pill" href="#pstatus" onClick={this.clearMessage}>Profile Status</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-color" data-toggle="pill" href="#bpayment">Billing & Payment</a>
                                    </li>
                                </ul>
                            </div>
                            <Link to="" className="text-color lgout" onClick={this.LogoutMe}>Logout</Link>
                            <Modal show={this.state.show} onHide={this.handleClose} centered size="lg" className="cmodal">
                                <Modal.Header closeButton>
                                    <Modal.Title className="cmtitle text-center w-100">
                                        <div className="d-flex align-items-center">
                                            <div class="upload-btn-wrapper">
                                                <label class="mochabtn bg float-left" htmlFor="cupload" >Upload a file</label>
                                                <input type="file" name="myfile" id="cupload" onChange={this.selectFile} disabled={this.state.fbtn} />
                                                <p class="float-left mb-0 primary-color" style={{padding: 10 + "px"}}>Select from default avatars</p>
                                                <p className="font-roboto mb-0 w-100 float-left text-left">{this.state.fileName}</p>
                                                <p className="font-arial mb-0 w-100 float-left text-left">{this.state.fileError}</p>
                                            </div>
                                        </div>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="select-av">
                                        <div className="default-av">
                                            {
                                                this.state.avatars.map((avatar) => {
                                                    return <img src={avatar} className="rounded-circle float-left mr-3 mb-3" alt="avatar" width="80px" onClick={this.selectAvatar} />
                                                })
                                            }
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </div>
                        <div className="col-sm-9 order-sm-1">
                            <div className="clogo">
                                <a href='/'><img src={logo} alt="logo" /></a>
                            </div>
                            <div className="tab-content container">
                                <div id="pbasic" className="container tab-pane active"><br />
                                    <div>
                                        <h3 className="weight-600">Welcome, {(username !== '') ? username : ''}<br />Let's create your profile..</h3>
                                        <p>Let other get to know you better!</p>
                                        <div className="form-1">
                                            <Form noValidate validated={this.state.validated} onSubmit={this.submitBasicProfile}>
                                                <Row>
                                                    <Form.Group as={Col} sm="6" controlId="validationCustom01">
                                                        <Form.Label>First Name</Form.Label>
                                                        <Form.Control name="first_name" placeholder="John" value={this.state.basicInfo ? this.state.basicInfo.first_name : ''} onChange={this.handleInput} required />
                                                        <Form.Control.Feedback type="invalid">First Name is required</Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group as={Col} sm="6" controlId="validationCustom02">
                                                        <Form.Label>Last Name</Form.Label>
                                                        <Form.Control name="last_name" placeholder="Doe" value={this.state.basicInfo ? this.state.basicInfo.last_name : ''} onChange={this.handleInput} required />
                                                        <Form.Control.Feedback type="invalid">Last Name is required</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Row>
                                                <Row>
                                                    <Form.Group as={Col} sm="6" controlId="validationCustom03">
                                                        <Form.Label>Phone</Form.Label>
                                                        <Form.Control name="mobile_number" value={this.state.basicInfo ? this.state.basicInfo.mobile_number : ''} placeholder="999 999 9999" onChange={this.handleInput} required />
                                                        <Form.Control.Feedback type="invalid">Phone number is required</Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group as={Col} sm="6" controlId="validationCustom04">
                                                        <Form.Label>Gender</Form.Label>
                                                        <Form.Control name="gender" as="select" aria-required="true" id="State" onChange={this.handleInput} required>
                                                            <option value="">Select Gender</option>
                                                            <option selected={((this.state.basicInfo) && (this.state.basicInfo.gender === "Male")) ? "selected" : false} value="Male">Male</option>
                                                            <option selected={((this.state.basicInfo) && (this.state.basicInfo.gender === "Female")) ? "selected" : false} value="Female">Female</option>
                                                            <option selected={((this.state.basicInfo) && (this.state.basicInfo.gemder === "Others")) ? "selected" : false} value="Others">Others</option>
                                                        </Form.Control>
                                                        <Form.Control.Feedback type="invalid">Select your Gender</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Row>
                                                <Row>
                                                    <Form.Group as={Col} sm="6" controlId="validationCustom03">
                                                        <Form.Label>Date of Birth</Form.Label>
                                                        <Form.Control name="date_of_birth" type="date" value={this.state.basicInfo ? this.state.basicInfo.date_of_birth : ''} placeholder="Date of Birth" onChange={this.handleInput} required />
                                                        <Form.Control.Feedback type="invalid">Date of Birth is required</Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group as={Col} sm="6" controlId="validationCustom03">
                                                        <Form.Label>Country</Form.Label>
                                                        <Form.Control as="select" name="country" defaultValue={this.state.basicInfo ? this.state.basicInfo.country : "select"} onChange={this.countrySelect}>
                                                            <option>Select Country</option>
                                                            {this.state.countries.map((country) => {
                                                                return (<option data-iso={country.isoCode} value={country.name} selected={((this.state.basicInfo) && (this.state.basicInfo.country === country.name)) ? "selected" : false}>{country.name}</option>)
                                                            })}
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Row>
                                                <Row>
                                                    <Form.Group as={Col} sm="6" controlId="validationCustom03">
                                                        <Form.Label>Address</Form.Label>
                                                        <Form.Control name="address" placeholder="Your Full Address" value={this.state.basicInfo ? this.state.basicInfo.address : ''} onChange={this.handleInput} />
                                                    </Form.Group>
                                                    <Form.Group as={Col} sm="6" controlId="validationCustom03">
                                                        <Form.Label>State</Form.Label>
                                                        <Form.Control name="state" as="select" defaultValue="select" onChange={this.handleInput}>
                                                            <option>Select State</option>
                                                            {this.state.states.map((state) => {
                                                                return (<option value={state.name} selected={((this.state.basicInfo) && (this.state.basicInfo.state === state.name)) ? "selected" : false}>{state.name}</option>)
                                                            })}
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Row>
                                                <Row>
                                                    <Form.Group as={Col} sm="6" controlId="validationCustom03">
                                                        <Form.Label>Pincode</Form.Label>
                                                        <Form.Control name="pin_code" placeholder="Enter Pincode" value={this.state.basicInfo ? this.state.basicInfo.pin_code : ''} onChange={this.handleInput} />
                                                    </Form.Group>

                                                    <Form.Group as={Col} sm="6" controlId="validationCustom03">
                                                        <Form.Label>City</Form.Label>
                                                        <Form.Control name="city" placeholder="Enter City Name" value={this.state.basicInfo ? this.state.basicInfo.city : ''} onChange={this.handleInput} />
                                                    </Form.Group>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <p>{this.state.bloading}</p>
                                                    </Col>
                                                    <Col>
                                                        <button className="mochabtn bg float-right">{this.state.btn1}</button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                                <div id="djourney" className="container tab-pane fade"><br />
                                    <h3 className="weight-600">{`${username} / Design Journey`}</h3>
                                    <div className="form-2">
                                        <Form>
                                            {/* <Row>
                                                <Col>
                                                    <Form.Label>Add username</Form.Label>
                                                    <Form.Control name="profile_name" onChange={this.handleInput2} value={this.state.djourney ? this.state.djourney.profile_name : ''} />
                                                    <span>This is the second thing that others would see after your avatar. So please make sure it is catchy enough for others to remember eg.  Logoninja, Artistik, Quickart, etc..  Please avoid using your name here. </span>
                                                </Col>
                                            </Row> */}
                                            <Row>
                                                <Col>
                                                    <Form.Label>Add your profile description</Form.Label>
                                                    <Form.Control name="profile_description" onChange={this.handleInput2} value={this.state.djourney ? this.state.djourney.profile_description : ''} />
                                                    <span>This is the third thing that others would see next to your user name. This should briefely tell others on what do you have to offer.  eg. “modern logo designs in 24 hours”,“real hand painted artworks only”, “High quality video editing”. Max 50 alphabets. </span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Label>How would you define your design sensibility/ style</Form.Label>
                                                    <Form.Control name="design_sensibility_style" as="textarea" rows={3} onChange={this.handleInput2} value={this.state.djourney ? this.state.djourney.design_sensibility_style : ''} />
                                                    <span>We believe every designer has his/her own way of approaching design. Some make it arty, white others make it more detail oriented, etc...this data will help us in sharpening your profile and the getting you the right work.Max 300 words. </span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Label>Your design journey so far</Form.Label>
                                                    <Form.Control name="design_journey" as="textarea" rows={3} onChange={this.handleInput2} value={this.state.djourney ? this.state.djourney.design_journey : ''} />
                                                    <span>Brief description. max 600 words.</span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                </Col>
                                                <Col>
                                                    <a className="mochabtn bg float-right" data-toggle="pill" href="#djourney-2">Continue</a>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </div>
                                <div id="djourney-2" className="container tab-pane fade"><br />
                                    <h3 className="weight-600">Sahil Mahajan / Design Journey</h3>
                                    <div className="form-2 mt-2">
                                        <Form noValidate validated={this.state.bvalidated} onSubmit={this.submitDesignJourney}>
                                            <h5 className='mt-3 mb-0'>What Categories do you design for</h5>
                                            <span>You can select more than one category also</span>
                                            <Row className='mt-2'>
                                                {this.state.catArr.map((cat) => {
                                                    return (<Col sm={3} key={cat}>
                                                        <div className="form-check">
                                                            <input type="checkbox" className="form-check-input" id={cat.split(" ")[0]} name={cat} onChange={this.handleCheck} checked={(this.state.djourney.categories && this.state.djourney.categories.split(",").includes(cat)) ? "checked" : ""} />
                                                            <label htmlFor={cat.split(" ")[0]} className='form-label '>{cat}</label>
                                                        </div>
                                                    </Col>)
                                                })}
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Check type="checkbox" name="categories" label="Others" onChange={this.handleOthers} />
                                                </Col>
                                            </Row>
                                            <h5 className='mt-3 mb-0'>Select the sub-categories you wish to offer your services in</h5>
                                            <span>You can select more than one category also</span>
                                            <Row className='mt-2'>
                                                {this.state.SubCat.map((cat) => {
                                                    return (<Col sm={3} key={cat}>
                                                        <div className="form-check">
                                                            <input type="checkbox" className="form-check-input" key={cat} id={cat.split(" ")[0]} name={cat} onChange={this.handleSubCat} checked={(this.state.djourney.sub_category && this.state.djourney.sub_category.split(",").includes(cat)) ? "checked" : ""} />
                                                            <label htmlFor={cat.split(" ")[0]} className='form-label'>{cat}</label>
                                                        </div>
                                                    </Col>)
                                                })}
                                            </Row>
                                            <hr className="chr"></hr>
                                            <h5 class="mt-3 mb-0">Online Presence</h5>
                                            <Row>
                                                <Col>
                                                    <Form.Label><b>Personal Website</b></Form.Label>
                                                    <Form.Control name="personal_website" onChange={this.handleInput2} value={this.state.djourney ? this.state.djourney.personal_website : ''} />
                                                    <span>Your home page, blog or company site.</span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col} controlId="validationCustom1">
                                                    <Form.Label><b>Portfolio URL</b></Form.Label>
                                                    <Form.Control name="portfolio_urls" onChange={this.handleInput2} value={this.state.djourney ? this.state.djourney.portfolio_urls : ''} required />
                                                    <span>Share your current online presence like Behance, Dribbble, etc.(links separated by ",")</span>
                                                    <br />
                                                    <Form.Control.Feedback type="invalid">Please add portfolio urls</Form.Control.Feedback>
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <p>{this.state.cloading}</p>
                                                </Col>
                                                <Col>
                                                    <button className="mochabtn bg float-right">{this.state.btn2}</button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </div>
                                <div id="mwork" className="container tab-pane fade"><br />
                                    <h3 className="weight-600">Designguru / My Work</h3>
                                    <p></p>
                                    <button className="mochabtn bg float-right mb-2" style={{ display: this.state.addbtn }} onClick={this.addPortfolio} disabled={this.state.prbtn}>Add Portfolio</button>
                                    <div className="myportfolios mb-2" style={{ display: this.state.pdisplay }}>
                                        {
                                            this.state.portfolios.map((portfolio) => {
                                                return (
                                                    <div className='portfolio-data shadow w-100'>
                                                        <div className="pimg float-left p-2"><img src={portfolio.media_urls[0]} alt={portfolio.media_urls[0]} /></div>
                                                        <div className="ptitle float-left p-2"><h5>{portfolio.title}</h5></div>
                                                        <i className="fa fa-eye float-right" data-title={portfolio.title} data-desc={portfolio.description} media={portfolio.media_urls} onClick={this.phandleShow}></i>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <p>{this.state.pmsg}</p>
                                    <div className="form-4" style={{ display: this.state.isportfolio }}>
                                        <Form noValidate validated={this.state.cvalidated} onSubmit={this.submitPortfolio}>
                                            <Row>
                                                <Form.Group as={Col} controlId="ValidationCustom1">
                                                    <Form.Label>Write your portfilio title </Form.Label>
                                                    <Form.Control name="title" onChange={this.portfolioInput} required />
                                                    <span>Write your portfilio title </span>
                                                    <Form.Control.Feedback type="invalid" >Portfolio title is requireds</Form.Control.Feedback>
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col} controlId="ValidationCustom2">
                                                    <Form.Label>Add your portfolio description</Form.Label>
                                                    <Form.Control as="textarea" rows={5} name="description" onChange={this.portfolioInput} required />
                                                    <span>Write your portfilio description </span>
                                                    <Form.Control.Feedback type="invalid" >Portfolio description is requireds</Form.Control.Feedback>
                                                </Form.Group>
                                            </Row>
                                            <Row className='mt-3'>
                                                <Col>
                                                    <div class="upload-btn-wrapper">
                                                        <p className="font-arial">you can upload max 5 images</p>
                                                        <span className="font-arial">please drag and drop to r-order images</span>
                                                        <div>
                                                            <SortableList items={this.state.media} onSortEnd={this.onSortEnd} axis="x" />
                                                            {/* {
                                                                // this.state.media.map((file) => {
                                                                //     return <img className="p-2" src={URL.createObjectURL(file)} alt={file.name} key={file.name} height="80px" width="auto" />
                                                                // })
                                                            } */}
                                                        </div>
                                                        <label class="mochabtn bg text-color font-roboto" htmlFor="pupload" disabled={this.state.prbtn}>choose image</label>
                                                        <input type="file" name="myfile" id="pupload" onChange={this.selectPFile} multiple required />
                                                    </div>
                                                    <p className="font-roboto">{this.state.pfileName}</p>
                                                    <p className="font-arial">{this.state.pfileError}</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                </Col>
                                                <Col>
                                                    <button className="mochabtn bg float-right" disabled={this.state.prbtn}>Submit</button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </div>
                                <Modal show={this.state.pshow} onHide={this.phandleClose} centered size="lg" className="cmodal">
                                    <Modal.Header closeButton>
                                        <Modal.Title className="cmtitle w-100 font-roboto">Portfolio</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={this.submitPortfolio}>
                                            <Row>
                                                <Col>
                                                    <Form.Label>Portfolio Title</Form.Label>
                                                    <Form.Control name="title" value={this.state.vportfolio ? this.state.vportfolio.title : ''} onChange={this.portfolioInput} required readOnly />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Label>Portfolio Description</Form.Label>
                                                    <Form.Control as="textarea" rows={5} name="description" value={this.state.vportfolio ? this.state.vportfolio.description : ''} onChange={this.portfolioInput} required readOnly />
                                                </Col>
                                            </Row>
                                            <Row className='mt-3'>
                                                <Col>
                                                    <div class="upload-btn-wrapper">
                                                        <p>Portfolio images</p>
                                                        <div>
                                                            {
                                                                this.state.vportfolio ? (this.state.vportfolio.media.map((file) => {
                                                                    return <img className="p-2" src={file} alt={file} key={file} height="80px" width="auto" />
                                                                })) : ''
                                                            }
                                                        </div>
                                                        {/* <label class="mt-2 p-2 btn my-btn cbtn text-color font-roboto" htmlFor="pupload">choose image</label>
                                                        <input type="file" name="myfile" id="pupload" onChange={this.selectPFile} multiple required /> */}
                                                    </div>
                                                    {/* <p className="text-center font-roboto">{this.state.pfileName}</p>
                                                    <p className="text-center">{this.state.pfileError}</p>
                                                    <br /><br /> */}
                                                </Col>
                                            </Row>
                                            {/* <Row>
                                                <Col>
                                                </Col>
                                                <Col>
                                                    <button className="mt-5 btn my-btn cbtn text-color float-right">Submit</button>
                                                </Col>
                                            </Row> */}
                                        </Form>
                                    </Modal.Body>
                                </Modal>
                                <div id="pstatus" className="container tab-pane fade"><br />
                                    <h3>Menu 2</h3>
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                                </div>
                                <div id="vprofile" className="container tab-pane fade"><br />
                                    <h3 className="weight-600">Schedue a meeting</h3>
                                    <p>Schedule a meetine with us to get yourself verified on Designmocha.</p>
                                    <span></span>
                                    <div className='calendly-inline-widget' data-url='https://calendly.com/designmocha?text_color=737981&amp;primary_color=ff8c00' style={{ width: 100 + "%", height: 67 + "vh" }}></div>
                                </div>
                                <div id="bpayment" className="container tab-pane fade"><br />
                                    <h3>Menu 2</h3>
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateProfile.propTypes = {};

export default CreateProfile;