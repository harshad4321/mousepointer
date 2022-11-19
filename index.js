var express = require('express')
var app = express()

app.get('/', (req, res) => {
    res.send('haiiii')
})


process.env.PORT | 3000


var server = app.listen(process.env.PORT || 8081, () => {
    console.log('Server is started on 127.0.0.1:' + (process.env.PORT || 8081), `http://localhost:8081/`)
})
