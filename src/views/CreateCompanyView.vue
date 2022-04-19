<template>

  <div>
    <form>

      <label for="name">* Nombre:</label>&nbsp
      <input v-model="name" type="text" id="name" name="name"><br>

      <label for="description">* Descripción:</label>&nbsp
      <input v-model="description" type="text" id="description" name="description"><br>

      <br>

      <a href="#" @click="submit">!Crear Empresa!</a><br>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreateCompanyView.vue",
  data: function () {
    return {
      name: '',
      description: ''
    }
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
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
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
