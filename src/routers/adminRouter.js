const express = require("express")
const router = new express.Router()
const sgMail=require('@sendgrid/mail')

const Admin=require('../models/admin')
const Sub=require('../models/submissions')
const User=require('../models/user')

sgMail.setApiKey(process.env.SG_KEY)


router.post('/admin/new', async (req, res) => {
    const admin = new Admin(req.body);
    
    try {
        await admin.save()
        res.status(201).send();
    } catch (e) {
        res.status(400).send();
    }
})

router.patch('/admin/mark/:id', async (req,res) => {
    try {
        const sub= await Sub.findByIdAndUpdate(req.params.id, {status: true}, {new: true})

        const currUser= await User.findById(sub.owner)
        const currEmail=currUser.email;

        const msg= {
            to: currEmail,
            from: 'bitssrcd@gmail.com',
            subject: 'Test1',
            text: 'Submission approved'
        }

        console.log(currEmail)

        sgMail.send(msg);

        res.status(200).send()
    } catch(e) {
        res.status(400).send()
    }
})

router.patch('/admin/comment/:id', async(req,res) => {
    try {
        const sub= await Sub.findByIdAndUpdate(req.params.id, {comment: req.body.comment}, {new: true})

        const currUser= await User.findById(sub.owner)
        const currEmail=currUser.email;

        const msg= {
            to: currEmail,
            from: 'bitssrcd@gmail.com',
            subject: 'Test2',
            text: 'Comment added :- '+req.body.comment
        }

        sgMail.send(msg);


        res.status(200).send()
    } catch(e) {
        res.status(400).send()
    }
})

router.get('/admin/all', async (req, res)=> {
    try {
        const subs =await Sub.find({})
        res.send(subs)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports=router;