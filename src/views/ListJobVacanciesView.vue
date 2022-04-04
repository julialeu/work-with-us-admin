<template>
  <div>
    <h1>Mis posiciones (página {{ currentNumPage }})</h1>

    <div class="list">
      <table>
        <tr>
          <th>Id</th>
          <th>Título</th>
          <th>Descripción</th>
          <th>Empresa</th>
          <th>Localidad</th>
          <th>Modalidad</th>
          <th>Experiencia</th>
          <th>Fecha creación</th>
        </tr>

        <tr v-for="item in jobVacancies.items">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.company }}</td>
          <td>{{ item.location }}</td>
          <td>{{ item.modality }}</td>
          <td>{{ item.experience }}</td>
          <td>{{ item.created }}</td>
          <td>
            <RouterLink :to="{ name: 'edit-job-vacancy', params: { 'uuid': item.uuid }}">Editar</RouterLink>
          </td>
        </tr>
      </table>
    </div>

    <div class="pagination">
      <a :class="{ 'disabled' : !isPreviousButtonEnabled}" href="#" @click="goToPreviousPage" class="w3-button">&laquo;
        Anterior</a>
      &nbsp;
      <a :class="{ 'disabled' : !isNextButtonEnabled}" href="#" @click="goToNextPage" class="w3-button">Siguiente
        &raquo;</a>
    </div>

    <div>
      <bounce-loader :loading="loading" :color="color" :size="size"></bounce-loader>
    </div>
  </div>
</template>

<script>
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'

export default {
  name: "ListJobVacanciesView.vue",
  data: function () {
    return {
      jobVacancies: [],
      currentNumPage: 1,
      isNextButtonEnabled: true,
      isPreviousButtonEnabled: false,
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
    console.log('Mounted 1')

    this.navigateToPage(this.currentNumPage);
    console.log('Mounted 2')
  },
  methods: {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
    },

    goToNextPage() {
      this.loading = true
      this.navigateToPage(this.currentNumPage + 1)
    },

    goToPreviousPage() {
      this.loading = true
      this.navigateToPage(this.currentNumPage - 1);
    },

    navigateToPage(numPage) {
      const token = this.getCookie('accessToken');

      fetch("http://localhost/api/auth/job-vacancies?numPage=" + numPage, {
        method: "GET",
        headers: {'Authorization': 'Bearer ' + token}
      }).then(res => {
        res.json().then(parsedJson => {
          this.loading = false

          this.jobVacancies = parsedJson;
          this.currentNumPage = parsedJson.numPage;

          if (this.currentNumPage === parsedJson.totalPages) {
            this.isNextButtonEnabled = false
          } else {
            this.isNextButtonEnabled = true
          }

          if (this.currentNumPage === 1) {
            this.isPreviousButtonEnabled = false
          } else {
            this.isPreviousButtonEnabled = true
          }
        })
      })
    },
  }

}
</script>

<style scoped>

.disabled {
  pointer-events: none;
  opacity: .5;
}
</style>