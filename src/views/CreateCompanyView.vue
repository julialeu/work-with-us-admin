<template>

  <div class="form">

    <fieldset>
      <h1>Crear empresa</h1>
      <form>
        <label for="name">Nombre:</label>&nbsp
        <input v-model="name" type="text" id="name" name="name"><br>

        <div>
          <label>Descripción</label>&nbsp
          <div id="pell" class="pell"/>
        </div>

        <br>
        <div class="actionButton">
          <a href="#" @click="submit" class="buttonForm">Crear Empresa</a><br>
        </div>
      </form>
    </fieldset>

  </div>
</template>

<script>
import { getCookieService } from './../services/GetCookie.js'
import pell from 'pell'

export default {
  name: "CreateCompanyView.vue",
  mixins: [getCookieService],

  data: function () {
    return {
      name: '',
      description: ''
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

  },
  methods: {
    submit: function () {

      if (this.isFormIncomplete()) {
        alert('Rellena todos los campos obligatorios')
        return;
      }

      let data = {
        name: this.name,
        description: this.description
      };

      const token = this.getCookie('accessToken');

      fetch("http://localhost/api/user/company", {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => {
        res.json().then(parsedJson => {

          // Redirect the user to company list
          this.$router.push('my-companies');
        })
      })
    },

    isFormIncomplete() {
      if (this.name === '' || this.description === '') {
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
