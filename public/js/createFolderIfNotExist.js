var fs = require('fs');
var dir = './vendor';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}