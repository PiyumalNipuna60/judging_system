<template>
  <NavigationPanel v-if="!isLoginRoute"></NavigationPanel>
  <RouterView />
  <div class="floating-logo-container__zero-chance" v-if="!isLoginRoute">
    <img src="./assets/logo/zero_chnance_logo.png" alt="zero-chance-logo" class="gov_logo" />
  </div>
  <div class="floating-logo-container__gov-logo" v-if="!isLoginRoute">
    <div class="floating-logo-container__aus-gov">
      <img src="./assets/logo/sl_gov_logo.jpg" alt="aus gov logo" class="gov_logo" />
    </div>
    <div class="floating-logo-container__sl-gov">
      <img src="./assets/logo/aus_gov_logo.jpg" alt="aus gov logo" class="gov_logo" />
    </div>
  </div>
</template>
<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import NavigationPanel from './views/component/NavigationPanel.vue'
import { NAVACTIONS } from './const/const'
// import { useUserStore } from './stores/UserStore'
// const { isLoggedUser } = useUserStore()
// const userStore = useUserStore()

const route = useRoute()
const navRoutes = ref(NAVACTIONS)
const isLoginRoute = computed(() => route.name === 'login' || route.path === '/login')

onMounted(() => {
  // const userData = localStorage.getItem('user')
  // if (userData) {
  //   const parsedUser = JSON.parse(userData);
  //   if (parsedUser.userType === 'admin') {
  //     navRoutes.value = navRoutes.value.filter(route => route.user === 'admin')
  //   } else {
  //     navRoutes.value = NAVACTIONS.filter(route => route.user === 'user')
  //   }
  //   console.log('passwed user ', parsedUser);
  //   navRoutes.value.push(...NAVACTIONS.filter(route => route.user === 'common'))
  // }
  // console.log(' logged user__', navRoutes.value);
})
</script>

<style scoped>
.floating-logo-container__zero-chance {
  position: absolute;
  bottom: 0;

  img {
    width: 200px;
  }
}

.floating-logo-container__gov-logo {
  display: flex;
  bottom: 0;
  right: 0;
  position: absolute;

  img {
    width: 155px;
  }
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
