import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { connect } from 'react-redux';
import { GoogleLogout } from 'react-google-login';

class Sidebar extends React.Component {
    googleLogout = () => {
        // console.log(window.location)
        window.location.href = window.location.origin + '/'
    }
    render() {
        let jsx;
        if (this.props.admin) {
            jsx = <li className="menuItem"><NavLink to="/deck/admin" activeClassName="active"><i class="fa fa-search" aria-hidden="true"></i>Admin</NavLink></li>;
        } else {
            jsx = (
                <>
                    <li className="menuItem"><NavLink exact to="/deck" activeClassName="active"><i class="fa fa-bar-chart" aria-hidden="true"></i>Dashboard</NavLink></li>
                    <li className="menuItem"><NavLink to="/deck/form" activeClassName="active"><i class="fa fa-search" aria-hidden="true"></i>New Submission</NavLink></li>
                </>
            )
        }
        return (
            <div className="Sidebar">
                <ul className="menuList">
                    {jsx}
                    {/* <li className="menuItem"><NavLink to="/chatbot" activeClassName="active"><i class="fa fa-comments-o" aria-hidden="true"></i>Chatbot</NavLink></li> */}
                </ul>
                <GoogleLogout
                    clientId="31251792338-rnkbgfrnjoq3d6kshffdlmvp1j3ik904.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={this.googleLogout}
                    className="googleLogoutButton"
                    className='googleLogout'
                >
                </GoogleLogout>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        admin: state.admin
    }
}

export default connect(mapStateToProps)(Sidebar);