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
          <th>Fecha creación</th>
        </tr>
        <tr v-for="item in jobVacancies.items">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.company }}</td>
          <td>{{ item.location }}</td>
          <td>{{ item.modality }}</td>
          <td>{{ item.created }}</td>
        </tr>
      </table>
    </div>

    <div class="pagination">
      <a href="#" class="w3-button">&laquo; Anterior</a>
      &nbsp;
      &nbsp;
      <a :class="{ 'disabled' : !isNextButtonEnabled}" href="#" @click="goToNextPage" class="w3-button">Siguiente
        &raquo;</a>

    </div>
  </div>
</template>

<script>
export default {
  name: "ListJobVacanciesView.vue",
  data: function () {
    return {
      jobVacancies: [],
      currentNumPage: 1,
      isNextButtonEnabled: true,

    }
  },
  mounted() {
    this.navigateToNextPage(this.currentNumPage);
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

      this.navigateToNextPage(this.currentNumPage + 1)
    },

    navigateToNextPage(numPage) {
      const token = this.getCookie('accessToken');

      fetch("http://localhost/api/auth/job-vacancies?numPage=" + numPage, {
        method: "GET",
        headers: {'Authorization': 'Bearer ' + token}
      }).then(res => {
        res.json().then(parsedJson => {
          this.jobVacancies = parsedJson;
          this.currentNumPage = parsedJson.numPage;

          if (this.currentNumPage === parsedJson.totalPages) {
            this.isNextButtonEnabled = false
          } else {
            this.isNextButtonEnabled = true
          }

        })
      })
    }
  }


}
</script>

<style scoped>

.disabled {
  pointer-events: none;
  opacity: .5;
}
</style>