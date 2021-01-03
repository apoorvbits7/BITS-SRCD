import React from 'react';
import './Query.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { connect } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';

class Query extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUpload: {},
            viewMore: false,
            columnDefs: [{
                headerName: "PI", field: "author", sortable: true, filter: true
            }, {
                headerName: "Department", field: "department", sortable: true, filter: true
            }, {
                headerName: "Title", field: "title", sortable: true, filter: true
            }, {
                headerName: "Proposal", field: "proposal",
                cellRenderer: function (params) {
                    return `<a href="${params.value}" target="_blank">` + 'link' + `</a>`
                }
            }, {
                headerName: "Status", field: "status", sortable: true, filter: true,
                cellRenderer: function (params) {
                    var eDiv = document.createElement('div');
                    eDiv.innerHTML = `<a href="#">` + params.value + `</a>`;
                    eDiv.addEventListener('click', function () {
                        Swal.fire({
                            title: 'Change Status',
                            text: 'Would you like to change the status to ' + (params.value == 'Waiting' ? 'Processed' : 'Waiting'),
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#999',
                            confirmButtonText: 'Change Status!',
                            preConfirm: () => {
                                if (params.value == 'Waiting') {
                                    // this.changeStatus(params.data.original._id, '✅Processed');
                                    return axios.patch('http://172.24.16.87.xip.io:3100/admin/mark/' + params.data.original._id).
                                        then(result => {
                                            return result.data;
                                        }).catch(error => {
                                            Swal.showValidationMessage(
                                                `Request failed: ${error}`
                                            )
                                        });
                                } else {
                                    // this.changeStatus(params.data.original._id, 'Waiting');
                                    return axios.patch('http://172.24.16.87.xip.io:3100/admin/unmark/' + params.data.original._id).
                                        then(result => {
                                            return result.data;
                                        }).catch(error => {
                                            Swal.showValidationMessage(
                                                `Request failed: ${error}`
                                            )
                                        });
                                }

                            },
                            allowOutsideClick: () => !Swal.isLoading()
                        }).then((result) => {
                            if (!result.isDismissed) {
                                Swal.fire(
                                    'Status Changed!',
                                    'Reload to see result',
                                    'success'
                                )
                            }
                        })
                    })
                    return eDiv;
                }
            },
            {
                headerName: "Reply", field: "reply",
                cellRenderer: function (params) {
                    var eDiv = document.createElement('div');
                    eDiv.innerHTML = `<a href="#">` + 'Send Email' + `</a>`;
                    eDiv.addEventListener('click', function () {
                        Swal.fire({
                            title: 'Enter the message you wish to send!',
                            input: 'textarea',
                            inputAttributes: {
                                autocapitalize: 'off'
                            },
                            showCancelButton: true,
                            confirmButtonText: 'Send',
                            showLoaderOnConfirm: true,
                            preConfirm: (text) => {
                                return axios.patch('http://172.24.16.87.xip.io:3100/admin/comment/' + params.value, {
                                    comment: text
                                }).then(result => {
                                    return result.data;
                                }).catch(error => {
                                    Swal.showValidationMessage(
                                        `Request failed: ${error}`
                                    )
                                })
                            },
                            allowOutsideClick: () => !Swal.isLoading()
                        }).then((result) => {
                            if (!result.isDismissed) {
                                Swal.fire(
                                    'Message Sent!',
                                    'Your message has been sent!',
                                    'success'
                                )
                            }
                        })
                    })
                    return eDiv;
                }
            }, {
                headerName: "View More", field: "viewMore",
                cellRenderer: (params) => {
                    var eDiv = document.createElement('div');
                    eDiv.innerHTML = `<a href="#">` + 'View More' + `</a>`;
                    eDiv.addEventListener('click', () => { this.handleViewMore(params) })
                    return eDiv;
                }
            }],
            rowData: []
        }
    }

    changeStatus = (id, status) => {
        this.state.rowData.map((row, index) => {
            if (row.original._id == id) {
                this.state.rowData[index] = {
                    ...this.state.rowData[index],
                    status: status
                }
            }
        })
    }

    handleViewMore = (params) => {
        console.log(params);
        this.setState({
            viewMore: true,
            selectedUpload: params.data
        })
    }

    async componentDidMount() {
        let allUploads = await axios.get('http://172.24.16.87.xip.io:3100/admin/all');
        let counter = 0
        let allUploadsProcessed = allUploads.data.map((upload) => {
            counter += 1
            return {
                sno: counter,
                title: upload.title,
                status: upload.status == true ? '✅Processed' : 'Waiting',
                author: upload.prinInvest,
                proposal: 'http://172.24.16.87.xip.io:3100/sub/' + upload._id + '/0',
                commentsOne: 'http://172.24.16.87.xip.io:3100/sub/' + upload._id + '/1',
                commentsTwo: 'http://172.24.16.87.xip.io:3100/sub/' + upload._id + '/2',
                endorsments: 'http://172.24.16.87.xip.io:3100/sub/' + upload._id + '/3',
                date: new Date(upload.lastDate).toLocaleDateString(),
                reply: upload._id,
                department: upload.department,
                designation: upload.designation,
                funding: upload.funding,
                institute: upload.institute,
                original: upload,
                coInvest: upload.coInvest,
                experiencedFaculty: upload.experiencedFaculty
            }
        })
        this.setState({
            rowData: allUploadsProcessed
        })
        this.refs.agGrid.api.sizeColumnsToFit()
    }
    rowClickHandle = (e) => {
        // Swal.fire({
        //     title: '<strong>HTML <u>example</u></strong>',
        //     icon: 'info',
        //     html:
        //         'The entire object' +
        //         `<div><pre>${JSON.stringify(e.data.original, null, 2)}</pre></div>`,
        //     showCloseButton: true
        // })
    }
    handleViewMoreClose = () => {
        this.setState({
            viewMore: false
        })
    }
    render() {
        return (
            <div
                className="ag-theme-alpine"
                style={{
                    height: '90%'
                }}
            >
                <div className="blackOverlayAdmin" style={{ display: this.state.viewMore ? 'block' : 'none' }}></div>
                <div className="adminViewMore" style={{ display: this.state.viewMore ? 'block' : 'none' }}>
                    <i onClick={this.handleViewMoreClose} className=" closeButton fa fa-times" aria-hidden="true"></i>
                    <span><b>Title: </b>{this.state.selectedUpload.title}</span><br></br>
                    <span><b>Status: </b>{this.state.selectedUpload.status}</span><br></br>
                    <span><b>Author: </b>{this.state.selectedUpload.author}</span><br></br>
                    <span><b>Experienced Faculty: </b>{this.state.selectedUpload.experiencedFaculty ? 'YES (no comments needed)' : 'NO'}</span><br></br>
                    <span><b>Proposal: </b><a href={this.state.selectedUpload.proposal} target="_blank">link</a></span><br></br>
                    {!this.state.selectedUpload.experiencedFaculty && <><span><b>Comments One: </b><a href={this.state.selectedUpload.commentsOne} target="_blank">link</a></span><br></br></>}
                    {!this.state.selectedUpload.experiencedFaculty && <><span><b>Comments Two: </b><a href={this.state.selectedUpload.commentsTwo} target="_blank">link</a></span><br></br></>}
                    <span><b>Endorsements: </b><a href={this.state.selectedUpload.endorsments} target="_blank">link</a></span><br></br>
                    <span><b>Date: </b>{this.state.selectedUpload.date}</span><br></br>
                    <span><b>Department: </b>{this.state.selectedUpload.department}</span><br></br>
                    <span><b>Designation: </b>{this.state.selectedUpload.designation}</span><br></br>
                    <span><b>Funding: </b>{this.state.selectedUpload.funding}</span><br></br>
                    <span><b>Institute: </b>{this.state.selectedUpload.institute}</span><br></br>
                    <br></br>
                    <span><b>Co Investors: </b></span><br></br>
                    {this.state.viewMore && this.state.selectedUpload.coInvest.map((row, index) => {
                        if (!row) return;
                        row = JSON.parse(row);
                        return (
                            <div>
                                <b>{index + 1 + '.'}</b><br></br>
                                <span><b>Name: </b>{row.name}</span><br></br>
                                <span><b>Designation: </b>{row.designation}</span><br></br>
                                <span><b>Department: </b>{row.department}</span><br></br>
                                <span><b>Institute: </b>{row.institute}</span><br></br>
                                <br></br>
                            </div>


                        );
                    })}
                </div>
                <AgGridReact
                    ref="agGrid"
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    suppressHorizontalScroll={false}
                    onRowClicked={this.rowClickHandle}>
                </AgGridReact>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userID: state.userID
    }
}

export default connect(mapStateToProps)(Query);