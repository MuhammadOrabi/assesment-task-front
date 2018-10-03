<template>
    <section>
        <b-tabs position="is-centered" class="block">
            <b-tab-item label="Appointments">
                <b-table :data="data" :paginated="true" :per-page="10">
                    <template slot-scope="props">
                        <b-table-column field="Day" label="Day" sortable>
                            {{ props.row.Day }}
                        </b-table-column>

                        <b-table-column field="Hour" label="Hour" sortable>
                            {{ props.row.Hour }}
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
            </b-tab-item>
            <b-tab-item label="The weekly schedule">
                <b-field grouped v-for="(option, i) in work" :key="i">
                    <b-field :label="'Day ' + option.day">
                        <b-checkbox v-model="checkboxGroup" :native-value="i"></b-checkbox>
                    </b-field>
                    <b-field label="From">
                        <b-input type="number" v-model="option.from"></b-input>
                    </b-field>
                    <b-field label="To">
                        <b-input type="number" v-model="option.to"></b-input>
                    </b-field>
                </b-field>
                <b-field>
                    <button class="button is-success" @click="save">Save</button>
                </b-field>
            </b-tab-item>
        </b-tabs>
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
                work: [
                    {day: 1, "from": 1, "to": 9},
                    {day: 2, "from": 1, "to": 9},
                    {day: 3, "from": 1, "to": 9},
                    {day: 4, "from": 1, "to": 9},
                    {day: 5, "from": 1, "to": 9},
                    {day: 6, "from": 1, "to": 9},
                    {day: 7, "from": 1, "to": 9}
                ],
                availHours: [],
                checkboxGroup: []
            }
        },
        created() {
            this.getData()
        },
         computed: {
            doctor() {
                return this.$store.getters.loggedUser
            }
        },
        methods: {
            getData() {
                axios.get(`${process.env.VUE_APP_APPOINTMENTS_API}/search/${this.doctor.id}`)
                .then(res => {
                    this.data = res.data
                }).catch(err => console.log(err))
            },
            save() {
                let filtered = this.work.filter((val, index) => {
                    return this.checkboxGroup.includes(index)
                })
                axios.put(`${process.env.VUE_APP_DOCTORS_API}`, {work: filtered}, {
                    headers: { 'Authorization': `Bearer ${this.doctor.token}` }
                })
                .then(res => {
                    console.log(res);
                }).catch(err => console.log(err));
            }
        }
    }
/**
 * Day - From - To
 * Day appointments - select hour
 */
</script>
