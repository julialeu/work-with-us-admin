<template>
  <div>
    <h1>Editar oferta</h1>


    <form>
      <label for="title">Título:</label><br>
      <input type="text" id="title" name="title" v-model="form.title"><br>

      <label for="description">Descripción:</label><br>
      <textarea type="text" id="description" name="description" v-model="form.description"></textarea><br>

      <label for="company">Empresa:</label><br>
      <input type="text" id="company" name="company" v-model="form.company"><br>

      <label for="location">Localidad:</label><br>
      <input type="text" id="location" name="location" v-model="form.location"><br>

      <label for="modality">Modalidad:</label><br>
      <input type="text" id="modality" name="modality" v-model="form.modality"><br>

      <label for="workingTime">Tipo de jornada:</label><br>
      <input type="text" id="workingTime" name="workingTime" v-model="form.workingTime"><br>

      <label for="experience">Experience:</label><br>
      <input type="text" id="experience" name="experience" v-model="form.experience"><br>

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


export default {
  name: "EditJobVacancyView.vue",
  data: function () {
    return {
      uuid: '',
      originalJobVacancy: null,
      form: {
        title: '',
        description: '',
        company: '',
        location: '',
        modality: '',
        workingTime: ''
      },
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
    const token = this.getCookie('accessToken');
    console.log('Mounted 2')

    const uuid = this.$route.params.uuid
    fetch("http://localhost/api/auth/job-vacancy?uuid=" + uuid, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(res => {

      res.json().then(parsedJson => {
        this.loading = false
        console.log('get recibido')
        console.log(parsedJson)

        this.originalJobVacancy = parsedJson

        this.form.title = parsedJson.title
        this.form.description = parsedJson.description
        this.form.company = parsedJson.company
        this.form.location = parsedJson.location
        this.form.modality = parsedJson.modality
        this.form.workingTime = parsedJson.workingTime
        this.form.experience = parsedJson.experience
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
    },
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
      if (this.originalJobVacancy.company !== this.form.company) {
        bodyData.company = this.form.company
      }
      if (this.originalJobVacancy.location !== this.form.location) {
        bodyData.location = this.form.location
      }
      if (this.originalJobVacancy.modality !== this.form.modality) {
        bodyData.modality = this.form.modality
      }
      if (this.originalJobVacancy.workingTime !== this.form.workingTime) {
        bodyData.workingTime = this.form.workingTime
      }
      if (this.originalJobVacancy.experience !== this.form.experience) {
        bodyData.experience = this.form.experience
      }

      const token = this.getCookie('accessToken');
      const uuid = this.$route.params.uuid
      fetch("http://localhost/api/auth/job-vacancy?uuid=" + uuid, {
        method: "PATCH",
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData),
      }).then(res => {
        res.json().then(parsedJson => {
          this.loading = false
        })
      })
    }
  }
}
</script>

<style scoped>

</style>