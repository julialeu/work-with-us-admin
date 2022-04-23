<template>

  <div>
    <p>Hola {{ username }} </p>&nbsp
    <div id="published">
      <br>

      <RouterLink to="/list-job-vacancies" class="button">Ofertas de empleo</RouterLink>
      <br>
      <RouterLink to="/create-job-vacancy" class="button">+ Crear Nueva Oferta</RouterLink>
      <br>
      <br>
      <br>

      <RouterLink to="/my-companies" class="button">Mis empresas</RouterLink>
    </div>
  </div>

</template>

<script>
import { store } from './../store.js'
import { getCookieService } from './../services/GetCookie.js'

export default {
  name: "DashboardView.vue",
  mixins: [getCookieService],
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
}
</script>

<style scoped>

</style>