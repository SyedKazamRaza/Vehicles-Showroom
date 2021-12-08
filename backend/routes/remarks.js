const router = require('express').Router();
const _ = require('lodash');
const { Remarks } = require('../models/customerRemarks');

router.post('/addremarks',async (req, res) => {
    try{
    let newRemark = new Remarks(_.pick(req.body, ['title','description','date']))
    const remarks = await newRemark.save();

    return res.status(200).send('Remarks Added');
    }
    catch(err){
        res.send(err)
    }
})

router.get('/allRemarks',async (req,res)=>{
   try{
    const allRemarks = await Remarks.find();
    res.json(allRemarks)
   }
   catch(err){
       res.status(201).send('Error in getting the Remarks..')
   }
})

module.exports.remarksRouter = router;