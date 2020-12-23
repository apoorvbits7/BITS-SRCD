import 'date-fns';
import React from 'react';
import './FormSubmit.css';
import TextField from '@material-ui/core/TextField';
import FormNav from './FormNav';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Uploader from '../Uploader/Uploader';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import InfoText from '../InfoText/InfoText';

class PaperDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <InfoText category="form" />
                <div className="formWrapper">
                    <FormNav />
                    <div className="formDetails">
                        <div className="inputFields">
                            <TextField
                                id="outlined-basic"
                                label="Title of Proposal"
                                variant="outlined"
                                className="customInput"
                                placeholder="Title"
                                value={this.props.formDetails.paperTitle}
                                onChange={(e) => { this.props.editDetails('paperTitle', e) }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Name of Principle Investigator"
                                variant="outlined"
                                className="customInput"
                                placeholder="Principle Investigator"
                                value={this.props.formDetails.paperAuthors}
                                onChange={(e) => { this.props.editDetails('paperAuthors', e) }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Designation"
                                variant="outlined"
                                className="customInput"
                                placeholder="Designation"
                                value={this.props.formDetails.designation}
                                onChange={(e) => { this.props.editDetails('designation', e) }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Department"
                                variant="outlined"
                                className="customInput"
                                placeholder="Department"
                                value={this.props.formDetails.department}
                                onChange={(e) => { this.props.editDetails('department', e) }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Institute"
                                variant="outlined"
                                className="customInput"
                                placeholder="Institute"
                                value={this.props.formDetails.institute}
                                onChange={(e) => { this.props.editDetails('institute', e) }}
                            />
                            <span className="info">Co Investigators (Optional)</span>
                            {this.props.coInvestigators.map((row, index) => {
                                return (
                                    <div key={index} className="coInvestigatorsRow">
                                        <TextField
                                            id="outlined-basic"
                                            label="Name"
                                            variant="outlined"
                                            className="inputField"
                                            placeholder="Name"
                                            value={row.name}
                                            onChange={(e) => { this.props.coInvestDetailsChange(e, index, 'name') }}
                                        />
                                        <TextField
                                            id="outlined-basic"
                                            label="Designation"
                                            variant="outlined"
                                            className="inputField"
                                            placeholder="Designation"
                                            value={row.designation}
                                            onChange={(e) => { this.props.coInvestDetailsChange(e, index, 'designation') }}
                                        />
                                        <TextField
                                            id="outlined-basic"
                                            label="Department"
                                            variant="outlined"
                                            className="inputField"
                                            placeholder="Department"
                                            value={row.department}
                                            onChange={(e) => { this.props.coInvestDetailsChange(e, index, 'department') }}
                                        />
                                        <TextField
                                            id="outlined-basic"
                                            label="Institute"
                                            variant="outlined"
                                            className="inputField"
                                            placeholder="Institute"
                                            value={row.institute}
                                            onChange={(e) => { this.props.coInvestDetailsChange(e, index, 'institute') }}
                                        />
                                        <div>
                                            <i onClick={() => { this.props.addCoInvest(index) }} className="fa fa-plus icons" aria-hidden="true"></i>
                                            <i onClick={() => { this.props.deleteCoInvest(index) }} className="fa fa-trash icons" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                )
                            })}
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="flex-start">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        className="customInput"
                                        id="date-picker-inline"
                                        label="Last Date of Submission as mentioned by agency"
                                        value={this.props.formDetails.lastDate}
                                        onChange={(e) => { this.props.editDetails('lastDate', e) }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>

                            {/* <Uploader /> */}
                        </div>
                        {/* <div className="lastRow">
                        <div className={
                            this.props.formDetails.filePipeline.length == 0 ? 'nextButtonDisabled' : 'nextButton'
                        }>
                            Submit
                        </div>
                    </div> */}
                        <div className="lastRow">
                            <NavLink exact to="/deck/form/uploads" className="nextButton">
                                Next
                        </NavLink>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        formDetails: state.formDetails,
        coInvestigators: state.coInvestigators
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editDetails: (field, e) => {
            let obj = {};
            obj.type = "FORM_DETAILS_CHANGE";
            if (field == 'lastDate') {
                obj[field] = e;
                console.log(e);
            } else {
                obj[field] = e.target.value;
            }
            dispatch(obj);
        },
        coInvestNameChange: (e, index) => {
            dispatch({
                type: "CO_INVEST_NAME_CHANGE",
                name: e.target.value,
                index: index
            })
        },
        coInvestAffliationChange: (e, index) => {
            dispatch({
                type: "CO_INVEST_AFFLIATION_CHANGE",
                affliation: e.target.value,
                index: index
            })
        },
        coInvestDetailsChange: (e, index, key) => {
            let obj = {}
            obj.type = "CO_INVEST_DETAILS_CHANGE";
            obj[key] = e.target.value;
            obj.index = index
            dispatch(obj)
        },
        addCoInvest: (index) => {
            dispatch({
                type: "ADD_CO_INVEST",
                index: index
            })
        },
        deleteCoInvest: (index) => {
            dispatch({
                type: "DELETE_CO_INVEST",
                index: index
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaperDetails);