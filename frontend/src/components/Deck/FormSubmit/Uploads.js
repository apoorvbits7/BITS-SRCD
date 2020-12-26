import React from 'react';
import './FormSubmit.css';
import TextField from '@material-ui/core/TextField';
import FormNav from './FormNav';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Uploader from '../Uploader/Uploader';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import InfoText from '../InfoText/InfoText';
import Checkbox from '@material-ui/core/Checkbox';
import Swal from 'sweetalert2';

class Uploads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    submitFile = async () => {
        const filesData = new FormData();
        filesData.append('email', this.props.userEmail);
        filesData.append('title', this.props.formDetails.paperTitle);
        filesData.append('designation', this.props.formDetails.designation);
        filesData.append('department', this.props.formDetails.department);
        filesData.append('institute', this.props.formDetails.institute);
        let allFilesProposal = this.props.formDetails.filePipeline.proposal[0].file;
        let allFilesEndor = this.props.formDetails.filePipeline.edorsements[0].file;
        if (!this.props.experiencedFaculty) {
            filesData.append('reviewerOneName', this.props.formDetails.reviewerOneName);
            filesData.append('reviewerTwoName', this.props.formDetails.reviewerTwoName);
            let allFilesCommentsOne = this.props.formDetails.filePipeline.commentsOne[0].file;
            let allFilesCommentsTwo = this.props.formDetails.filePipeline.commentsTwo[0].file;
            filesData.append('revCommentsOne', allFilesCommentsOne);
            filesData.append('revCommentsTwo', allFilesCommentsTwo);
        }
        // files.map((file) => {
        //     filesData.append('docs', file);
        // })
        let coInvest = this.props.coInvestigators;
        coInvest = coInvest.map((x) => JSON.stringify(x));
        console.log('THIS IS THE COINVESTORS');
        console.log(coInvest);
        filesData.append('projProp', allFilesProposal);
        filesData.append('endoCert', allFilesEndor);
        filesData.append('prinInvest', this.props.formDetails.paperAuthors)
        if (this.props.fundingCall.selected) {
            filesData.append('funding', this.props.fundingCall.selected)
        } else {
            filesData.append('funding', this.props.fundingCall.others)
        }

        filesData.append('coInvest', coInvest);
        let result;
        try {
            result = await axios({
                method: "POST",
                url: "http://172.24.16.87.xip.io:5000/sub/submit",
                data: filesData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (err) {
            console.log(err)
        }
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
        console.log(this.props.formDetails.paperTitle);
        console.log(this.props.formDetails.filePipeline.proposal);
        console.log(this.props.formDetails.filePipeline.edorsements);
        console.log(this.props.formDetails.paperAuthors)
        console.log(this.props.formDetails.designation)
        console.log(this.props.formDetails.department)
        console.log(this.props.formDetails.institute)
        if (
            !this.props.formDetails.paperTitle ||
            this.props.formDetails.filePipeline.proposal.length == 0 ||
            this.props.formDetails.filePipeline.edorsements.length == 0 ||
            !this.props.formDetails.paperAuthors ||
            !this.props.formDetails.designation ||
            !this.props.formDetails.department ||
            !this.props.formDetails.institute ||
            !this.props.fundingCall.selected
        ) {
            Swal.fire(
                'Missing Fields!',
                'All fields are necessary. Please fill them before submitting.',
                'info'
            );
            return;
        }
        this.setState({
            loading: true
        })
        let result = await this.submitFile();
        console.log(result)
        let url = 'http://172.24.16.87.xip.io:5000/sub/' + result.id + '/0';
        this.props.addFiles(url);
        this.setState({
            loading: false
        })
        // allFiles.forEach(f => f.remove());
    }

    render() {
        let reviewerDisplay = this.props.experiencedFaculty ? 'none' : '';
        return (
            <>
                <InfoText category="form" />
                <div className="formWrapper">
                    <LoadingOverlay
                        active={this.state.loading}
                        spinner
                        text='Submitting...'
                        styles={{
                            position: 'fixed',
                            background: 'rgba(0, 0, 0, 0.5)',
                            width: '100%',
                            height: '100%'
                        }}
                    >
                    </LoadingOverlay>
                    <FormNav />
                    <div className="formDetails">
                        <div className="inputFields">
                            <span style={{ fontSize: '1.2rem' }} className="info">Project Proposal Summary (incl Budget)</span>
                            <Uploader fileType="proposal" />
                            <span style={{ fontSize: '1.2rem' }} className="info">Endorsement Certificates</span>
                            <Uploader fileType="edorsements" />
                            <p style={{ textAlign: 'left', marginBottom: 0 }}>Faculty with experience of having obtained 2 or more major projects (each Rs 25 lakhs or above) in last 5 years as PI, may be
                            exempted from technical review at the Department level, if they request for the same. If you are eligible and wish to request for
                            this exemption, kindly check this box
                              <Checkbox
                                    checked={this.props.experiencedFaculty}
                                    onChange={this.props.experiencedFacultyCheck}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    color="primary"
                                    style={{ width: '5%' }}
                                />
                            </p>
                            <TextField
                                id="outlined-basic"
                                label="Name of Reviewer 1"
                                variant="outlined"
                                className="customInput"
                                placeholder="Name of Reviewer 1"
                                value={this.props.formDetails.reviewerOneName}
                                onChange={(e) => { this.props.reviewerNameChange(1, e) }}
                                style={{ display: reviewerDisplay }}
                            />
                            <span style={{ fontSize: '1.2rem', display: reviewerDisplay }} className="info">Reviewer 1 Comments</span>
                            {!this.props.experiencedFaculty && <Uploader fileType="commentsOne" />}
                            <TextField
                                id="outlined-basic"
                                label="Name of Reviewer 2"
                                variant="outlined"
                                className="customInput"
                                placeholder="Name of Reviewer 2"
                                value={this.props.formDetails.reviewerTwoName}
                                onChange={(e) => { this.props.reviewerNameChange(2, e) }}
                                style={{ display: reviewerDisplay }}
                            />
                            <span style={{ fontSize: '1.2rem', display: reviewerDisplay }} className="info">Reviewer 2 Comments</span>
                            {!this.props.experiencedFaculty && <Uploader fileType="commentsTwo" />}
                        </div>
                        <div className="lastRow">
                            <div onClick={this.handleSubmit} className="nextButton">
                                Submit
                        </div>
                        </div>
                        {/* <div className="lastRow">
                        <NavLink exact to="/deck/form/paper-details" className="nextButton">
                            Next
                        </NavLink>
                    </div> */}
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        formDetails: state.formDetails,
        email: state.userEmail,
        coInvestigators: state.coInvestigators,
        fundingCall: state.fundingCall,
        userEmail: state.userEmail,
        experiencedFaculty: state.experiencedFaculty
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
        reviewerNameChange: (number, e) => {
            dispatch({
                type: 'REVIEWER_NAME_CHANGE',
                number: number,
                name: e.target.value
            })
        },
        experiencedFacultyCheck: () => {
            dispatch({
                type: 'EXPERIENCED_FACULTY_CHECK'
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploads);