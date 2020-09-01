const express = require("express")
const router = new express.Router();
const multer = require('multer')

const Sub=require('../models/submissions')
const User=require('../models/user')

const pdfSub = multer()

let upload=pdfSub.fields([{name:'projProp'}, {name:'endoCert'}, {name:'revComments'}])

router.post('/sub/submit', upload, async (req, res) => {
    try {
        // let bufferArray= []
        // req.files.forEach(element => {
        //     bufferArray.push(element.buffer)
        // });
        // const sub=new Sub({title:req.body.title, docs:bufferArray, count:bufferArray.length})
        // await sub.save()
        // response = {
        //     id: sub.id,
        //     count: sub.count,
        //     title: sub.title
        // }

        const tempObj= { ...req.body}

        const email=tempObj.email

        delete tempObj.email

        const user= await User.findOne({email: req.body.email})

        if (!user){
            return res.status(404).send("NO such user");
        }

        tempObj.owner=user.id

        const subObj = {
            ...tempObj,
            projProp: req.files['projProp'][0].buffer,
            revComments: req.files['revComments'][0].buffer,
            endoCert: req.files['endoCert'][0].buffer
        }

        const sub=new Sub(subObj);
        await sub.save()

        res.status(200).send({id: sub.id});

    } catch (e) {
        res.status(500).send();
    }
})

router.get('/sub/:id/:num',async(req, res)=> {
    try {
        const sub=await Sub.findById(req.params.id)
        // console.log(sub)
        if (!sub){
            return res.status(404).send();
        }

        // console.log(sub)


        res.set('Content-Type','application/pdf')
        if (req.params.num==0){
            res.send(sub.projProp)
        }
        else if (req.params.num==1){
            res.send(sub.revComments)
        }
        else if (req.params.num==2){
            res.send(sub.endoCert)
        }
        else {
            res.status(404).send()
        }
        // res.send(sub.docs[req.params.num])
    } catch (e) {
        res.status(500).send()
    }
 })


module.exports=router;