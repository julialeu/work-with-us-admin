<template>
  <div>
    <h1>
      <span style="float:left">Mis posiciones (página {{ currentNumPage }})</span>

        <bounce-loader :loading="loading" :color="color" :size="size" style="float:left"></bounce-loader>
    </h1>

    <div class="list">
      <table style="min-height: 358px">
        <tr v-if="jobVacancies.items && jobVacancies.items.length > 0">
          <th>Id</th>
          <th>Título</th>
          <th>Descripción</th>
          <th>Empresa</th>
          <th>Localidad</th>
          <th>Modalidad</th>
          <th>Experiencia</th>
          <th>Creado</th>
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


          <td v-if="item.status === 'unpublished'">
            <a href="" @click="publishJobVacancyButton(item.uuid, $event)">Publicar</a>
          </td>

          <td v-if="item.status === 'published'">
            <a href="" @click="unpublishJobVacancyButton(item.uuid, $event)">Despublicar</a>
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

    publishJobVacancyButton(jobVacancyUuid, e) {
      // Do not send the form
      e.preventDefault();
      this.loading = true

      const token = this.getCookie('accessToken');

      fetch("http://localhost/api/user/mark-job-vacancy-as-published?uuid=" + jobVacancyUuid, {
        method: "PATCH",
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then(res => {
        res.json().then(parsedJson => {
          // Refresh current page data
          this.navigateToPage(this.currentNumPage)
        })
      })
    },

    unpublishJobVacancyButton(jobVacancyUuid, e) {
      // Do not send the form
      e.preventDefault();
      this.loading = true

      const token = this.getCookie('accessToken');

      fetch("http://localhost/api/user/mark-job-vacancy-as-unpublished?uuid=" + jobVacancyUuid, {
        method: "PATCH",
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then(res => {
        res.json().then(parsedJson => {
          // Refresh current page data
          this.navigateToPage(this.currentNumPage)
        })
      })
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