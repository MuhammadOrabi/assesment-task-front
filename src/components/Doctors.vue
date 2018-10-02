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
                            <b-select placeholder="Select a day">
                                <option
                                    v-for="(work, i) in doctor.work"
                                    :value="work.day"
                                    :key="i">
                                    {{ work.day }}
                                </option>
                            </b-select>
                        </b-field>
                        <b-field label="Hour">
                            <b-select placeholder="Select a hour">
                                <option
                                    v-for="(work, i) in range(5, 10)"
                                    :value="i"
                                    :key="i">
                                    {{ work }}
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
        name: 'Doctors',
        data() {
            return {
                data: [],
                isModalActive: false,
                doctor: {}
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData() {
                axios.get(`${process.env.VUE_APP_DOCTORS_API}`)
                .then(res => {
                    this.data = res.data
                }).catch(err => console.log(err))
            },
            selectDoctor(doctor) {
                this.isModalActive = true
                this.doctor = doctor
                this.getDoctorsAppointments()
            },
            getDoctorsAppointments() {
                if (!this.doctor.id) {
                    return;
                }
                axios.get(`${process.env.VUE_APP_APPOINTMENTS_API}/search/${this.doctor.id}`)
                .then(res => {
                    console.log(res.data);
                }).catch(err => console.log(err))
            },
            make() {

            },
            range(start, end) {
                return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
            }
        }
    }
/**
 * Day - From - To
 * Day appointments - select hour
 */
</script>
