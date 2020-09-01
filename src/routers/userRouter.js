const express = require("express")
const router = new express.Router();

const User=require('../models/user')

router.post('/user/new', async (req, res)=> {
    const user = new User(req.body);
    
    try {
        await user.save()
        res.status(201).send();
    } catch (e) {
        res.status(400).send();
    }
})

// router.post('/user/login', async (req,res)=> {
//     try {
//         const user= await User.findOne({email: req.body.email})
//         res.status(200).send()
//     }
//     catch (e) {
//         res.status(400).send()
//     }
// })

router.get('/user/me', async (req, res)=> {
    try {
        const user= await User.findOne({email: req.body.email})
        await user.populate('subs').execPopulate()
        res.status(200).send(user.subs)
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router