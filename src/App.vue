<template>
    <div id="app">
        <nav class="navbar is-light" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link to="/">
                    <a class="navbar-item" href="/">Make Appointments</a>
                </router-link>
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div class="navbar-menu">
                <div class="navbar-end">
                    <router-link v-if="!isLogged" to="/register">
                        <a class="navbar-item">Register</a>
                    </router-link>
                    <router-link v-else to="/dashboard">
                        <a class="navbar-item">Dashboard</a>
                    </router-link>
                    <router-link v-if="!isLogged" to="/login">
                        <a class="navbar-item">Login</a>
                    </router-link>
                    <a @click="logout" class="navbar-item" v-else>Logout</a>
                </div>
            </div>
        </nav>
        <div class="container" style="padding-top: 50px;">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    computed: {
        isLogged() {
            return this.$store.getters.loggedUser != null;
        }
    },
    methods: {
        logout() {
            if (this.$store.getters.isDoctor) {
                this.$store.commit('loginDoctor', {
                        token: null,
                        id: null
                    })
            } else if (this.$store.getters.isPatient) {
                this.$store.commit('loginPatient', {
                        token: null,
                        id: null
                    })
                window.location = '/'
            }
        }
    }
}
</script>

<style></style>
