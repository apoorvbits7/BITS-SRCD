const express = require("express")
const router = new express.Router();

const Admin=require('../models/admin')
const Sub=require('../models/submissions')


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

        res.status(200).send()
    } catch(e) {
        res.status(400).send()
    }
})

router.patch('/admin/comment/:id', async(req,res) => {
    try {
        const sub= await Sub.findByIdAndUpdate(req.params.id, {comment: req.body.comment}, {new: true})

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