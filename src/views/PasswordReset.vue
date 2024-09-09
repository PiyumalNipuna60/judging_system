<template>
  <section class="user-homepage__container">
    <Toast />
    <section class="homepage-nav-container flex-none flex">
      <div class="homepage-nav-container__logo-container">
        <div class="gov_logo_container">
          <img src="../assets/logo/aus_gov_logo.jpg" alt="aus gov logo" class="gov_logo" />
        </div>
        <div class="gov_logo_container">
          <img src="../assets/logo/sl_gov_logo.png" alt="sl gov logo" class="gov_logo" />
        </div>
      </div>
      <div class="homepage-nav-container__main-container">
        <div v-for="(item, index) in items" :key="index">
          <div @click="navigateToRoute(item.route)" class="homepage-nav-container__item">
            <div class="pr-3">
              <i class="nav-icon" :class="`pi ${item.icon}`"  style="font-size: 1rem"></i>
            </div>
            <div>{{ item.title }}</div>
          </div>
        </div>
      </div>
    </section>
    <section class="homepage-content-container flex-grow-1 flex">
    <div class="pw-reset-container" >
      
        <div class="input-field-container">
          <label for="username" class="font-semibold">New Password</label>
          <InputText
            v-model="userData.newPassword"
            id="mark_02"
            class="flex-auto"
            autocomplete="off"
          />
        </div>
        <div class="input-field-container">
          <label for="username" class="font-semibold">Enter password again</label>
          <InputText
            v-model="userData.newPasswordCheck"
            id="mark_02"
            class="flex-auto"
            autocomplete="off"
          />
        </div>
        <div class="input-field-container">
          <Button type="button" label="Change Password" @click="onChangePassword"></Button>

        </div>
    </div>
    </section>
    <section class="dialogbox-container">
      <Dialog
        v-model:visible="IsDialogVisible"
        modal
        header="OTP Verification"
        :style="{ width: '25rem' }"
      >
        <div class="dialogbox-container__input-field-container">
          <label for="username" class="font-semibold mb-2">Enter OTP sent to your mobile</label>
          <InputText
            v-model="otpNumber"
            id="otp"
            class="flex-auto"
            autocomplete="off"
          />
        </div>

        <div class="flex justify-content-end gap-2">
          <Button type="button" label="Verify OTP" @click="onOTPVerification"></Button>
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="IsDialogVisible = false"
          ></Button>
        </div>
      </Dialog>
    </section>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useHomeStore } from '../stores/HomeStore'
import { useToast } from 'primevue/usetoast'
import { useUserStore } from '../stores/UserStore'

import { useRouter } from 'vue-router'
const router = useRouter()

const userStore = useUserStore()


const toast = useToast()
const homeStore = useHomeStore()

const { markingList, markingLists } = storeToRefs(homeStore)

const IsDialogVisible = ref(false)
const otpNumber = ref(null)
const items = ref([])
const userData = ref([])

onMounted(async () => {
  if (!userStore.isLoggedUser) {
  //  router.push('/login')
  }
  items.value = [
    {
      title: 'Home',
      icon: 'pi-home',
      route: '/'
    },
    {
      title: 'Password reset',
      icon: 'pi-home',
      route: '/password-reset'
    },
    {
      title: 'Logout',
      icon: 'pi-sign-out',
      route: '/login'
    }
  ]

})

const navigateToRoute = (route) => {
  if (route === '/login') {
    userStore.logOut()
  }
  router.push(route)
}

const onChangePassword = async () => {
  IsDialogVisible.value = true
  if (userData.value.newPassword === userData.value.newPasswordCheck) {
    const response = await userStore.sendOTP(userData.value)
  } else {
      toast.add({
        severity: 'error',
        summary: 'Eror',
        detail: 'Passowrds does not match. Enter the same password',
        life: 3000
      })
  }
  // End-point

  // console.log('markings_____________', editableStudentData.value)
}

const onOTPVerification = async () => {
  IsDialogVisible.value = true
  if (userData.value.newPassword === userData.value.newPasswordCheck) {
    await resetPassword()
  } else {
      toast.add({
        severity: 'error',
        summary: 'Eror',
        detail: 'Passowrds does not match. Enter the same password',
        life: 3000
      })
  }
  // End-point

  // console.log('markings_____________', editableStudentData.value)
}


</script>

<style lang="scss">
.user-homepage__container {
  width: 100vw;
  display: flex;
  flex-direction: row;

  .pw-reset-container{
    .input-field-container{
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 25px;

      input, Button {
        width: 18rem;
      }

      label{
        margin-bottom: 10px;

      }
    }
  }

  .homepage-nav-container{
    background: #f8f9fa;
    color: #495057;
    width: 200px;
  }

  .homepage-content-container {
    justify-content: center;
    align-items: center;
  }

  .homepage-nav-container__item :hover {
  }

  .homepage-nav-container__item {
    padding: 7px 0px 7px 20px;
    display: inline-flex;
  }

  .homepage-nav-container__main-container {
    margin-top: 15px;
  }

  .homepage-nav-container__main-container > div:hover {
    font-weight: 700;
        cursor: pointer;
  }
  .nav-icon:hover {
    font-size: 1.2rem;
  }

  .p-dropdown-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .p-dropdown-clear-icon {
    position: absolute;
    top: 50%;
    margin-top: -0.5rem;
  }
  .p-dropdown-label {
    flex: 1 1 auto;
  }

  .p-dropdown-items {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .gov_logo {
    width: 65%;
  }

  .gov_logo_container {
    display: flex;
    justify-content: center;
    margin: 5px;
  }

}

.input-field-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.dialogbox-container__input-field-container{
    display: grid;
    margin-bottom: 20px;
  }
</style>
