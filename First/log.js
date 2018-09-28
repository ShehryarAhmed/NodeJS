//event

const EventEmitter = require('events');

var url = "http:www.google.com";
// console.log(__filename);
// console.log(__dirname);


class Log extends EventEmitter{
    logd(message){
        console.log(message);
        this.emit('logging',{data:'message'});
    }
}
module.exports = Log;