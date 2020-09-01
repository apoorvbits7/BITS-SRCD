import React from 'react';
import './FormSubmit.css';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormNav from './FormNav';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class BasicDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    renderValue = (value) => {
        return value;
    }

    render() {
        return (
            <div className="formWrapper">
                <FormNav />
                <div className="formDetails">
                    <div className="inputFields">
                        <TextField
                            id="filled-read-only-input"
                            label="Full Name"
                            variant="outlined"
                            className="customInput"
                            placeholder="Full Name"
                            value={this.props.userName}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                        />
                        <TextField
                            id="filled-read-only-input"
                            label="Email"
                            variant="outlined"
                            className="customInput"
                            placeholder="Email"
                            value={this.props.userEmail}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                        />
                        {/* <TextField
                            id="outlined-basic"
                            label="Phone Number"
                            variant="outlined"
                            className="customInput"
                            placeholder="Phone Number"
                            onChange={(e) => { this.props.editDetails('phoneNumber', e) }}
                        /> */}
                        <FormControl className="formControl">
                            <InputLabel id="demo-simple-select-label">Choose your funding call</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className="customSelect"
                                value={this.props.fundingCall.selected}
                                renderValue={() => this.renderValue(this.props.fundingCall.selected)}
                                onChange={this.props.selectFundingCall}
                            >
                                {this.props.fundingCall.options.map(
                                    (option, index) => <MenuItem value={index}>{option}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="lastRow">
                        <NavLink exact to="/form/paper-details" className="nextButton">
                            Next
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.userName,
        userEmail: state.userEmail,
        formDetails: state.formDetails,
        fundingCall: state.fundingCall,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editDetails: (field, e) => {
            let obj = {};
            obj.type = "FORM_DETAILS_CHANGE";
            obj[field] = e.target.value;
            dispatch(obj);
        },
        selectFundingCall: (e) => {
            dispatch({
                type: 'SELECT_FUNDING_CALL',
                selectedIndex: e.target.value
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicDetails);