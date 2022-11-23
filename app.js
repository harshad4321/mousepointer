var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var colour = require('colours')


require('dotenv').config()


var http = require("http");
var { Server } = require("socket.io");

var app = express();



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// Create the http server
const server = require('http').createServer(app);


// the top of http server
var io = new Server(server);


// const User = {};

// io.on("connection", (socket) => {
//   console.log('a user connected'.green);
//   console.log('connection', socket.id)
//   socket.on("new-user", (data) => {
//     console.log('>>>>>.', data);
//     socket.broadcast.emit("new-user", data) //now it show me also;


//   })
//   socket.on("mousemoove", (coordinates) => {
//     socket.broadcast.emit('mousemove', { coordinates, id: socket.id });
//   })
// })



const user = {};
io.on("connection", (socket) => {
  socket.emit("fetch-users", user);

  socket.on("new-user", (data) => {
    const newUser = {
      id: socket.id,
      text: data.text,
    };
    user[socket.id] = newUser;

    io.emit("new-user", newUser);
  });

  socket.on("mousemmove", (coordinates) => {
    io.emit("mousemove", { coordinates, id: socket.id });
  });

  socket.on("disconnect", () => {
    delete user[socket.id];
    io.emit("user-left", { id: socket.id });
  });
});




// app.set('socketio', io);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

module.exports = { app: app, server: server };
