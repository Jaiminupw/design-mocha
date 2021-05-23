import React, { PureComponent } from 'react'
import Footer from './Footer'
import Header from './Header'
import '../css/ework.css'
class TermsConditions extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <div className="terms wrapper mnhide">
                <Header active="tnc"/>
                <div className="abanner top-banner">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="container-fluid"><h3>Terms and Conditions</h3></div>
                            </div>
                        </div>
                    </div>
                <div className="container mb-5 mochatrampt">
                 
                    <h3 className="mt-2 mochatram font-arial">General Site Usage</h3>
                     <p className="mochatramp font-arial">Last Revised: December 16, 2013</p>
                     <p className="mochatramp font-arial">Welcome to www.lorem-ipsum.info. This site is provided as a service to our visitors and may be used for
                    informational purposes only. Because the Terms and Conditions contain legal obligations, please read them
            carefully.</p>
                    <h3 className="mt-2 mochatram font-arial">1. General Site Usage</h3>
                     <p className="mochatramp font-arial">By using this Site, you agree to be bound by, and to comply with, these Terms and Conditions. If you do not
            agree to these Terms and Conditions, please do not use this site.<br></br>
                  <b> PLEASE NOTE:</b> We reserve the right, at our sole discretion, to change, modify or otherwise alter
                    these Terms and Conditions at any time. Unless otherwise indicated, amendments will become effective
                    immediately. Please review these Terms and Conditions periodically. Your continued use of the Site following
                    the posting of changes and/or modifications will constitute your acceptance of the revised Terms and
                    Conditions and the reasonableness of these standards for notice of changes. For your information, this page
            was last updated as of the date at the top of these terms and conditions.</p>
                   
                    
                </div>
                <Footer />
            </div>
        )
    }
}

export default TermsConditions