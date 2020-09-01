import { produce, original } from "immer";
import { act } from "react-dom/test-utils";

const initState = {
    userName: 'Apoorv Sadana',
    userEmail: 'apoorvsadana@gmail.com',
    uploaderOpen: false,
    invoicesProcessed: 0,
    userID: '0fcc0cae-1870-4307-b949-7ed90788b878',
    files: [
        {
            sno: 1,
            title: 'XYZ',
            status: '✅Processed',
            date: new Date().toLocaleDateString()
        },
        {
            sno: 2,
            title: 'ABC',
            status: 'Waiting',
            date: new Date().toLocaleDateString()
        },
        {
            sno: 3,
            title: 'ABC',
            status: 'Waiting',
            date: new Date().toLocaleDateString()
        },
        {
            sno: 4,
            title: 'ABC',
            status: 'Waiting',
            date: new Date().toLocaleDateString()
        },
        {
            sno: 5,
            title: 'ABC',
            status: 'Waiting',
            date: new Date().toLocaleDateString()
        },
    ],
    preview: {
        url: null,
        show: false
    },
    support: [],
    supportDisplay: {
        display: false,
        url: null
    },
    formDetails: {
        fullName: '',
        email: '',
        phoneNumber: '',
        paperTitle: '',
        filePipeline: {
            proposal: [],
            comments: [],
            edorsements: []
        },
        paperAuthors: ''
    },
    uploadedFiles: [
    ],
    fundingCall: {
        options: ["Option 1", "Option 2", "Option 3"],
        selected: ""
    },
    coInvestigators: [{
        name: '',
        affliation: ''
    }]
}

var files;
var newFiles;
var currCo;
var currArr;

const rootReducer = produce((draft, action) => {
    switch (action.type) {
        case "TOGGLE_UPLOADER":
            draft.uploaderOpen = action.toggle;
            break;
        case "ADD_FILE":
            files = original(draft).files;
            console.log(files);
            newFiles = [{
                id: action.fileID,
                filename: action.file.meta.name,
                status: false,
                fraud: '-',
                date: new Date().toLocaleDateString(),
                download: null
            }, ...files];
            draft.files = newFiles;
            break;
        case "UPDATE_FILE":
            let fileID = action.fileData.fileID;
            let fraud = action.fileData.fraud;
            let url = action.fileData.link;
            let processedDetails = action.fileData.processedDetails;
            files = original(draft).files;
            files.map((file, index) => {
                if (file.id == fileID) {
                    draft.files[index].fraud = fraud;
                    draft.files[index].download = url;
                    draft.files[index].status = true;
                    draft.files[index].processedDetails = processedDetails;
                }
            });
            draft.invoicesProcessed = original(draft).invoicesProcessed + 1;
            break;
        case "SHOW_PREVIEW":
            console.log(action.url)
            draft.preview.show = true;
            draft.preview.url = action.url;
            break;
        case "CLOSE_PREVIEW":
            draft.preview.show = false;
            draft.preview.url = null;
            break;
        case "SET_SUPPORT":
            draft.support = action.supportArray;
            break;
        case "DISPLAY_INVOICE":
            draft.support = action.supportArray;
            break;
        case "DISPLAY_SUPPORT":
            draft.supportDisplay = {
                display: true,
                url: action.url
            }
            break;
        case "HIDE_SUPPORT":
            draft.supportDisplay = {
                display: false,
                url: null
            }
            break;
        case "FORM_DETAILS_CHANGE":
            if (action.fullName) {
                draft.formDetails.fullName = action.fullName;
            }
            if (action.email) {
                draft.formDetails.email = action.email;
            }
            if (action.phoneNumber) {
                draft.formDetails.phoneNumber = action.phoneNumber;
            }
            if (action.paperTitle) {
                draft.formDetails.paperTitle = action.paperTitle;
            }
            if (action.paperAuthors) {
                draft.formDetails.paperAuthors = action.paperAuthors;
            }
            break;
        case "ADD_FILES":
            let arr = draft.uploadedFiles;
            arr.push({
                sno: arr.length + 1,
                title: original(draft).formDetails.paperTitle,
                status: 'Waiting',
                url: action.url,
                date: new Date().toLocaleDateString()
            })
        case "SELECT_FUNDING_CALL":
            draft.fundingCall.selected = original(draft).fundingCall.options[action.selectedIndex]
            break
        case "CO_INVEST_NAME_CHANGE":
            draft.coInvestigators[action.index].name = action.name
            break
        case "CO_INVEST_AFFLIATION_CHANGE":
            draft.coInvestigators[action.index].affliation = action.affliation
            break
        case "ADD_CO_INVEST":
            currCo = original(draft).coInvestigators.slice();
            console.log(currCo);
            currCo.splice(action.index + 1, 0, {
                name: '',
                affliation: ''
            })
            draft.coInvestigators = currCo;
            break
        case "DELETE_CO_INVEST":
            if (currCo.length == 1) {
                draft.coInvestigators = [{
                    name: '',
                    affliation: ''
                }];
            } else {
                currCo = original(draft).coInvestigators.slice();
                currCo.splice(action.index, 1)
                draft.coInvestigators = currCo;
            }
            break
        case "UPLOAD_FILE":
            currArr = original(draft).formDetails.filePipeline[action.fileType].slice()
            currArr.push(action.file)
            draft.formDetails.filePipeline[action.fileType] = currArr
            break;
        case "DELETE_FILE":
            currArr = original(draft).formDetails.filePipeline[action.fileType].slice()
            currArr = currArr.filter((file) => {
                if (file.meta.name != action.file.meta.name) {
                    return true;
                } else {
                    return false;
                }
            })
            draft.formDetails.filePipeline[action.fileType] = currArr
            break;

    }
}, initState);


export default rootReducer;