import React from 'react';
import './Navbar.css';
import profilePic from '../../assets/img/profilePic.jpg';
import bitsLogo from '../../assets/img/bits-logo.png';
import bitsLine from '../../assets/img/bits-line.gif';
import { connect } from 'react-redux';

class Navbar extends React.Component {
    render() {
        return (
            <>
                <div className="Navbar" style={{ backgroundImage: `url()` }}>
                    <div className="titleContainer">
                        <img src={bitsLogo} className="bitsLogo" />
                        <span className="title">Project Proposal Submission Portal<span style={{ fontWeight: '500' }}>-SRCD</span></span>
                    </div>
                    <img src={this.props.profilePic} className="profilePic" />
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
