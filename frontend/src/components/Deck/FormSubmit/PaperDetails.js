import React from 'react';
import './FormSubmit.css';
import TextField from '@material-ui/core/TextField';
import FormNav from './FormNav';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Uploader from '../Uploader/Uploader';
import axios from 'axios';

class PaperDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="formWrapper">
                <FormNav />
                <div className="formDetails">
                    <div className="inputFields">
                        <TextField
                            id="outlined-basic"
                            label="Title"
                            variant="outlined"
                            className="customInput"
                            placeholder="Title"
                            value={this.props.formDetails.paperTitle}
                            onChange={(e) => { this.props.editDetails('paperTitle', e) }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Principle Investigator"
                            variant="outlined"
                            className="customInput"
                            placeholder="Principle Investigator"
                            value={this.props.formDetails.paperAuthors}
                            onChange={(e) => { this.props.editDetails('paperAuthors', e) }}
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
                                        onChange={(e) => { this.props.coInvestNameChange(e, index) }}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Affliation"
                                        variant="outlined"
                                        className="inputField"
                                        placeholder="Affliation"
                                        value={row.affliation}
                                        onChange={(e) => { this.props.coInvestAffliationChange(e, index) }}
                                    />
                                    <i onClick={() => { this.props.addCoInvest(index) }} className="fa fa-plus icons" aria-hidden="true"></i>
                                    <i onClick={() => { this.props.deleteCoInvest(index) }} className="fa fa-trash icons" aria-hidden="true"></i>
                                </div>
                            )
                        })}

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
                        <NavLink exact to="/form/uploads" className="nextButton">
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
        formDetails: state.formDetails,
        coInvestigators: state.coInvestigators
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