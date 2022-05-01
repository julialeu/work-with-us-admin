<template>
  <div>
    <h1>
      <span>Ofertas de empleo (página {{ currentNumPage }})</span>

      <bounce-loader :loading="loading" :color="color" :size="size"></bounce-loader>
    </h1>

    <div class="list">
      <table>
        <tr v-if="jobVacancies.items && jobVacancies.items.length > 0">
          <th>Estado</th>
          <th>Título</th>
          <th>Empresa</th>
          <th>Localidad</th>
          <th>Tipo de jornada</th>
          <th>Creado</th>
        </tr>

        <tr v-for="item in jobVacancies.items">
          <td>
            <span v-if="item.status === 'unpublished'" class="inactive">Despublicada</span>
            <span v-if="item.status === 'published'" class="active">Publicada</span>
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.company_name }}</td>
          <td>{{ item.location }}</td>
          <td>
            <span v-if="item.working_time === 'full_time'">
               Completa
            </span>
            <span v-else>
              Media
            </span>
          </td>
          <td>{{ item.created }}</td>
          <td>
            <RouterLink :to="{ name: 'edit-job-vacancy', params: { 'uuid': item.uuid }} " class="button">Editar
            </RouterLink>
          </td>

          <td v-if="item.status === 'unpublished'">
            <a href="" @click="publishJobVacancyButton(item.uuid, $event)" class="button">Publicar</a>
          </td>

          <td v-if="item.status === 'published'">
            <a href="" @click="unpublishJobVacancyButton(item.uuid, $event)" class="button">Despublicar</a>
          </td>

          <td>
            <a href="" @click="goToJobVacancy(item.company_slug, item.url_token, $event)" class="button">Ver más</a>
          </td>
        </tr>
      </table>

      <div class="pagination" v-if="jobVacancies.items && jobVacancies.items.length > 0">
        <a :class="{ 'disabled' : !isPreviousButtonEnabled}" href="#" @click="goToPreviousPage" class="button">&laquo;
          Anterior</a>
        &nbsp;
        <a :class="{ 'disabled' : !isNextButtonEnabled}" href="#" @click="goToNextPage" class="button">Siguiente
          &raquo;</a>
      </div>
    </div>

  </div>
</template>

<script>
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
import {getCookieService} from './../services/GetCookie.js'

export default {
  name: "ListJobVacanciesView.vue",
  mixins: [getCookieService],
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

      fetch("http://localhost/api/user/job-vacancies?numPage=" + numPage, {
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
    goToJobVacancy(companySlug, jobVacancyUrlToken, event) {
      event.preventDefault();

      console.log('env', import.meta.env.VITE_FULL_DOMAIN)

      const url = import.meta.env.VITE_FULL_DOMAIN + '/' + companySlug + '/' + jobVacancyUrlToken
      console.log(url)

      window.location.href = url;
    }
  }

}
</script>

<style scoped>

.disabled {
  pointer-events: none;
  opacity: .5;
}

.list table tr {
  margin-bottom: 20px;
}

.list table {
  border-collapse:separate;
  border-spacing:1em;
}
</style>