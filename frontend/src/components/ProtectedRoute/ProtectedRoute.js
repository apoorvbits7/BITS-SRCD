import { connect } from 'react-redux';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

class ProtectedRoute extends React.Component {
    render() {
        const { component: Component, ...props } = this.props
        return (
            <Route
                {...props}
                render={props => (
                    this.props.email ?
                        <Component {...props} /> :
                        <Redirect to='/' />
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