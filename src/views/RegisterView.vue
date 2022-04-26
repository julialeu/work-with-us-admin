<template>
<div class="form">
  <form>
    <label for="name">Nombre</label>&nbsp
    <input v-model="name" type="email" id="name" name="name" placeholder="Nombre...">
    <br><br>
    <label for="email">Email</label>&nbsp
    <input v-model="email" type="email" id="email" name="email" placeholder="Email...">
    <br><br>
    <label for="password">Password</label>&nbsp
    <input v-model="password" type="password" id="password" name="password" placeholder="Password..."><br><br>
    <div class="actionButton">
      <a href="#" @click="submit" class="buttonForm">Resgistrarme!</a><br>
    </div>

  </form>
</div>
</template>

<script>
export default {
  name: "RegisterView.vue",
  data: function () {
    return {
      name: "",
      email: "",
      password: ""
    }
  },

  methods : {
    submit: function () {


      let data = {name: this.name,
                  email: this.email,
                  password: this.password};

      fetch("http://localhost/api/auth/register", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }).then(res => {
        let responseStatus = res.status;
        console.log('responseStatus', responseStatus)
        console.log(res)

        if (responseStatus === 400) {
          res.json().then(parsedJson => {
            console.log('parsedJson', parsedJson)
            let errorMessage = parsedJson['errorMessage'];
            alert(errorMessage)
          })
        } else {
          res.json().then(parsedJson => {
            console.log('parsedJson', parsedJson)
            const accessToken = parsedJson['access_token'];
            console.log('access_token', accessToken)

            document.cookie = "accessToken=" + accessToken;

            this.$router.push('dashboard');
          })
        }
      });
      console.log('Register...');
    }
  }
}
</script>

<style scoped>

</style>