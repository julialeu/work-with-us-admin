<template>
  <span class="dashboard-link">

      <RouterLink v-if="store.isLoggedIn" to="/list-job-vacancies" class="button">Ofertas de empleo</RouterLink>
      <RouterLink v-if="store.isLoggedIn" to="/create-job-vacancy" class="button">Crear Nueva Oferta</RouterLink>
      <RouterLink v-if="store.isLoggedIn" to="/my-companies" class="button">Mis empresas</RouterLink>




<!--    <RouterLink v-if="store.isLoggedIn" to="/dashboard">Dashboard</RouterLink>-->
    <RouterLink v-if="!store.isLoggedIn" to="/login">Login</RouterLink>
    <a href="#" v-if="store.isLoggedIn" v-on:click="logout" class="button">Logout</a>

  </span>
</template>

<script>
import { store } from './../store.js'
import { getCookieService } from './../services/GetCookie.js'

export default {
  name: "DashboardLink",
  mixins: [getCookieService],
  data() {
    return {
      store
    }
  },
  methods: {
    logout() {
      this.deleteCookie('accessToken');
      this.$router.push({name: 'login'})
      this.store.isLoggedIn = false
    },
    deleteCookie(name) {
      document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  },
  mounted() {
    const accessToken = this.getCookie('accessToken');

    this.store.isLoggedIn = (accessToken !== undefined);
  },
}
</script>

<style scoped>

.dashboard-link {
  border-left: 1px solid var(--color-border);
}

</style>