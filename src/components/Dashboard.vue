<template>
    <section>
        <section v-if="isPatient">
            <h1 class="title">Doctors</h1>
            <Doctors />
            <hr>
        </section>
        <section v-if="isDoctor">
            <h1 class="title">Appointments</h1>
            <Appointments />
        </section>
    </section>
</template>

<script>
    import Doctors from '@/components/Doctors'
    import Appointments from '@/components/Appointments'

    export default {
        name: 'Dashboard',
        components: {Doctors, Appointments},
        data() {
            return {
                data: [],
                isPaginated: true,
                isPaginationSimple: false,
                defaultSortDirection: 'asc',
                currentPage: 1,
                perPage: 5
            }
        },
        computed: {
            isPatient() {
                return this.$store.getters.isPatient
            },
            isDoctor() {
                return this.$store.getters.isDoctor
            }
        }
    }
</script>
