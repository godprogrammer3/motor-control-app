const express = require("express");
const app = express();

const mariadb = require("mariadb");
const http = require('http').createServer(app);
const io = require('socket.io')(http);
require('./src/Event').socket(io)
const event = require('./src/Event').em;
var dotenv = require("dotenv");
var cors = require("cors");
var bodyParser = require("body-parser");
dotenv.config();
var pool = mariadb.createPool({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "MotorControl",
  connectionLimit: 50,
});

var Routes = require('./src/routes')

app.use(cors());
app.use(bodyParser.json());

app.use('/',Routes);

event.emit('resetIO')


// app.listen("3000", () => {
//   console.log("Server started on port 3000");
// });
http.listen(3000, () => {
  console.log('listening on *:3000');
});
