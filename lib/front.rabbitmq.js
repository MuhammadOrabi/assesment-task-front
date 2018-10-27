const rabbitmq = require('_helpers/rabbitmq');

const doctors = require('./doctors.events');

const events = [].concat(doctors);

module.exports = function(socket) {
    events.forEach(event => {
        socket.on(event.socket.call, data => {
            rabbitmq.sendToMQ(event.rabbitmq.call, data);
        });

        rabbitmq.getFromMQ(event.rabbitmq.exchange, event.rabbitmq.error, msg => {
            console.log("[front] %s", msg.content.toString());
            socket.emit(event.socket.error, msg.content.toString());
        });

        rabbitmq.getFromMQ(event.rabbitmq.exchange, event.rabbitmq.done, msg => {
            console.log("[front] %s", msg.content.toString());
            socket.emit(event.socket.done, msg.content.toString());
        });
    });
}
