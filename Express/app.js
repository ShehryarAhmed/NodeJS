// const http = require('http');

// const server = http.createServer((req, res)=>{
//     if(req.url === '/'){
//         res.write('Hello World');
//         res.end();
//         console.log("hello")
//     }
//     if(req.url === '/api/cursese'){
//         res.write(JSON.stringify([1,2,3]));
//         res.end();
//         console.log("hello world")
//     }
//     server.listen(3000)
// })

const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses =[
    {id:1,name:'Course1'},
    {id:2,name:'Course2'},
    {id:3,name:'Course3'}
]
app.get('/',(req,res) => {
    res.send('Hello World!!!')
})

app.get('/api/courses',(req,res) => {
    res.send(courses)
})


app.get('/api/courses/:id',(req,res) => {
    var course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send(`The Courses with the given ID ${req.params.id} was not found`)
    }else{
        res.send(course)
    }

    res.send(req.query)
})

app.post('/api/courses',(req, res) =>{

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


app.put('/api/courses/:id',(req, res) =>{
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


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))