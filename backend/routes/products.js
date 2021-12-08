const router = require('express').Router();
const _ = require('lodash');
const { Products } = require('../models/productsModel');

router.get('/',(req,res)=>{
    res.send('I am products');
})

router.post('/addnew',async (req, res) => {
    try{
        const exist = await Products.find({name: req.body.name});
    if(exist.length > 0){
        return res.status(201).send('Vehicle with same name already Exist.')   //sending 201 just for differentitation
    }
 
    let newProduct = new Products(_.pick(req.body, ['name','company','vehicleNumber','modelYear','price','category']))
    const prod = await newProduct.save();

    return res.status(200).send('Product inserted');
    }
    catch(err){
        res.send(err)
    }
})


router.get('/allVehicles',async (req,res)=>{
   try{
    const prod = await Products.find();
    res.json(prod)
   }
   catch(err){
       res.status(201).send('Error in getting the products..')
   }
})

module.exports.productRouter = router;