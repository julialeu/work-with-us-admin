<template>
  <div>
    <h1>Editar oferta</h1>

    <form>
      <label for="title">Título:</label><br>
      <input type="text" id="title" name="title" v-model="form.title"><br>

      <div>
        <label>Descripción</label>&nbsp
        <div id="pell" class="pell"/>
      </div>

      <label for="location">Localidad:</label><br>
      <input type="text" id="location" name="location" v-model="form.location"><br>

      <label for="modality">Modalidad:</label><br>
      <select v-model="form.modality" name="modality" id="modality">
        <option value="">Selecciona una opción...</option>
        <option value="on_site">Presencial</option>
        <option value="remote">Remoto</option>
        <option value="hybrid">Híbrido</option>
      </select>
      <br>

      <label for="workingTime">Tipo de jornada:</label><br>
      <select v-model="form.workingTime" name="workingTime" id="workingTime">
        <option value="">Selecciona una opción...</option>
        <option value="full_time">Jornada Completa</option>
        <option value="part_time">Media Jornada</option>
      </select>

      <br>
      <br>

      <label for="experience">Experience:</label><br>
      <select v-model="form.experience" name="experience" id="experience">
        <option value="">Selecciona una opción...</option>
        <option value="trainee">Prácticas</option>
        <option value="junior">Junior</option>
        <option value="senior">Senior</option>
      </select>

      <br>
      <input @click="editJobVacancy" type="submit" value="Submit">
    </form>

    <div>
      <bounce-loader :loading="loading" :color="color" :size="size"></bounce-loader>
    </div>
  </div>
</template>

<script>
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
import { getCookieService } from './../services/GetCookie.js'
import pell from 'pell'

export default {
  name: "EditJobVacancyView.vue",
  mixins: [getCookieService],

  data: function () {
    return {
      uuid: '',
      originalJobVacancy: null,
      form: {
        title: '',
        description: '',
        location: '',
        modality: '',
        workingTime: ''
      },
      color: '#53b883',
      color1: '#5bc0de',
      size: '45px',
      margin: '2px',
      radius: '2px',
      loading: true,
      pellEditor: null
    }
  },
  components: {
    BounceLoader
  },

  mounted() {

    this.pellEditor = pell.init({
      element: document.getElementById('pell'),
      onChange: html => {
        this.form.description = html
      },
      actions: [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'heading1',
        'heading2',
        'paragraph',
        'quote',
        'olist',
        'ulist',
        'code',
        'line',
        {
          name: 'image',
          result: () => {
            const url = window.prompt('Enter the image URL')
            if (url) pell.exec('insertImage', this.ensureHTTP(url))
          }
        },
        {
          name: 'link',
          result: () => {
            const url = window.prompt('Enter the link URL')
            if (url) pell.exec('createLink', this.ensureHTTP(url))
          }
        }
      ]
    })

    const token = this.getCookie('accessToken');
    const uuid = this.$route.params.uuid
    fetch("http://localhost/api/user/job-vacancy?uuid=" + uuid, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(res => {

      res.json().then(parsedJson => {
        this.loading = false
        this.originalJobVacancy = parsedJson

        this.form.title = parsedJson.title
        this.form.description = parsedJson.description
        this.form.location = parsedJson.location
        this.form.modality = parsedJson.modality
        this.form.workingTime = parsedJson.working_time
        this.form.experience = parsedJson.experience

        this.pellEditor.content.innerHTML = parsedJson.description
      })
    })
  },

  methods: {
    editJobVacancy(e) {
      // Do not send the form
      e.preventDefault();

      this.loading = true

      let bodyData = {}

      if (this.originalJobVacancy.title !== this.form.title) {
        bodyData.title = this.form.title
      }
      if (this.originalJobVacancy.description !== this.form.description) {
        bodyData.description = this.form.description
      }
      if (this.originalJobVacancy.location !== this.form.location) {
        bodyData.location = this.form.location
      }
      if (this.originalJobVacancy.modality !== this.form.modality) {
        bodyData.modality = this.form.modality
      }
      if (this.originalJobVacancy.working_time !== this.form.workingTime) {
        bodyData.workingTime = this.form.workingTime
      }
      if (this.originalJobVacancy.experience !== this.form.experience) {
        bodyData.experience = this.form.experience
      }

      const token = this.getCookie('accessToken');
      const uuid = this.$route.params.uuid
      fetch("http://localhost/api/user/job-vacancy?uuid=" + uuid, {
        method: "PATCH",
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData),
      }).then(res => {
        res.json().then(parsedJson => {
          this.loading = false

          this.$router.push({ name: 'list-job-vacancies' })
        })
      })
    }
  }
}
</script>

<style scoped>

.pell {
  border: 2px solid #000;
  border-radius: 0;
  box-shadow: none;
}

#pell-html-output {
  margin: 0;
  white-space: pre-wrap;
}

</style>