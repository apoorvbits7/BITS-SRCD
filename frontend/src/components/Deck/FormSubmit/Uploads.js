import React from 'react';
import './FormSubmit.css';
import TextField from '@material-ui/core/TextField';
import FormNav from './FormNav';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Uploader from '../Uploader/Uploader';
import axios from 'axios';

class Uploads extends React.Component {
    constructor(props) {
        super(props);
    }

    submitFile = async () => {
        const filesData = new FormData();
        filesData.append('email', 'example');
        filesData.append('title', this.props.formDetails.paperTitle);
        let allFilesProposal = this.props.formDetails.filePipeline.proposal[0].file;
        let allFilesComments = this.props.formDetails.filePipeline.proposal[0].file;
        let allFilesEndor = this.props.formDetails.filePipeline.proposal[0].file;
        // files.map((file) => {
        //     filesData.append('docs', file);
        // })
        filesData.append('projProp', allFilesProposal);
        filesData.append('endoCert', allFilesEndor);
        filesData.append('revComments', allFilesComments);
        filesData.append('prinInvest', this.props.formDetails.paperAuthors)
        filesData.append('funding', this.props.fundingCall.selected)
        let result = await axios({
            method: "POST",
            url: "https://srcd-temp.herokuapp.com/sub/submit",
            data: filesData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(result.data);
        return result.data;
    }

    handleSubmit = async () => {
        // let allFiles = this.props.formDetails.filePipeline.proposal;
        // allFiles.concat(this.props.formDetails.filePipeline.comments);
        // allFiles.concat(this.props.formDetails.filePipeline.edorsements);
        // let newFiles = allFiles.map((file) => {
        //     return file.file;
        // })
        let result = await this.submitFile();
        console.log(result)
        let url = 'https://srcd-temp.herokuapp.com/check/' + result.id + '/0';
        this.props.addFiles(url);
        // allFiles.forEach(f => f.remove());
    }

    render() {
        return (
            <div className="formWrapper">
                <FormNav />
                <div className="formDetails">
                    <div className="inputFields">
                        <span style={{ fontSize: '1.2rem' }} className="info">Project Proposal</span>
                        <Uploader fileType="proposal" />
                        <span style={{ fontSize: '1.2rem' }} className="info">Reviewer Comments</span>
                        <Uploader fileType="comments" />
                        <span style={{ fontSize: '1.2rem' }} className="info">Endorsement Certificates</span>
                        <Uploader fileType="edorsements" />
                    </div>
                    <div className="lastRow">
                        <div onClick={this.handleSubmit} className="nextButton">
                            Submit
                        </div>
                    </div>
                    {/* <div className="lastRow">
                        <NavLink exact to="/form/paper-details" className="nextButton">
                            Next
                        </NavLink>
                    </div> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        formDetails: state.formDetails,
        email: state.userEmail,
        coInvestigators: state.coInvestigators,
        fundingCall: state.fundingCall
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFiles: (url) => {
            dispatch({
                type: "ADD_FILES",
                url: url
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploads);