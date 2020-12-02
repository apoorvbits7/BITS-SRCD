import React from 'react';
import './InfoText.css';
import { connect } from 'react-redux';

class InfoText extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="infoText">
                <span>{this.props.infoTexts[this.props.category].heading}</span>
                <p>{this.props.infoTexts[this.props.category].text}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        infoTexts: state.infoTexts
    }
}

export default connect(mapStateToProps)(InfoText) 