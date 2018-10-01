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
                    <router-link to="/register">
                        <a class="navbar-item">Register</a>
                    </router-link>
                    <router-link to="/login">
                        <a class="navbar-item">Login</a>
                    </router-link>
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
  name: 'App'
}
</script>

<style></style>
