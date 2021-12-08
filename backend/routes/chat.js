const router = require('express').Router();
const _ = require('lodash');
const { Chat } = require('../models/chatpanel');

router.get('/',(req,res)=>{
    res.send('I am chat');
})

router.post('/addMessage',async (req, res) => {
    try{
        const name = req.body.firstPerson + "_" + req.body.secondPerson;
        const personNo = req.body.personNo;
        const msg = req.body.message;

        const obj = {
            persons: name,
            message: [{
                personNo: personNo,
                text: msg,
                time: new Date()
            }]
        }

        const chatexist = await Chat.find({persons: name});
        if(chatexist.length > 0){
            const newMessage = {
                personNo: personNo,
                text: msg,
                time: new Date()
            }
            const result = await Chat.updateOne(
                { persons: name },
                { $push: { message: newMessage } }
             )
            
              return res.status(200).send('Add to Existing Chat.')  
        }
 
        let newChat = new Chat(obj)
        const chat = await newChat.save();
        return res.status(200).send('Add to New Chat.')  
    }
    catch(err){
        return res.status(201).send('Chat not added.')  
    }
})


router.get('/allChat',async (req,res)=>{
   try{
    const allChat = await Chat.find({persons: "Ali_hasan"});
    res.status(200).json(allChat[0].message)
   }
   catch(err){
       res.status(201).send('Error in getting the Chat..')
   }
})

module.exports.chatRouter = router;