<template>

  <div class="form">
    <fieldset>
      <h1>Crear oferta de empleo</h1>
      <form>
        <label for="title">Título</label>&nbsp
        <input v-model="title" type="text" id="title" name="title"><br>

        <div>
          <label>Descripción</label>&nbsp
          <div id="pell" class="pell"/>
        </div>

        <br>

        <label for="companyId">Empresa</label>&nbsp
        <select v-model="companyId" id="companyId" name="companyId">
          <option disabled value="">Empresa</option>
          <option v-for="companyItem in companies" v-bind:value="companyItem.id">{{ companyItem.name }}</option>
        </select>

        <br>

        <label for="location">Localidad</label>&nbsp
        <input v-model="location" type="text" id="location" name="location"><br><br>

        <label for="modality">Modalidad</label>&nbsp
        <select v-model="modality" name="modality" id="modality">
          <option value="">Selecciona una opción...</option>
          <option value="on_site">Presencial</option>
          <option value="remote">Remoto</option>
          <option value="hybrid">Híbrido</option>
        </select>

        <br>

        <label for="workingTime">Tipo de jornada</label>&nbsp
        <select v-model="workingTime" name="workingTime" id="workingTime">
          <option value="">Selecciona una opción...</option>
          <option value="full_time">Jornada Completa</option>
          <option value="part_time">Media Jornada</option>
        </select>

        <br>

        <label for="experience">Experiencia</label>&nbsp
        <select v-model="experience" name="experience" id="experience">
          <option value="">Selecciona una opción...</option>
          <option value="trainee">Prácticas</option>
          <option value="junior">Junior</option>
          <option value="senior">Senior</option>
        </select>

        <br><br>

        <div class="actionButton">
          <a href="#" @click="submit" class="buttonForm">Crear oferta</a><br>
        </div>
      </form>
    </fieldset>
  </div>

</template>

<script>
import {getCookieService} from './../services/GetCookie.js'
import pell from 'pell'

export default {
  name: "CreateJobVacancyView.vue",
  mixins: [getCookieService],

  data: function () {
    return {
      title: '',
      description: '',
      companyId: '',
      location: '',
      modality: '',
      workingTime: '',
      experience: '',
      companies: [],
    }
  },
  mounted() {

    pell.init({
      element: document.getElementById('pell'),
      onChange: html => {
        this.description = html
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

    fetch("http://localhost/api/user/my-companies", {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(res => {
      res.json().then(parsedJson => {
        this.companies = parsedJson.items
      })
    })

  },
  methods: {
    submit: function () {

      if (this.isFormIncomplete()) {
        alert('Rellena todos los campos obligatorios.')
        return
      }

      let data = {
        title: this.title,
        description: this.description,
        companyId: this.companyId,
        location: this.location,
        modality: this.modality,
        workingTime: this.workingTime,
        experience: this.experience
      };

      const token = this.getCookie('accessToken');

      fetch("http://localhost/api/user/job-vacancy", {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => {
        res.json().then(parsedJson => {
          this.username = parsedJson.name

          // Redirect the user to job vacancy list
          this.$router.push('list-job-vacancies');
        })
      })
    },

    isFormIncomplete() {
      if (this.title === ''
          || this.description === ''
          || this.companyId === ''
          || this.location === ''
          || this.modality === ''
          || this.workingTime === ''
          || this.experience === ''
      ) {
        return true
      }
      return false
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