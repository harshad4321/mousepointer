var express = require('express');
var router = express.Router();

// 

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index')




});

// module.exports = (socket, res) => {
//   // var on = socket.get('io');
//   socket.on("connection", () => {
//     console.log('a user connected'.green);
//     // require('./routes/index')(io, socket)
//     socket.on("new-user", (data) => {
//       console.log(data);
//     })
//   })

//   return router;
// }


module.exports = router