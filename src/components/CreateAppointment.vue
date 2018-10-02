<template>
    <section>
        <b-field label="Username">
            <b-input type="text" v-model="form.username" required></b-input>
        </b-field>

        <b-field label="Password">
            <b-input type="password" v-model="form.password" password-reveal required></b-input>
        </b-field>

        <b-field label="Login as">
            <b-field>
                <b-radio-button v-model="form.type" native-value="patient" type="is-primary">
                    <b-icon icon="close"></b-icon>
                    <span>Patient</span>
                </b-radio-button>

                <b-radio-button v-model="form.type" native-value="Yep" type="is-info">
                    <b-icon icon="check"></b-icon>
                    <span>Doctor</span>
                </b-radio-button>
            </b-field>
        </b-field>
        <b-field>
            <button class="button is-success" :disabled="isDisabled" @click="check">Login</button>
        </b-field>

    </section>
</template>

<script>
    export default {
        name: 'CreateAppointment',
        data() {
            return {
                form: {
                    type: 'patient'
                }
            }
        },
        computed: {
            isDisabled() {
                return this.form.username && this.form.password ? false : true;
            }
        },
        methods: {
            check() {
                if (this.form.type === 'patient') {
                    this.patient();
                } else {
                    this.doctor();
                }
            },
            patient() {
                axios.post(`${process.env.VUE_APP_PATIENTS_API}/login`, this.form)
                .then(res => {
                    this.$store.commit('loginPatient', {
                        token: res.data.jwt_token,
                        id: res.data.id
                    })
                }).catch(err => console.log(err));
            },
            doctor() {
                axios.post(`${'http://localhost:3000/api/doctors'}`, this.form)
                .then(res => {
                    console.log(res);
                }).catch(err => console.log(err));
            }
        }
    }
</script>
