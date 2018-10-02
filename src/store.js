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
    },
    getters: {
        isPatient: state => {
            return state.patient.token != null
        },
        isDoctor: state => {
            return state.doctor.token != null
        },
        loggedUser: (state, getters) => {
            if (getters.isDoctor) {
                return state.doctor
            } else if (getters.isPatient) {
                return state.patient
            } else {
                return null
            }
        },

      }
  })
