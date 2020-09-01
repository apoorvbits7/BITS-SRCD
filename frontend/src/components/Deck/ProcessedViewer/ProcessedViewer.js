import React from 'react';
import { connect } from 'react-redux';
import './ProcessedViewer.css';
import PDFViewer from './PDFViewer/PDFViewer';
import x from './Sample1.pdf'

class ProcessedViewer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="overlay"></div>
                <div className="ProcessedViewer">
                    <div className="preview" style={{ backgroundImage: `url(${this.props.preview.url})` }}>
                        <PDFViewer url={this.props.preview.url} />
                    </div>
                    <div className="fa-stack fa-4x crossButton" onClick={this.props.closePreview}>
                        <i class="fa fa-circle fa-stack-2x icon-background"></i>
                        <i class="fa fa-times fa-stack-1x" style={{ color: 'white' }}></i>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        preview: state.preview
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closePreview: () => {
            dispatch({
                type: 'CLOSE_PREVIEW'
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessedViewer);