<template>
  <div>
    <h1 style="display: block">
      <span style="float:left">Mis empresas</span>

      <bounce-loader :loading="loading" :color="color" :size="size" style="float:left"></bounce-loader>
    </h1>

    <br>

    <div>
      <RouterLink to="/create-company">+ Crear Nueva Empresa</RouterLink>
    </div>


    <div class="list">
      <table>
        <tr v-if="companies.items && companies.items.length > 0">
          <th>Id</th>
          <th>Nombre</th>
          <th>Creado</th>
        </tr>

        <tr v-for="item in companies.items">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.created_at }}</td>
          <td>
            <RouterLink :to="{ path: 'edit-company', query: { 'companyId': item.id }}">Editar</RouterLink>
          </td>
        </tr>
      </table>
    </div>




  </div>
</template>

<script>
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'

export default {
  name: "ListMyCompaniesView.vue",
  data: function () {
    return {
      companies: [],
      color: '#53b883',
      color1: '#5bc0de',
      size: '45px',
      margin: '2px',
      radius: '2px',
      loading: true
    }
  },
  components: {
    BounceLoader
  },
  mounted() {
    this.showCompanies();
  },
  methods: {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
    },

    showCompanies() {
      const token = this.getCookie('accessToken');

      fetch("http://localhost/api/user/my-companies", {
        method: "GET",
        headers: {'Authorization': 'Bearer ' + token}
      }).then(res => {
        res.json().then(parsedJson => {
          this.loading = false
          this.companies = parsedJson
        })
      })
    },
  }

}
</script>

<style scoped>

</style>