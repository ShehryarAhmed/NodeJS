const Joi = require('joi');
const mongoose = require('mongoose');

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
        required: true,
        minlength:5,
        maxlength:50    
    }
});
const Customer =  mongoose.model('Customer',customerSchema);

function ValidateCustomer(genre){
    const Schema = {
        //minimum to five character and maximum to fifty character
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGolde : Joi.boolean()
    };
    return Joi.validate(genre,Schema)
}

exports.Customer = Customer;
exports.validate = ValidateCustomer;
