const express = require("express");
const path = require("path");
require("dotenv").config();

//app de express
const app = express();

//node server
const server = require('http').createServer(app);

//socket.io server
module.exports.io = require('socket.io')(server);
require('./sockets/socket');




const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

server.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server is running on port 3000");
});
