
// var log = require('./log');

// log("Bismilah");

// // const path = require('path')
// const os = require('os')
// ac = os.totalmem();
// // console.log(__filename)
// // var pathObj = path.parse(__filename);

// // console.log(pathObj)

// console.log("Total Memory",os.totalmem());
// console.log("free Memory",os.freemem());


// //template String 
// //ES6 / ES2015  : ECMAScript 6
// console.log(`Total Memory : ${ac}`)

//file System

const fs = require('fs');

// const files = fs.readdirSync('./');
// console.log(files);


// fs.readdir('./',function(err, files){
//     if(err) console.log('Error',err );
//     else console.log('Result', files)
// })


//event

const EventEmitter = require('events');
const emitter = new EventEmitter();

//Register a listner
// emitter.on('messageLogged',function(eventArg){
//     console.log('Listner Called ',eventArg);
// });

//using arrow function
emitter.on('logging',(eventArg)=>{
    console.log('Listner Called ',eventArg);
});


const Logs = require('./Log');
const logs = new Logs();

// using arrow function
logs.on('logging',(eventArg)=>{
    console.log('Listner Called ',eventArg);
});

logs.logd('message')




