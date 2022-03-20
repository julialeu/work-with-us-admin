<template>
  <div>
    <h1>Mis posiciones</h1>

    <div class="list">
      <table>
        <tr>
          <th>Id</th>
          <th>Título</th>
          <th>Localidad</th>
          <th>Modalidad</th>
          <th>Fecha creación</th>
        </tr>
        <tr>
          <td>3</td>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
          <td>3 julio 2021</td>
        </tr>
        <tr>
          <td>44</td>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
          <td>1 febrero 2022</td>
        </tr>
        <tr>
          <td>78</td>
          <td>Ernst Handel</td>
          <td>Roland Mendel</td>
          <td>Austria</td>
          <td>1 febrero 2022</td>
        </tr>
        <tr>
          <td>899</td>
          <td>Island Trading</td>
          <td>Helen Bennett</td>
          <td>UK</td>
          <td>1 febrero 2022</td>
        </tr>
        <tr>
          <td>765</td>
          <td>Laughing Bacchus Winecellars</td>
          <td>Yoshi Tannamuri</td>
          <td>Canada</td>
          <td>1 febrero 2022</td>
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
      id: '',
      title: '',
      location: '',
      modality: '',
      created_at: '',
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

        // this.username = parsedJson.name
      })
    })

  },

  methods: {
    submit: function () {
      let data = {
        id: this.id,
        title: this.title,
        location: this.location,
        modality: this.modality,
        created_at: this.created_at
      }
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