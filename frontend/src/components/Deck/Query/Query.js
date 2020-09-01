import React from 'react';
import './Query.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { connect } from 'react-redux';
import axios from 'axios';

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
                headerName: "Comments", field: "comments",
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
            }],
            rowData: []
        }
    }
    async componentDidMount() {
        // let allUploads = await axios.post('http://localhost:8000/api/getAllUploads', {
        //     userID: this.props.userID
        // });
        // let allUploadsProcessed = allUploads.data.map((upload) => {
        //     upload.createdAt = new Date(upload.createdAt).toLocaleDateString();
        //     return upload;
        // })
        let allUploadsProcessed = [
            {
                author: 'X',
                proposal: 'www.google.com',
                comments: 'www.google.com',
                endorsments: 'www.google.com',
                status: 'Pending'
            },
            {
                author: 'Y',
                proposal: 'www.google.com',
                comments: 'www.google.com',
                endorsments: 'www.google.com',
                status: 'Pending'
            },
            {
                author: 'Y',
                proposal: 'www.google.com',
                comments: 'www.google.com',
                endorsments: 'www.google.com',
                status: 'Pending'
            },
            {
                author: 'X',
                proposal: 'www.google.com',
                comments: 'www.google.com',
                endorsments: 'www.google.com',
                status: 'Pending'
            },
        ]
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