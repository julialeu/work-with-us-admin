<template>
  <div>
    <h1>Editar Empresa</h1>

    <form>
      <label for="name">* Nombre:</label><br>
      <input type="text" readonly disabled id="name" name="name" v-model="form.name"><br>

<!--      <label for="description">* Descripción:</label><br>-->
<!--      <textarea type="text" id="description" name="description" v-model="form.description"></textarea><br>-->

      <div>
        <label>Descripción</label>&nbsp
        <div id="pell" class="pell"/>
      </div>


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
import { getCookieService } from './../services/GetCookie.js'
import pell from 'pell'


export default {
  name: "EditCompanyView.vue",
  mixins: [getCookieService],

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

    const companyId = this.$route.query.companyId
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

        this.pellEditor.content.innerHTML = parsedJson.description


      })
    })
  },

  methods: {
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
          this.$router.push('/my-companies');

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