import React from 'react';
import './Navbar.css';
import profilePic from '../../assets/img/profilePic.jpg'

class Navbar extends React.Component {
    render() {
        return (
            <div className="Navbar">
                <span className="title">BITS<span style={{ fontWeight: '500' }}> SRCD</span></span>
                <img src={profilePic} className="profilePic" />
            </div>
        )
    }
}

export default Navbar;