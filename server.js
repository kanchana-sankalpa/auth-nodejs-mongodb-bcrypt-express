/*var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path');
const dotenv = require('dotenv');
// Load env variables
dotenv.config({ path: './config/config.env' });

var numExpectedSources = 2;
var store = new MongoDBStore(
  {
    uri: process.env.MONGO_URI,
    databaseName: 'covid19',
    collection: 'sessions'
  },
  function(error) {
    console.log(error);
    // Should have gotten an error
  });

store.on('error', function(error) {
  console.log(error);
  // Also get an error here
});

app.use(session({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,
  saveUninitialized: true
}));




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(express.static(__dirname + '/template'));
// Set static folder
app.use(express.static(path.join(__dirname, 'template')));

// include routes
var routes = require('./routes/router');
app.use('/', routes);

// listen on port 8000
app.listen(5000, function () {
  console.log('Express app listening on port 5000');
});
*/
/*
// catch and handler 404
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});
*/


/*
var store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'testauth'
});

// Catch errors
store.on('error', function(error) {
  console.log(error);
});


  //var db = await connectDB();
  app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: store
  }));

*/

const Express = require("express");
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");
const connectDB = require('./config/db');
const path = require('path');

const dotenv = require('dotenv');
// Load env variables
dotenv.config({ path: './config/config.env' });


var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extend: true }));

//Mongoose.connect( process.env.MONGO_URI);
// Connect to database
connectDB();


/*
const UserModel = new Mongoose.model("user", {
    client_id: String,
    password: String
});

app.post("/register", async (request, response) => {
  try {
      request.body.password = Bcrypt.hashSync(request.body.password, 10);
      var user = new UserModel(request.body);
      var result = await user.save();
      response.send(result);
  } catch (error) {
      response.status(500).send(error);
  }
});

app.post("/login", async (request, response) => {});

app.get("/dump", async (request, response) => {
    try {
        var result = await UserModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});  */


// Set static folder
app.use(Express.static(path.join(__dirname, 'template')));

// include routes
var routes = require('./routes/router');
app.use('/', routes);

app.listen(5000, () => {
    console.log("Listening at :5000...");
});