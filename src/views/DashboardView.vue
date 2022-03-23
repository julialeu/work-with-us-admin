<template>

  <div>
    <p>Bienvenido {{ username }} </p>&nbsp
    <div id="published">
      <a id="offers">Tus ofertas publicadas</a> &nbsp; <a id="applied">Ofertas a las que te has inscrito</a><br>
      <RouterLink to="/list-job-vacancies">Tus ofertas creadas</RouterLink>
    </div>
  </div>

</template>

<script>
export default {
  name: "DashboardView.vue",
  data: function () {
    return {
      username: ''
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
    }
  }
}
</script>

<style scoped>

</style>