const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    // name: String ,
    name: {
        type: String,
        required:true,
        minlength:5,
        maxlength:55,

    }
});

const Genre =  mongoose.model('Genre',genreSchema);

function ValidateGenre(genre){
    const Schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre,Schema)

    
}

exports.Genres = Genre;
exports.validate = ValidateGenre;