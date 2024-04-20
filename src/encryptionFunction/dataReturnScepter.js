var token = require('token');
var randomstring = require("randomstring");
//process.env.token_defaults_secret = randomstring.generate();
token.defaults.secret = process.env.token_defaults_secret;
token.defaults.timeStep = 5 * 60; //5min
var ts = ``;
var t1=JSON.stringify( { id: 1, role: ts, auth: token.generate(`1 | ${ ts } `) });
function isValid(json) {
  return token.verify(json.id+'|'+json.role, json.auth);
}
console.log(t1);
console.log( isValid(JSON.parse( t1)) );