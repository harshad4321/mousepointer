const colour = require('colors');
var express = require('express')
const http = require('http');
const { Server } = require('socket.io');
var app = express();
const servers = http.createServer(app)
const io = new Server(server)

app.use(express.static('./public'))

process.env.PORT | 3000

app.get('/', (req, res) => {
    res.render('./index.html')
})




var server = servers.listen(process.env.PORT || 8081, () => {
    console.log('Server is started on 127.0.0.1:' + (process.env.PORT || 8081), `http://localhost:8081/`.red)
})
