var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var colours = require('colours')

var http = require('http');

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// const { Server } = require('https');

var app = express();


/**
 * Create  socket.io .
 */

var server = http.createServer(app);
var { Server } = require("socket.io");
var io = new Server(server);



const registerOrderHandlers = require("./routes/index");
const registerUserHandlers = require("./routes/users");

const onConnection = (socket) => {
  registerOrderHandlers(io, socket);
  registerUserHandlers(io, socket);
}




io.on("connection", onConnection)



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.set(server)
// app.set(express.Server)
// app.set('socketio');

app.use('/', indexRouter);
app.use('/users', usersRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
