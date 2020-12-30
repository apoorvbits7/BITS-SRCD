import React from 'react';
import './Deck.css';
import Uploader from './Uploader/Uploader';
import ProcessedTable from './ProcessedTable/ProcessedTable';
import ProcessedTable2 from './ProcessedTable/ProcessedTable2';
import ProcessedViewer from './ProcessedViewer/ProcessedViewer';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Query from './Query/Query';
import BasicDetails from './FormSubmit/BasicDetails';
import PaperDetails from './FormSubmit/PaperDetails';
import Uploads from './FormSubmit/Uploads';
import Chatbot from './Chatbot/ChatbotTable';
import InvoiceViewer from './Chatbot/InvoiceViewer/InvoiceViewer';
import axios from 'axios';


class Deck extends React.Component {
    render() {
        return (
            <div className="Deck">
                <Switch>
                    <Route exact path="/deck">
                        <div className="headerRow">
                            {/* <InvoicesProcessedCard />
                            <UploadCard />
                            <DownloadCard /> */}
                        </div>
                        {this.props.uploaderOpen == true && <Uploader />}
                        {this.props.previewShow == true && <ProcessedViewer />}
                        {/* <ProcessedViewer /> */}
                        {/* <ProcessedTable /> */}
                        <ProcessedTable2 />
                    </Route>
                    <Route path="/deck/admin">
                        <Query />
                    </Route>
                    <Route path="/deck/form/paper-details">
                        <PaperDetails />
                    </Route>
                    <Route path="/deck/form/uploads">
                        <Uploads />
                    </Route>
                    <Route path="/deck/form">
                        <BasicDetails />
                    </Route>
                    <Route path="/deck/chatbot">
                        <Chatbot />
                        {this.props.supportDisplay.display == true && <InvoiceViewer />}
                    </Route>
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        uploaderOpen: state.uploaderOpen,
        previewShow: state.preview.show,
        supportDisplay: state.supportDisplay,
        admin: state.admin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        adminInit: (files) => {
            dispatch({
                type: 'ADMIN_INIT',
                files: files
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck);