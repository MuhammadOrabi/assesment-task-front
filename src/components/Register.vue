<template>
    <section>
        <b-field label="Name">
            <b-input v-model="form.name" required></b-input>
        </b-field>

        <b-field label="Username">
            <b-input type="text" v-model="form.username" required></b-input>
        </b-field>

        <b-field label="Password">
            <b-input type="password" v-model="form.password" password-reveal required></b-input>
        </b-field>

        <b-field label="Sign up as">
            <b-field>
                <b-radio-button v-model="form.type" native-value="patient" type="is-primary">
                    <b-icon icon="close"></b-icon>
                    <span>Patient</span>
                </b-radio-button>

                <b-radio-button v-model="form.type" native-value="doctor" type="is-info">
                    <b-icon icon="check"></b-icon>
                    <span>Doctor</span>
                </b-radio-button>
            </b-field>
        </b-field>

        <b-field grouped v-if="form.type == 'doctor'">
            <b-field label="Major">
                <b-input v-model="form.major"></b-input>
            </b-field>
            <b-field label="Appointment processing Time (minutes)">
                <b-input type="number" v-model="form.appointment_time"></b-input>
            </b-field>
        </b-field>

        <b-field>
            <button class="button is-success" :disabled="isDisabled" @click="check">Sign up</button>
        </b-field>

    </section>
</template>

<script>
    export default {
        name: 'Register',
        data() {
            return {
                form: {
                    type: 'doctor',
                    username: 'username',
                    name: 'user',
                    password: 'password'
                }
            }
        },
        computed: {
            isDisabled() {
                return this.form.name && this.form.username && this.form.password ? false : true;
            }
        },
        methods: {
            check() {
                this.$socket.emit(`${this.form.type}.create`, this.form);
            },
            patient() {
                axios.post(`${process.env.VUE_APP_PATIENTS_API}/register`, this.form, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    this.$store.commit('loginPatient', {
                        token: res.data.jwt_token,
                        id: res.data.id
                    })
                    window.location = '/dashboard'
                }).catch(err => console.log(err));
            },
            doctor() {
                axios.post(`${process.env.VUE_APP_DOCTORS_API}/register`, this.form)
                .then(res => {
                    this.$store.commit('loginDoctor', {
                        token: res.data.jwt_token,
                        id: res.data.id
                    })
                    window.location = '/dashboard'
                }).catch(err => console.log(err));
            }
        }
    }
</script>
