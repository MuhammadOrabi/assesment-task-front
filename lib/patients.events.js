module.exports = [
    {
        socket: {
            call: 'patient.create', done: 'patient.created', error: 'patient.create.error'
        },
        rabbitmq: {
            exchange: 'patients', call: 'patient.create', done: 'patient.created', error: 'patient.create.error'
        }
    },
    {
        socket: {
            call: 'patient.update', done: 'patient.updated', error: 'patient.update.error'
        },
        rabbitmq: {
            exchange: 'patients', call: 'patient.update', done: 'patient.updated', error: 'patient.update.error'
        }
    },
    {
        socket: {
            call: 'patient.delete', done: 'patient.deleted', error: 'patient.delete.error'
        },
        rabbitmq: {
            exchange: 'patients', call: 'patient.delete', done: 'patient.deleted', error: 'patient.delete.error'
        }
    },
    {
        socket: {
            call: 'patient.authenticate', done: 'patient.authenticated', error: 'patient.authenticate.error'
        },
        rabbitmq: {
            exchange: 'patients', call: 'patient.authenticate', done: 'patient.authenticated', error: 'patient.authenticate.error'
        }
    },
    {
        socket: {
            call: 'patient.get.all', done: 'patient.got.all', error: 'patient.get.all.error'
        },
        rabbitmq: {
            exchange: 'patients', call: 'patient.get.all', done: 'patient.got.all', error: 'patient.get.all.error'
        }
    },
    {
        socket: {
            call: 'patient.get.by.id', done: 'patient.got.by.id', error: 'patient.get.by.id.error'
        },
        rabbitmq: {
            exchange: 'patients', call: 'patient.get.by.id', done: 'patient.got.by.id', error: 'patient.get.by.id.error'
        }
    },
];

