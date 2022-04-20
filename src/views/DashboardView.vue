<template>

  <div>
    <p>Hola {{ username }} </p>&nbsp
    <div id="published">
      <a id="offers">Tus ofertas publicadas (under construction)</a> &nbsp;
      <br>
      <br>

      <RouterLink to="/list-job-vacancies">Mis posiciones</RouterLink>
      <br>
      <RouterLink to="/create-job-vacancy">+ Crear Nueva Oferta</RouterLink>
      <br>
      <br>
      <a v-on:click="logout" href="#">Logout</a>

      <br>
      <br>

      <RouterLink to="/my-companies">Mis empresas</RouterLink>
    </div>
  </div>

</template>

<script>
import { store } from './../store.js'

export default {
  name: "DashboardView.vue",
  data: function () {
    return {
      username: '',
      store
    }
  },
  mounted() {
    const token = this.getCookie('accessToken');

    fetch("http://localhost/api/auth/profile", {
      method: "GET",
      headers: {'Authorization': 'Bearer ' + token}
    }).then(res => {
      res.json().then(parsedJson => {
        this.username = parsedJson.name
      })
    })

  },
  methods: {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
    },
    logout() {
      console.log('Logout');
      this.deleteCookie('accessToken');
      this.$router.push({name: 'login'})
      this.store.isLoggedIn = false


    },
    deleteCookie(name) {
      document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }
}
</script>

<style scoped>

</style>