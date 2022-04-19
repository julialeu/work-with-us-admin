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
    <bounce-loader :loading="loading" :color="color" :size="size" style="float:left"></bounce-loader>

  </form>
</div>
</template>

<script>
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'

export default {
  name: "LoginView.vue",
  data: function () {
    return {
      email: "",
      password: "",
      color: '#53b883',
      color1: '#5bc0de',
      size: '45px',
      margin: '2px',
      radius: '2px',
      loading: false
    }
  },
  components: {
    BounceLoader
  },
  methods : {
    submit: function () {
      this.loading = true

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
          this.loading = false

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