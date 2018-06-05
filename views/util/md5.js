const crypto = require('crypto');
module.exports=function(password){
    let md5=crypto.createHash('md5');
    let password=md5.update(password).digest('base64');
    return password;
}