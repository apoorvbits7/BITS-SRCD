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
            columnDefs: [{
                headerName: "Principle Invest.", field: "author", sortable: true, filter: true
            }, {
                headerName: "Proposal", field: "proposal",
                cellRenderer: function (params) {
                    return `<a href="${params.value}" target="_blank">` + 'link' + `</a>`
                }
            }, {
                headerName: "Comments 1", field: "commentsOne",
                cellRenderer: function (params) {
                    return `<a href="${params.value}" target="_blank">` + 'link' + `</a>`
                }
            }, {
                headerName: "Comments 2", field: "commentsTwo",
                cellRenderer: function (params) {
                    return `<a href="${params.value}" target="_blank">` + 'link' + `</a>`
                }
            }, {
                headerName: "Endorsements", field: "endorsments",
                cellRenderer: function (params) {
                    return `<a href="${params.value}" target="_blank">` + 'link' + `</a>`
                }
            }, {
                headerName: "Status", field: "status", sortable: true, filter: true
            },
            {
                headerName: "Reply", field: "reply",
                cellRenderer: function (params) {
                    var eDiv = document.createElement('div');
                    eDiv.innerHTML = `<a href="#">` + 'Send Email' + `</a>`;
                    eDiv.addEventListener('click', function () {
                        console.log(params.value)
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
                                return axios.patch('http://localhost:3100/admin/comment/' + params.value, {
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
                            Swal.fire(
                                'Message Sent!',
                                'Your message has been sent!',
                                'success'
                            )
                        })
                    })
                    return eDiv;
                }
            }],
            rowData: []
        }
    }

    async componentDidMount() {
        let allUploads = await axios.get('http://localhost:3100/admin/all');
        let counter = 0
        let allUploadsProcessed = allUploads.data.map((upload) => {
            counter += 1
            return {
                sno: counter,
                title: upload.title,
                status: upload.status == true ? '✅Processed' : 'Waiting',
                author: upload.prinInvest,
                proposal: 'http://localhost:3100/sub/' + upload._id + '/0',
                commentsOne: 'http://localhost:3100/sub/' + upload._id + '/1',
                commentsTwo: 'http://localhost:3100/sub/' + upload._id + '/2',
                endorsments: 'http://localhost:3100/sub/' + upload._id + '/3',
                date: new Date().toLocaleDateString(),
                reply: upload._id
            }
        })
        // let allUploadsProcessed = [
        //     {
        //         author: 'X',
        //         proposal: 'www.google.com',
        //         comments: 'www.google.com',
        //         endorsments: 'www.google.com',
        //         status: 'Pending'
        //     },
        //     {
        //         author: 'Y',
        //         proposal: 'www.google.com',
        //         comments: 'www.google.com',
        //         endorsments: 'www.google.com',
        //         status: 'Pending'
        //     },
        //     {
        //         author: 'Y',
        //         proposal: 'www.google.com',
        //         comments: 'www.google.com',
        //         endorsments: 'www.google.com',
        //         status: 'Pending'
        //     },
        //     {
        //         author: 'X',
        //         proposal: 'www.google.com',
        //         comments: 'www.google.com',
        //         endorsments: 'www.google.com',
        //         status: 'Pending'
        //     },
        // ]
        this.setState({
            rowData: allUploadsProcessed
        })
        this.refs.agGrid.api.sizeColumnsToFit()
    }
    render() {
        return (
            <div
                className="ag-theme-alpine"
                style={{
                    height: '90%',
                    width: '100%'
                }}
            >
                <AgGridReact
                    ref="agGrid"
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}>
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