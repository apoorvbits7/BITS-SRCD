import { connect } from 'react-redux';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

class ProtectedRoute extends React.Component {
    render() {
        const { component: Component, ...props } = this.props
        console.log('CHECKING AUTH');
        console.log(this.props.email);
        return (
            <Route
                {...props}
                render={props => (
                    this.props.email ?
                        <Component {...props} /> :
                        <Redirect to='/BITS-SRCD/' />
                )}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.userEmail
    }
}

export default connect(mapStateToProps)(ProtectedRoute);