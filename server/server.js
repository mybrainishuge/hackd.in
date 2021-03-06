const express = require('express');
const session = require('express-session');
// const bcrypt = require('bcrypt-nodejs');

const server = express();
var port = process.env.PORT || 3000;

server.set('view engine', 'ejs');

server.use(express.static(__dirname + '../client'));

server.use(session({
  secret: 'this is not a secret',
  cookie: { maxAge: 60000 }
}));

server.listen(port);
module.exports = server;
