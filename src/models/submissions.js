const mongoose=require("mongoose")

const subSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    // docs: {
    //     type: [Buffer],
    //     required: true
    // },
    projProp: {
        type: Buffer,
        required: true
    },
    designation: {
        type: String
    },
    department: {
        type: String
    },
    institute: {
        type: String
    },
    reviewerOneName: {
        type: String
    },
    reviewerTwoName: {
        type: String
    },
    revCommentsOne: {
        type: Buffer,
        required: true
    },
    revCommentsTwo: {
        type: Buffer,
        required: true
    },
    endoCert: {
        type: Buffer,
        required: true
    },
    funding: {
        type: String,
        required: true
    },
    prinInvest: {
        type: String,
        required: true
    },
    coInvest: {
        type: [String]
    },
    // count: {
    //     type: Number,
    //     required: true
    // },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    status: {
        type: Boolean,
        default: 0
    },
    comment: {
        type: String
    },
    // lastDate: {
    //     type: Date
    // }

})

subSchema.methods.toJSON = function () {
    const sub=this
    const subObj=sub.toObject()
    delete subObj.projProp
    delete subObj.revCommentsOne
    delete subObj.revCommentsTwo
    delete subObj.endoCert

    return subObj
}

const Sub = mongoose.model('Sub', subSchema)

module.exports = Sub