<template>
  <div>
    <h1 style="display: block">
      <span>Mis empresas</span>

      <bounce-loader :loading="loading" :color="color" :size="size"></bounce-loader>
    </h1>

    <br>

    <div class="list">
      <table>
        <tr v-if="companies.items && companies.items.length > 0">
          <th>Nombre</th>
          <th>Creado</th>
        </tr>

        <tr v-for="item in companies.items">
          <td>{{ item.name }}</td>
          <td>{{ item.created_at }}</td>
          <td>
            <RouterLink :to="{ path: 'edit-company', query: { 'companyId': item.id }}" class="button">Editar</RouterLink>
          </td>
          <td>
              <a href="" @click="goToCompany(item.slug, $event)" class="button">Ver más</a>
          </td>
        </tr>
      </table>
      <br>
      <br>
    </div>

    <div>
      <RouterLink to="/create-company" class="button">+ Crear Nueva Empresa</RouterLink>
    </div>

  </div>
</template>

<script>
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
import { getCookieService } from './../services/GetCookie.js'

export default {
  name: "ListMyCompaniesView.vue",
  mixins: [getCookieService],
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
    goToCompany(companySlug, e) {
      e.preventDefault();

      const url = import.meta.env.VITE_FULL_DOMAIN + '/' + companySlug

      window.location.href = url;
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
    }
  }

}
</script>

<style scoped>

.list table {
  border-collapse:separate;
  border-spacing:1em;
}

</style>