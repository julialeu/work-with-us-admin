<template>
  <span class="dashboard-link">

    <RouterLink v-if="store.isLoggedIn" to="/dashboard">Dashboard</RouterLink>

    <RouterLink v-if="!store.isLoggedIn" to="/login">Login</RouterLink>
    <a href="#" v-if="store.isLoggedIn" v-on:click="logout" class="button">Logout</a>

  </span>
</template>

<script>
import { store } from './../store.js'

export default {
  name: "DashboardLink",
  data() {
    return {
      store
    }
  },
  methods: {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
    },
    logout() {
      console.log('Logout');
      this.deleteCookie('accessToken');
      this.$router.push({name: 'login'})
      this.store.isLoggedIn = false
    },
    deleteCookie(name) {
      document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  },
  mounted() {
    console.log('Component dashboard link mounted')
    const accessToken = this.getCookie('accessToken');

    this.store.isLoggedIn = (accessToken !== undefined);
  },
}
</script>

<style scoped>

.dashboard-link {
  border-left: 1px solid var(--color-border);
}

</style>