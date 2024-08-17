<template>
  <div class="flex">
    <div>
      <p>User Name</p>
      <InputText id="login" type="text" v-model="userName" />
    </div>
    <div>
      <p>Password</p>
      <InputText id="password" type="text" v-model="password" />
    </div>
    <div>
      <Button @click="loginOnAction">Login</Button>
    </div>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import { useRouter } from 'vue-router'

import { ref } from 'vue'

const router = useRouter()
const userName = ref(null)
const password = ref(null)

const loginOnAction = () => {
  console.log('user logged')
  router.push('/')
}
</script>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
