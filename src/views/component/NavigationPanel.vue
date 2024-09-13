<template>
  <section class="nav-container flex-none flex">
    <div class="nav-container__logo-container">
      <div class="main-logo_container">
        <img src="../../assets/logo/main_logo.jpg" alt="main-logo" class="main-logo" />
      </div>
    </div>
    <div class="nav-container__main-container">
      <div v-for="(item, index) in navRoutes" :key="index">
        <div @click="navigateToRoute(item.route)" class="nav-container__item">
          <div class="pr-3">
            <i :class="`pi ${item.icon}`" class="nav-icon" style="font-size: 1rem"></i>
          </div>
          <div>{{ item.title }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import router from '@/router'
import { onMounted, ref } from 'vue'
import { useUserStore } from '../../stores/UserStore'

const userStore = useUserStore()
const navRoutes = ref([])

onMounted(() => {
  navRoutes.value = userStore.getNavigationList()
})

const navigateToRoute = (route) => {
  if (route === '/login') {
    logout()
  }
  router.push(route)
}

const logout = () => {
  userStore.logOut()
}
</script>

<style lang="scss">
.nav-container {
  background: #f8f9fa;
  color: #495057;
  width: 200px;
  border-right: 2px solid #aeb6bdab;

  .nav-container__main-container {
    margin-top: 15px;
  }

  .nav-container__main-container > div:hover {
    font-weight: 700;
    cursor: pointer;

    .nav-icon {
      font-size: 1.1rem !important;
    }
  }

  .main-logo_container {
    display: flex;
    justify-content: center;
    margin: 5px;
  }

  .nav-container__item {
    padding: 7px 0px 7px 20px;
    display: inline-flex;
  }

  .main-logo {
    width: 65%;
  }
}
</style>
