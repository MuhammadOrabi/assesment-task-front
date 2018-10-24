const rabbitmq = require('_helpers/rabbitmq');

module.exports = {
    doctorCreate,
    doctorAuthenticate
};

function doctorCreate(socket) {
    socket.on('doctor.create', data => {
        rabbitmq.sendToMQ('doctor.create', data);
    });

    rabbitmq.getFromMQ('doctors', 'doctor.create.error', msg => {
        console.log("[front] %s", msg.content.toString());
        socket.emit('doctor.create.error', msg.content.toString());
    });

    rabbitmq.getFromMQ('doctors', 'doctor.created', msg => {
        console.log("[front] %s", msg.content.toString());
        socket.emit('doctor.created', msg.content.toString());
    });
}


function doctorAuthenticate(socket) {
    socket.on('doctor.authenticate', data => {
        rabbitmq.sendToMQ('doctor.authenticate', data);
    });

    rabbitmq.getFromMQ('doctors', 'doctor.authenticate.error', msg => {
        console.log("[front] %s", msg.content.toString());
        socket.emit('doctor.authenticate.error', msg.content.toString());
    });

    rabbitmq.getFromMQ('doctors', 'doctor.authenticated', msg => {
        console.log("[front] %s", msg.content.toString());
        socket.emit('doctor.authenticated', msg.content.toString());
    });
}
