const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String
    }
})

userSchema.virtual('subs', {
    ref: 'Sub',
    localField: '_id',
    foreignField: 'owner'
})

const User = mongoose.model('User', userSchema)

module.exports = User