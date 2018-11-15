const {Genres, validate} = require('../model/genres')

const mongoose = require('mongoose');
const express = require('express'); 
const router = express.Router();



router.get('/', async (req, res) => {
    // const customer = await Customer.find().sort('name');
    
    const genres = await Genres.find().sort('name');
    res.send(genres)
})


router.post('/', async (req, res) => {


    let genre = new Genres({name : req.body.name});
    genre = await genre.save();
    res.send(genre)
})


router.put('/:id', async (req, res) => {

    const {error}  = validate(req.body);
    console.log("hello",error)
    if(error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genres.findByIdAndUpdate( req.params.id, {name: req.body.name}, {
        new: true
    });

    if(!genre) return res.status(404).send('The genre with the given ID was not found')
    
    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genres.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send('The genre with the given ID')

    res.send(genre);
});

router.get('/:id', async (req, res) => {
    const genre = await Genres.findById(req.params.id);
    if(!genre) return res.status(404).send(`The genre with the given ID ${req.params.id} is not found`)
    
    res.send(genre);
})



module.exports = router;

