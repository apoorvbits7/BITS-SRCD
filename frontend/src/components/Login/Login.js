import React from 'react';
import './Login.css';
import bitsLogo from '../../assets/img/bits-logo.png';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { connect } from 'react-redux';
import cogoToast from 'cogo-toast';

class Login extends React.Component {
    googleLoginSuccess = async (response) => {
        // let result = await axios.post('https://amazonaffliate.tk/backend/api/getOrCreateUser', response);
        // this.props.login(result.data.coins, response.profileObj.googleId);
        let result;
        try {
            if (!response.profileObj.email.includes('@pilani.bits-pilani.ac.in')) {
                cogoToast.error("Please login with BITS email!");
                return;
            }
            result = await axios.post('http://172.24.16.87.xip.io:3100/user/me', {
                email: response.profileObj.email
            })
            result = result.data;
        } catch (err) {
            await axios.post('http://172.24.16.87.xip.io:3100/user/new', {
                email: response.profileObj.email,
                name: response.profileObj.name
            })
            result = []
        }
        let admin = false;
        if (response.profileObj.email == 'srcdonline@pilani.bits-pilani.ac.in') {
            admin = true;
        }
        this.props.login(response.profileObj.email, response.profileObj.name, result, response.profileObj.imageUrl, admin);
        if (admin) {
            this.props.history.push("/deck/admin");
        } else {
            this.props.history.push("/deck");
        }
    }

    googleLoginFailure = (response) => {
        console.log(response);
    }
    render() {
        return (
            <div className="Login">
                <img className="image" src={bitsLogo} />
                <GoogleLogin
                    clientId="31251792338-v4t5pvjq1lgmdo5rkdhvpv2h9on8ri4q.apps.googleusercontent.com"
                    buttonText="Sign in with Google"
                    onSuccess={this.googleLoginSuccess}
                    onFailure={this.googleLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={false}
                    className="googleLogin"
                    isSignedIn={true}
                />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, name, projects, image, admin) => {
            dispatch({
                type: 'LOGIN',
                email: email,
                projects: projects,
                image: image,
                admin: admin,
                name: name
            })
        }
    }
}

export default connect(undefined, mapDispatchToProps)(Login);