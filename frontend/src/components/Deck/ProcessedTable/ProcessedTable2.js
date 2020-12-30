import React from 'react';
// import './Query.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { connect } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import InfoText from '../InfoText/InfoText'

class ProcessedTable2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [{
                headerName: "S. No", field: "sno", sortable: true, filter: true
            }, {
                headerName: "Title", field: "title", sortable: true, filter: true
            }, {
                headerName: "Status", field: "status", sortable: true, filter: true
            }, {
                headerName: "Proposal", field: "url",
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
                headerName: "Date", field: "lastDate", sortable: true, filter: true
            }],
            rowData: []
        }
    }

    componentDidMount() {
        this.refs.agGrid.api.sizeColumnsToFit()
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <InfoText category="dashboard" />
                <div
                    className="ag-theme-alpine"
                    style={{
                        height: '50%'
                    }}
                >
                    <AgGridReact
                        ref="agGrid"
                        columnDefs={this.state.columnDefs}
                        rowData={this.props.files}
                        suppressHorizontalScroll={false}
                        onRowClicked={this.rowClickHandle}>
                    </AgGridReact>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        userID: state.userID,
        files: state.uploadedFiles,
        length: state.uploadedFiles.length
    }
}

export default connect(mapStateToProps)(ProcessedTable2);