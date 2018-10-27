module.exports = [
    {
        socket: {
            call: 'doctor.create', done: 'doctor.created', error: 'doctor.create.error'
        },
        rabbitmq: {
            exchange: 'doctors', call: 'doctor.create', done: 'doctor.created', error: 'doctor.create.error'
        }
    },
    {
        socket: {
            call: 'doctor.update', done: 'doctor.updated', error: 'doctor.update.error'
        },
        rabbitmq: {
            exchange: 'doctors', call: 'doctor.update', done: 'doctor.updated', error: 'doctor.update.error'
        }
    },
    {
        socket: {
            call: 'doctor.delete', done: 'doctor.deleted', error: 'doctor.delete.error'
        },
        rabbitmq: {
            exchange: 'doctors', call: 'doctor.delete', done: 'doctor.deleted', error: 'doctor.delete.error'
        }
    },
    {
        socket: {
            call: 'doctor.authenticate', done: 'doctor.authenticated', error: 'doctor.authenticate.error'
        },
        rabbitmq: {
            exchange: 'doctors', call: 'doctor.authenticate', done: 'doctor.authenticated', error: 'doctor.authenticate.error'
        }
    },
    {
        socket: {
            call: 'doctor.get.all', done: 'doctor.got.all', error: 'doctor.get.all.error'
        },
        rabbitmq: {
            exchange: 'doctors', call: 'doctor.get.all', done: 'doctor.got.all', error: 'doctor.get.all.error'
        }
    },
    {
        socket: {
            call: 'doctor.get.by.id', done: 'doctor.got.by.id', error: 'doctor.get.by.id.error'
        },
        rabbitmq: {
            exchange: 'doctors', call: 'doctor.get.by.id', done: 'doctor.got.by.id', error: 'doctor.get.by.id.error'
        }
    },
    {
        socket: {
            call: 'doctor.get.avail.day', done: 'doctor.got.avail.day', error: 'doctor.get.avail.day.error'
        },
        rabbitmq: {
            exchange: 'doctors', call: 'doctor.get.avail.day', done: 'doctor.got.avail.day', error: 'doctor.get.avail.day.error'
        }
    },
];

