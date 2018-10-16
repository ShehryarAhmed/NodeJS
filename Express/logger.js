function  log(req, res, next){
    console.log('Authenticating...')
    next();
}

function Auth(req, res, next){
    console.log(' ...')
    next();
}
module.exports = log;
// module.exports = Auth;
