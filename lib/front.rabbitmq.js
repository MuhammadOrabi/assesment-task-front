const rabbitmq = require('_helpers/rabbitmq');

module.exports = {
    doctorCreate,
    doctorAuthenticate,
    doctorGetAll,
    doctorGetAvailByDay
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


function doctorGetAll(socket) {
    socket.on('doctor.get.all', data => {
        rabbitmq.sendToMQ('doctor.get.all', data);
    });

    rabbitmq.getFromMQ('doctors', 'doctor.get.all.error', msg => {
        console.log("[front] %s", msg.content.toString());
        socket.emit('doctor.get.all.error', msg.content.toString());
    });

    rabbitmq.getFromMQ('doctors', 'doctor.got.all', msg => {
        console.log("[front] %s", msg.content.toString());
        socket.emit('doctor.got.all', msg.content.toString());
    });
}

function doctorGetAvailByDay(socket) {
    socket.on('doctor.get.avail.day', data => {
        rabbitmq.sendToMQ('doctor.get.avail.day', data);
    });

    rabbitmq.getFromMQ('doctors', 'doctor.get.avail.day.error', msg => {
        console.log("[front] %s", msg.content.toString());
        socket.emit('doctor.get.avail.day.error', msg.content.toString());
    });

    rabbitmq.getFromMQ('doctors', 'doctor.got.avail.day', msg => {
        console.log("[front] %s", msg.content.toString());
        socket.emit('doctor.got.avail.day', msg.content.toString());
    });
}
