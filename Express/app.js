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
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const Logger = require('./logger');
const express = require('express');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(express.static('public'));
app.use(helmet());
// app.use(morgan('tiny'));

//for configuration
console.log('Application Name '+config.get('name'))
console.log('Mail server Name '+config.get('mail.host'))
// console.log('Mail server Password '+config.get('mail.password'))

// console.log('Application Name '+config.get('name'))




if(app.get('env') === 'development'){
    app.use(morgan('tiny'))
    console.log('Morgan enabled...')
}

// console.log(`Node Env : ${process.env.NODE_ENV}`);
// console.log(`app get : ${app.get('env')}`);

// //create and write stream file
// var accessLogStream = fs.createWriteStream(
//     path.join(__dirname, 'access.log'), {flags: 'a'}
// );
// // setup the logger 
// app.use(morgan('combined', {stream: accessLogStream}));


app.use(Logger)
// app.use(Logger)

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

app.delete('/api/courses/:id',(req, res) =>{

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))