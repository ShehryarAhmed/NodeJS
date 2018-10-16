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
const appStartUpDebuger = require('debug')('app:StartUp');
const dbDebuger = require('debug')('app:db');

const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const Logger = require('./logger');
const express = require('express');
const config = require('config');

const courses = require('./router/courses')

const app = express();

app.set('view engine','pug')
app.set('views','./views')


app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses',courses)
// app.use(morgan('tiny'));

//for configuration
console.log('Application Name '+config.get('name'))
console.log('Mail server Name '+config.get('mail.host'))
// console.log('Mail server Password '+config.get('mail.password'))
// console.log('Application Name '+config.get('name'))




if(app.get('env') === 'development'){
    app.use(morgan('tiny'))
    appStartUpDebuger('Morgan enabled...')
}

//ForDebuger
    dbDebuger('Connected Database...')
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


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))