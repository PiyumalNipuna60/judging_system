<template>
  <div class="login-page__main-container flex">
    <Toast />
    <ConfirmPopup></ConfirmPopup>

    <section class="loginpage-logo-container">
      <div class="loginpage-nav-container">
        <div class="gov_logo_container">
          <img src="../assets/logo/aus_gov_logo.jpg" alt="aus gov logo" class="gov_logo" />
        </div>
        <div class="gov_logo_container">
          <img src="../assets/logo/sl_gov_logo.jpg" alt="sl gov logo" class="gov_logo" />
        </div>
      </div>
    </section>
    <Divider layout="vertical" />

    <section class="loginpage-form-container">
      <div class="loginpage-form-container_sub" >
        <section class="loginpage-nav-container flex-none flex">
          <div class="loginpage-nav-container__logo-container">
            <div class="gov_logo_container">
              <img src="../assets/logo/zero_chnance_logo.png" alt="aus gov logo" class="gov_logo" />
            </div>
          </div>
        </section>
        <section>
          <div>
            <p>User Name</p>
            <InputText id="login" type="text" v-model="userName" />
          </div>
          <div class="mb-3">
            <p>Password</p>
            <InputText id="password" type="text" v-model="password" />
          </div>
          <div class="mb-3">
            <a class="forget-password-class" @click="loadForgotPassword">Forgot password?</a>
          </div>
          <div>
            <Button type="button" @click="loginOnAction">Login</Button>
          </div>
        </section>
      </div>
    </section>

    <section class="side-bar-container">
      <Sidebar v-model:visible="visibleRight" header="Password Reset" position="right">
        <div>
          <div class="pw-reset-container">
            <div class="input-field-container">
              <label for="username" class="font-semibold">Contact number</label>
              <InputNumber
                v-model="userData.contact"
                class="flex-auto"
                inputId="integeronly"
                :useGrouping="false"
                placeholder="format: 705045099"
                :invalid="isContactInvalid"
              />
              <label v-if="isContactInvalid"  for="contact" class="contact-error-label">Contact number length invalid. format: 705045099</label>

            </div>
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
            <div class="button-container">
              <Button type="button" label="Change Password" :disabled="isButtonDisabled" @click="onChangePassword"></Button>
              <Button
                @click="cancelConfirmation($event)"
                label="Cancle"
                class="cancle-button"
              ></Button>
            </div>
          </div>
        </div>
      </Sidebar>
    </section>
    <section class="dialogbox-container">
      <!-- <Dialog
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
      </Dialog> -->
    </section>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useUserStore } from '../stores/UserStore'
import { onMounted, ref, watch } from 'vue'
import { useConfirm } from 'primevue/useconfirm'

const confirm = useConfirm()
const userStore = useUserStore()
const toast = useToast()
const router = useRouter()

const userName = ref(null)
const password = ref(null)
const visibleRight = ref(false)
const isButtonDisabled = ref(true)
const isContactInvalid = ref(false)
const userData = ref({
  contact: null,
  newPassword: null,
  newPasswordCheck: null
})

onMounted(() => {
  const loggedUser = localStorage.getItem('user')
  if (loggedUser) {
    userStore.setUserData(JSON.parse(loggedUser))
    router.push('/')
  }
})

watch(() => userData.value.contact, ( newContact) => {  
  if (newContact && newContact.toString().length === 9) {
    isContactInvalid.value = false
    isButtonDisabled.value = false
  } else {
    isContactInvalid.value = true
    isButtonDisabled.value = true
  }

})
const loginOnAction = async () => {
  console.log('user logged')
  try {
    await userStore.login(userName.value, password.value)
    router.push('/')
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Username or Password invalid.',
      life: 3000
    })
  }
}

const loadForgotPassword = async () => {
  visibleRight.value = true
  // console.log('user logged')
  // try {
  //   await userStore.login(userName.value, password.value)
  //   router.push('/')
  // } catch (error) {
  //   toast.add({
  //     severity: 'error',
  //     summary: 'Error',
  //     detail: 'Username or Password invalid.',
  //     life: 3000
  //   })
  // }
}
const onChangePassword = async () => {}

const cancelConfirmation = (event) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Are you sure, you want to cancle?',
    icon: 'pi pi-info-circle',
    rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
    acceptClass: 'p-button-danger p-button-sm',
    rejectLabel: 'No',
    acceptLabel: 'Yes',
    accept: () => {
      visibleRight.value = false
      userData.value = {
    contact: null,
    newPassword: null,
    newPasswordCheck: null
  }
      toast.add({ severity: 'error', summary: 'Confirmed', detail: 'Record deleted', life: 3000 })
    }
  })
}
</script>

<style scoped>
#app{
  margin: auto;
}
.login-page__main-container {
  width: 100vw;
    justify-content: center;
    flex-direction: row;
    height: 100vh;

  .loginpage-logo-container, .loginpage-form-container {
    display: flex;
    align-items: center;
  }

  .forget-password-class {
    color: #0d89ec;
  }
  .forget-password-class:hover {
    cursor: pointer;
    color: #2e01f6cc;
  }

  .p-divider-vertical {
    min-height: 69%;
    margin: 0px 100px;
  }

  .p-button {
    width: 100%;
    justify-content: space-evenly;
  }

  .loginpage-nav-container {
    color: rgb(217, 209, 209);
    width: 300px;
  }

  .gov_logo {
    width: 84%;
  }

  .gov_logo_container {
    display: flex;
    justify-content: center;
    margin: 5px;
  }

  .loginpage-nav-container__item :hover {
  }

  .loginpage-nav-container__item {
    padding: 7px 0px 7px 20px;
    display: inline-flex;
  }

  .loginpage-nav-container__main-container {
    margin-top: 15px;
  }

  .loginpage-nav-container__main-container > div:hover {
    background: grey;
    cursor: pointer;
  }
}

.p-inputtext, .p-inputnumber {
    width: 100%;
  }

.contact-error-label{
    color: #ec0d0d;
  }

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}

.cancle-button {
  margin-left: 10px;
  background: white;
  color: darkgray;
  border: 0;
}

.cancle-button:hover {
  background: rgb(208, 207, 207);
  color: rgb(121, 121, 121);
  border: 0;
}
</style>
