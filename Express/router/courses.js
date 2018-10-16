const express = require('express');
const router = express.Router();

const courses =[
    {id:1,name:'Course1'},
    {id:2,name:'Course2'},
    {id:3,name:'Course3'}
]

router.get('/',(req,res) => {
    res.send(courses)
})


router.get('/:id',(req,res) => {
    var course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send(`The Courses with the given ID ${req.params.id} was not found`)
    }else{
        res.send(course)
    }

    res.send(req.query)
})

router.post('/',(req, res) =>{

    const schema = {
        name : Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id : courses.length+1,
        name : req.body.name
    };
 
    courses.push(course);
    res.send(course);

});


router.put('/:id',(req, res) =>{
    //lookup the course
    //if not existing return 404
    var course = courses.find(c => c.id === parseInt(req.params.id));
    console.log("test",course)
    if(!course){
        res.status(404).send(`The Courses with the given ID ${req.params.id} was not found`);
        return;
    }

    //validate
    //if validate return 400 - Bad request
    const schema = {
        name : Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //Update course
    course.name = req.body.name
    //Return the updated course
    res.send(course)    
});

router.delete('/:id',(req, res) =>{

     //lookup the course
    //if not existing return 404
    var course = courses.find(c => c.id === parseInt(req.params.id));
    console.log("test",course)
    if(!course){
        res.status(404).send(`The Courses with the given ID ${req.params.id} was not found`);
        return;
    }

    //delete
   const index = courses.indexOf(course);
   courses.splice(index,1);

   //response
    res.send(course)    

})

module.exports = router;