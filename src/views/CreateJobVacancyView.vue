<template>

  <p>Bienvenido</p>&nbsp
  <form>
    <label for="title">Título:</label>&nbsp
    <input v-model="title" type="text" id="title" name="title"><br>
    <label for="description">Descripción:</label>&nbsp
    <input v-model="description" type="text" id="description" name="description"><br>

    <label for="companyId">Empresa:</label>&nbsp
    <select v-model="companyId" id="companyId" name="companyId">
      <option disabled value="">Empresa</option>
      <option v-for="companyItem in companies" v-bind:value="companyItem.id">{{companyItem.name}}</option>
    </select>

    <br>

    <label for="location">Localidad:</label>&nbsp
    <input v-model="location" type="text" id="location" name="location"><br><br>
    <label for="modality">Modalidad:</label>&nbsp
    <select v-model="modality" name="modality" id="modality">
      <option value="">Selecciona una opción...</option>
      <option value="on_site">Presencial</option>
      <option value="remote">Remoto</option>
      <option value="hybrid">Híbrido</option>
    </select><br>
    <label for="workingTime">Tipo de jornada:</label>&nbsp
    <select v-model="workingTime" name="workingTime" id="workingTime">
      <option value="">Selecciona una opción...</option>
      <option value="full_time">Jornada Completa</option>
      <option value="part_time">Media Jornada</option>
    </select><br>
    <label for="experience">Experiencia:</label>&nbsp
    <select v-model="experience" name="experience" id="experience">
      <option value="">Selecciona una opción...</option>
      <option value="trainee">Prácticas</option>
      <option value="junior">Junior</option>
      <option value="senior">Senior</option>
    </select><br><br>
    <a href="#" @click="submit">!Crear oferta!</a><br>
  </form>

</template>

<script>
export default {
  name: "CreateJobVacancyView.vue",
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
  methods : {
    submit: function () {

      let data = { title: this.title,
                    description: this.description,
                    companyId: this.companyId,
                    location: this.location,
                    modality: this.modality,
                    workingTime: this.workingTime,
                    experience: this.experience};

      const token = this.getCookie('accessToken');

      fetch("http://localhost/api/auth/job-vacancy", {
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