<template>

  <p>Bienvenido</p>&nbsp
  <form>
    <label for="title">Título:</label>&nbsp
    <input v-model="title" type="text" id="title" name="title"><br>
    <label for="company">Empresa:</label>&nbsp
    <input v-model="company" type="text" id="company" name="company"><br>
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
    <input v-model="workingTime" type="text" id="workingTime" name="workingTime"><br>
    <label for="experience">Experiencia:</label>&nbsp
    <select v-model="experience" name="experience" id="experience">
      <option value="">Selecciona una opción...</option>
      <option value="trainee">Prácticas</option>
      <option value="junior">Junior</option>
      <option value="senior">Senior</option>
    </select><br>
    <a href="#" @click="submit">Publicar oferta!</a><br>
  </form>

</template>

<script>
export default {
  name: "CreateJobVacancyView.vue",
  data: function () {
    return {
      title: '',
      company: '',
      location: '',
      modality: '',
      workingTime: '',
      experience: ''
    }
  },

  methods : {
    submit: function () {

      let data = { title: this.title,
                    company: this.company,
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
        })
      })
      console.log('Submit');
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