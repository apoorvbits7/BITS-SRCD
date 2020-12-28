import React from 'react';
import './Loader.css';
import { connect } from 'react-redux';

class Loader extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.showPreview(this.props.value);
    }
    render() {
        let statusJSX;
        if (this.props.value == false) {
            statusJSX = <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <div class="loader"></div>
            </div>;
        } else if (this.props.value == '-') {
            statusJSX = '-';
        } else {
            statusJSX = <div>
                <a href="#" onClick={this.handleClick}>(View Proposal)</a>
            </div>;
        }
        return (
            statusJSX
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showPreview: (url) => {
            dispatch({
                type: 'SHOW_PREVIEW',
                url: url
            })
        }
    }
}

export default connect(undefined, mapDispatchToProps)(Loader);