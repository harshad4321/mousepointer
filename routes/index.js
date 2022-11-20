var express = require('express');
var router = express.Router();
var server = require('../bin/www');
// 

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('index')

});

// io.on('connection', (socket) => {

// })



module.exports = (io, socket) => {

}


module.exports = router;
