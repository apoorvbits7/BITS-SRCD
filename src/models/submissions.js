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
    revComments: {
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
    }

})

subSchema.methods.toJSON = function () {
    const sub=this
    const subObj=sub.toObject()
    delete subObj.projProp
    delete subObj.revComments
    delete subObj.endoCert

    return subObj
}

const Sub = mongoose.model('Sub', subSchema)

module.exports = Sub