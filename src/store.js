import Vuex from 'vuex'
import Vue from 'vue'
import createPersist, { createStorage } from 'vuex-localstorage'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersist({
        namespace: 'sessions-make-appointments',
        initialState: {},
        // ONE_WEEK
        expires: 2 * 60 * 60 * 1e3
    })],
    state: {
        patient: {id: null, token: null},
        doctor: {id: null, token: null},
    },
    mutations: {
        loginDoctor (state, doctor) {
            state.doctor = doctor
        },
        loginPatient (state, patient) {
            state.patient = patient
        }
    }
  })
