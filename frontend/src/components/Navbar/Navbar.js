import React from 'react';
import './Navbar.css';
import profilePic from '../../assets/img/profilePic.jpg';
import bitsLogo from '../../assets/img/bits-logo.png';
import bitsLine from '../../assets/img/bits-line.gif';
import { connect } from 'react-redux';
import { GoogleLogout } from 'react-google-login';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logoutDiv: false
        }
    }
    googleLogout = () => {
        // console.log(window.location)
        window.location.href = window.location.origin + '/'
    }
    render() {
        return (
            <>
                <div className="Navbar" style={{ backgroundImage: `url()` }}>
                    <div className="titleContainer">
                        <img src={bitsLogo} className="bitsLogo" />
                        <span className="title">Project Proposal Submission Portal<span style={{ fontWeight: '500' }}>-SRCD</span></span>
                    </div>
                    <img src={this.props.profilePic} className="profilePic" />
                    <div style={{ marginRight: '1%' }}>
                        <GoogleLogout
                            clientId="31251792338-rnkbgfrnjoq3d6kshffdlmvp1j3ik904.apps.googleusercontent.com"
                            buttonText="Logout"
                            onLogoutSuccess={this.googleLogout}
                            className="googleLogoutButton"
                            className='googleLogout'
                            style={{ marginRight: '5%' }}
                        >
                        </GoogleLogout>
                    </div>
                </div>
                <div className="lineContainer">
                    <img src={bitsLine} />
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profilePic: state.profilePic
    }
}

export default connect(mapStateToProps)(Navbar);
