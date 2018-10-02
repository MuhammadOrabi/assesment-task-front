'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    VUE_APP_PATIENTS_API: '"http://localhost:5000/api/patients"',
    VUE_APP_DOCTORS_API: '"http://localhost:3000/api/doctors"',
    VUE_APP_APPOINTMENTS_API: '"http://localhost:3001/api/appointments"',
})
