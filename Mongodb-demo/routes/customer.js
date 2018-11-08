const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express'); 
const router = express.Router();



const customerSchema = new mongoose.Schema({
    // name: String ,
    name: {
        type: String,
        required:true,
        minlength:5,
        maxlength:50
    },
    isGold : {
        type: Boolean,
        default: false
    },
    phone : {
        type : String,
        required: true
    }
});

const Customer =  mongoose.model('Customer',customerSchema);

router.get('/', async (req, res) => {
    const customer = await Customer.find().sort('name');
    res.send(customer)
})


router.post('/', async (req, res) => {
    let customer = new Customer({
        name : req.body.name,
        phone : req.body.phone,
        isGold : req.body.isGold
    });
    customer = await customer.save();
    res.send(customer)
})


router.put('/:id', async (req, res) => {
    const {error}  = ValidateCustomer(req.body);
    console.log("hello",error)
    if(error) return res.status(400).send(error.details[0].message);
    
    const customer = await Customer.findByIdAndUpdate( req.params.id, 
        {
            name: req.body.name,
            phone : req.body.phone,
            isGolde  : req.body.isGolde
        }, 
        { new: true});

    if(!customer) return res.status(404).send('The genre with the given ID was not found')
    
    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if(!customer) return res.status(404).send('The genre with the given ID was not found')

    res.send(customer);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send(`The genre with the given ID ${req.params.id} is not found`)
    
    res.send(customer);
})

function ValidateCustomer(genre){
    const Schema = {
        //minimum to five character and maximum to fifty character
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGolde : Joi.boolean()
    };
    return Joi.validate(genre,Schema)
}

module.exports = router;

