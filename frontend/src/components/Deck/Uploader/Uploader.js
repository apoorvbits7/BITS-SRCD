import React from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import './Uploader.css';
import { connect } from 'react-redux';
import axios from 'axios';

class Uploader extends React.Component {
    getUploadParams = () => {
        return { url: 'https://httpbin.org/post' }
    }

    handleChangeStatus = (f, status) => {
        console.log(status, f, f.meta)
        if (status == 'done') {
            this.props.uploadFile(this.props.fileType, { ...f })
        } else if (status == "removed") {
            this.props.deleteFile(this.props.fileType, { ...f })
        }
    }

    submitFile = async (files) => {
        const filesData = new FormData();
        filesData.append('title', this.props.formDetails.paperTitle);
        files.map((file) => {
            filesData.append('docs', file);
        })
        let result = await axios({
            method: "POST",
            url: "http://172.24.16.87.xip.io:5000/submit",
            data: filesData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(result.data);
        return result.data;
    }

    handleSubmit = async (files, allFiles) => {
        console.log(files.map(f => f.meta.name));
        let newFiles = files.map((file) => {
            return file.file;
        })
        let result = await this.submitFile(newFiles);
        let url = 'http://172.24.16.87.xip.io:5000/check/' + result.id + '/0';
        this.props.addFiles(url);
        allFiles.forEach(f => f.remove());
    }

    render() {
        return (
            <Dropzone
                onChangeStatus={this.handleChangeStatus}
                styles={{
                    dropzone: {
                        width: '70%',
                        height: '95%',
                        borderRadius: '2%',
                        // overflow: 'hidden',
                        backgroundColor: 'white',
                        borderRadius: '2%',
                        margin: 0,
                        marginTop: '2%',
                    },
                    submitButton: {
                        display: 'none'
                    }
                }}
                inputContent="Upload or Drag Documents"
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        formDetails: state.formDetails
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
        uploadFile: (fileType, file) => {
            dispatch({
                type: 'UPLOAD_FILE',
                fileType: fileType,
                file: file
            })
        },
        deleteFile: (fileType, file) => {
            dispatch({
                type: 'DELETE_FILE',
                fileType: fileType,
                file: file
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);