<template>
    <section>
        <b-table :data="data" :paginated="true" :per-page="10">
            <template slot-scope="props">
                <b-table-column field="name" label="Name" sortable>
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column field="major" label="Major" sortable>
                    {{ props.row.major }}
                </b-table-column>

                <b-table-column label="Make Appointment">
                    <button class="button is-primary" @click="selectDoctor(props.row)">
                        Make Appointment
                    </button>
                </b-table-column>
            </template>
            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="emoticon-sad"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>Nothing here.</p>
                    </div>
                </section>
            </template>
        </b-table>
        <b-modal :active.sync="isModalActive" :width="640" scroll="keep">
            <div class="card">
                <div class="card-content">
                    <b-field grouped>
                        <b-field label="Day">
                            <b-select placeholder="Select a day" v-model="form.Day" @input="getDoctorsAppointments">
                                <option
                                    v-for="(work, i) in doctor.work"
                                    :value="work.day"
                                    :key="i">
                                    {{ work.day }}
                                </option>
                            </b-select>
                        </b-field>
                        <b-field label="Hour">
                            <b-select placeholder="Select a hour" v-model="form.Hour">
                                <option
                                    v-for="(hour, i) in availHours"
                                    :value="hour"
                                    :key="i">
                                    {{ hour }}
                                </option>
                            </b-select>
                        </b-field>
                    </b-field>
                    <b-field>
                        <button class="button is-sucess" @click="make">make appointment</button>
                    </b-field>
                </div>
            </div>
        </b-modal>
    </section>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Appointments',
        data() {
            return {
                data: [],
                isModalActive: false,
                doctor: {},
                form: {},
                availHours: [],
                errors: []
            }
        },
        computed: {
            patient() {
                return this.$store.getters.loggedUser.id
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData() {
                this.$socket.emit(`doctor.get.all`, this.form);

                this.$options.sockets[`doctor.get.all.error`] = (data) => {
                    this.errors = [JSON.parse(data)];
                };

                this.$options.sockets[`doctor.got.all`] = (data) => {
                    data = JSON.parse(data);
                    this.data = data
                };
            },
            selectDoctor(doctor) {
                this.isModalActive = true
                this.doctor = doctor
            },
            getDoctorsAppointments() {
                if (!this.doctor.id || !this.form.Day) {
                    return;
                }
                this.$socket.emit(`doctor.get.avail.day`, {
                    id: this.doctor.id,
                    day: this.form.Day
                });

                this.$options.sockets[`doctor.get.avail.day.error`] = (data) => {
                    this.errors = [JSON.parse(data)];
                };

                this.$options.sockets[`doctor.got.avail.day`] = (data) => {
                    data = JSON.parse(data);
                    this.availHours = data;
                };
            },
            make() {
                this.form.DoctorId = this.doctor.id;
                this.form.PatientId = this.patient;
                this.form.Day = parseInt(this.form.Day);
                this.form.Hour = parseInt(this.form.Hour);
                axios.post(`${process.env.VUE_APP_APPOINTMENTS_API}/add`, this.form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(res => {
                    this.isModalActive = false;
                    this.$toast.open({
                        message: `Saved successfully!`,
                        type: 'is-sucess'
                    })
                }).catch(err => console.log(err))
            }
        }
    }
</script>
