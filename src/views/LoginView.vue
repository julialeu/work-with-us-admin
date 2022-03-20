<template>
<div>
  <form>
    <label for="email">Email</label>&nbsp
    <input v-model="email" type="email" id="email" name="email" placeholder="Email...">
    <br><br>
    <label for="password">Password</label>&nbsp
    <input v-model="password" type="password" id="password" name="password" placeholder="Password..."><br>
    <a href="#" @click="submit">Login</a><br>
    <RouterLink to="/register">¿No tienes usuario? Regístrate!</RouterLink>


  </form>
</div>
</template>

<script>
export default {
  name: "LoginView.vue",
  data: function () {
    return {
      email: "",
      password: ""
    }
  },

  methods : {
    submit: function () {

      let data = {
        email: this.email,
        password: this.password
      };

      fetch("http://localhost/api/auth/login", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }).then(res => {
        res.json().then(parsedJson => {
          const accessToken = parsedJson['access_token'];
          document.cookie = "accessToken=" + accessToken;
          this.$router.push('dashboard');
        })
      });

      console.log('Submit...');
    }
  }

}
</script>

<style scoped>

</style>