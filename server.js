require('rootpath')();
const express = require('express');
const app = express();
const server = require('http').Server(app);
const rabbitmq = require('_helpers/rabbitmq');
const path = require('path');
const io = require('socket.io')(server);

app.use('/', express.static(path.join(__dirname, 'dist')));

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
})

io.on('connection', socket => {
    socket.on('doctor.create', data => {
        rabbitmq.sendToMQ('doctor.create', data);
    });
});

const port = process.env.PORT || 80;

server.listen(port);
