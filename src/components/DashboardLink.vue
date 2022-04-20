<template>
  <span class="dashboard-link">

    <RouterLink v-if="store.isLoggedIn" to="/dashboard">Dashboard</RouterLink>

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
    }
  },
  mounted() {
    console.log('Component dashboard link mounted')
    const accessToken = this.getCookie('accessToken');

    if (accessToken === undefined) {
      this.store.isLoggedIn = false
    } else {
      this.store.isLoggedIn = true
    }
  },
}
</script>

<style scoped>

.dashboard-link {
  border-left: 1px solid var(--color-border);
}

</style>