function  log(req, res, next){
    console.log('Authenticating...')
    // next();
}

function Auth(req, res, next){
    console.log('Logging...')
    next();
}
module.exports = log;
module.exports = Auth;
