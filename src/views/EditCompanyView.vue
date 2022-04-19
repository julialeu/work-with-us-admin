<template>
  <div>
    <h1>Editar Empresa</h1>


    <form>
      <label for="title">* Nombre:</label><br>
      <input type="text" readonly disabled id="name" name="name" v-model="form.name"><br>

      <label for="description">* Descripción:</label><br>
      <textarea type="text" id="description" name="description" v-model="form.description"></textarea><br>

      <br>
      <input @click="edit" type="submit" value="Submit">
    </form>

    <div>
      <bounce-loader :loading="loading" :color="color" :size="size"></bounce-loader>
    </div>
  </div>
</template>

<script>
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'


export default {
  name: "EditCompanyView.vue",
  data: function () {
    return {
      form: {
        name: '',
        description: '',
      },
      originalCompany: null,
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
    const token = this.getCookie('accessToken');

    const companyId = this.$route.query.companyId
    console.log('company_id: ' + companyId);
    fetch("http://localhost/api/user/company?companyId=" + companyId, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(res => {

      res.json().then(parsedJson => {
        this.loading = false

        this.originalCompany = parsedJson

        this.form.name = parsedJson.name
        this.form.description = parsedJson.description
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
    edit(e) {
      // Do not send the form
      e.preventDefault();

      this.loading = true

      let bodyData = {}

      if (this.originalCompany.name !== this.form.name) {
        bodyData.name = this.form.name
      }
      if (this.originalCompany.description !== this.form.description) {
        bodyData.description = this.form.description
      }

      const token = this.getCookie('accessToken');
      const companyId = this.$route.query.companyId
      fetch("http://localhost/api/user/company?companyId=" + companyId, {
        method: "PATCH",
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData),
      }).then(res => {
        res.json().then(parsedJson => {
          this.loading = false

          // Redirect the user to company list
          this.$router.push('my-companies');

        })
      })
    }
  }
}
</script>

<style scoped>

</style>