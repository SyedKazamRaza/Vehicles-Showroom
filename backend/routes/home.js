const router = require('express').Router();
const _ = require('lodash');
const sessions = require('express-session');

const { Users } = require('../models/userModel');
const { userDetails } = require('../models/userdetailsModel');


var session;
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
router.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",     
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));



router.post('/signup',async (req, res) => {
    const exist = await Users.find({email: req.body.email});

    if(exist.length > 0){
        return res.status(201).send('Email Already Exist. It must be unique.')   //sending 201 just for differentitation
    }

    let newUserdetails = new userDetails(_.pick(req.body, ['name','address','phone']))
    const userdetails = await newUserdetails.save();

    let newUser = new Users(_.pick(req.body, ["email","password"]));
    newUser.details = userdetails._id;
    newUser.userType = "customer";

    const user = await newUser.save();
    return res.status(200).send('Record inserted');
})

router.post('/login',async (req,res)=>{
    const userExist = await Users.find( {$and: [{email : req.body.email},{password : req.body.password} ,{userType : req.body.type}] } )
    if(userExist.length > 0){
        session=req.session;
        session.email=req.body.email;
        // console.log(req.session)
        console.log(session.email)

        return res.status(200).send('valid User');
    }
    else{
        if(req.body.type === 'customer'){
            return res.status(201).send('Invalid Email or password.');
        }
        return res.status(201).send('Invalid Username or passowrd. ');
    }
})

router.get('/getUserData',async (req,res)=>{
    var SessionEmail = ''
    if(!session){
        SessionEmail = "syedkazamraza20@gmail.com";
    }
    else{
        SessionEmail = session.email;
    }
    const user = await Users.find({email : SessionEmail});
    const userDetail = await userDetails.find({_id: user[0].details})
    const userInfo = _.pick(userDetail[0], ['name','address','phone'])
    userInfo["password"] = user[0].password;
    res.json(userInfo);
})


router.post('/updateUserProfile',async (req, res) => {
  try{
    // console.log('update profile called..')
    // console.log(session.email);
    const user = await Users.findOne({email: session.email});

    user.set({
		password: req.body.password
	})
    user.save()

    const updateDetails = await userDetails.updateOne({_id: user.details}, {
        $set: {
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
        }
    })

    return res.status(200).send('Record Updated');
  }
  catch(error){
    return res.status(201).send('Not Updated');
  }
})




module.exports.homeRouter = router;