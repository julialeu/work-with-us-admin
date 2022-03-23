<template>
  <div>
    <h1>Mis posiciones</h1>

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
          <td>{{item.title}}</td>
          <td>{{item.description}}</td>
          <td>{{item.company}}</td>
          <td>{{item.location}}</td>
          <td>Germany</td>
          <td>3 julio 2021</td>
        </tr>
      </table>
    </div>

    <div class="pagination">
      <a href="#" class="w3-button">&laquo;</a>
      <a href="#" class="w3-button">&raquo;</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListJobVacanciesView.vue",
  data: function () {
    return {
      jobVacancies: [],


    }

  },
  mounted() {
    const token = this.getCookie('accessToken');

    fetch("http://localhost/api/auth/job-vacancies?numPage=1", {
      method: "GET",
      headers: {'Authorization': 'Bearer ' + token}
    }).then(res => {
      res.json().then(parsedJson => {
        console.log(parsedJson);

        this.jobVacancies = parsedJson;


        // this.username = parsedJson.name
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
    }
  }


}
</script>

<style scoped>

</style>