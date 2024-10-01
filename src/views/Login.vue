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
      <div class="loginpage-form-container_sub">
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
            <form>
              <p>Password</p>
              <InputText id="password" type="text" v-model="password" />
            </form>
          </div>
          <div class="mb-3">
            <a class="forget-password-class" @click="loadForgotPassword">Forgot password?</a>
          </div>
          <div class="mb-3 check-box-is-admin">
            <Checkbox v-model="isAdminLogin" :binary="true" />
            <p>Is Admin ?</p>
          </div>
          <div>
            <Button type="button" @click="loginOnAction"  label="Login" :loading="isProcessing" ></Button>
          </div>
        </section>
      </div>
    </section>

    <section class="side-bar-container">
      <Sidebar v-model:visible="visibleRight" header="Password Reset" position="right">
        <div>
          <div class="pw-reset-container">
            <div v-if="!isOtpVerified">
              <div class="input-field-container">
                <label for="username" class="font-semibold">Contact number</label>
                <InputNumber
                v-model="contact"
                class="flex-auto"
                inputId="integeronly"
                :useGrouping="false"
                placeholder="format: 705045099"
                :invalid="isContactInvalid"
                />
                <label v-if="isContactInvalid" for="contact" class="contact-error-label"
                >Contact number length invalid. format: 705045099</label
                >
              </div>
              <div class="button-container">
                <Button
                type="button"
                :disabled="isContactInvalid"
                label="Send OTP"
                @click="sendOtpVerificationCode"
                ></Button>
              </div>
            </div>
            <div v-if="isOtpVerified">
              <div class="input-field-container">
                <label for="username" class="font-semibold">New Password</label>
                <InputText
                  v-model="userData.newPassword"
                  id="mark_02"
                  class="flex-auto"
                  autocomplete="off"
                  :invalid="isPasswordInvalid"
                  @blur="onConfirmPasswordBlur"
                />
                <label v-if="isPasswordInvalid" for="contact" class="contact-error-label"
                  >Password must be same</label
                >
              </div>
              <div class="input-field-container">
                <label for="username" class="font-semibold">Enter password again</label>
                <InputText
                  v-model="userData.newPasswordCheck"
                  id="mark_02"
                  class="flex-auto"
                  autocomplete="off"
                  :invalid="isPasswordInvalid"
                  @blur="onConfirmPasswordBlur"
                />
                <label v-if="isPasswordInvalid" for="contact" class="contact-error-label">Password must be same</label>
              </div>
              <div class="button-container">
                <Button
                  type="button"
                  label="Change Password"
                  :disabled="isButtonDisabled"
                  @click="onChangePassword"
                ></Button>
                <Button
                  @click="cancelConfirmation($event)"
                  label="Cancle"
                  class="cancle-button"
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
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
          <InputNumber v-model="otpNumber" :useGrouping="false" id="otp" class="flex-auto" autocomplete="off" />
        </div>

        <div class="flex justify-content-end gap-2">
          <Button type="button" label="Verify OTP" @click="onOTPVerification"></Button>
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="onDialogClose"
          ></Button>
        </div>
      </Dialog>
    </section>
    <section class="dialogbox-container">

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
const isPasswordInvalid = ref(false)
const isAdminLogin = ref(false)
const userData = ref({
  newPassword: null,
  newPasswordCheck: null
})
const IsDialogVisible = ref(false)
const isOtpVerified = ref(false)
const otpNumber = ref()
const contact = ref(null)
const isProcessing = ref(false)

const sendOtpVerificationCode = async () => {
  try {
    await userStore.sendOTP(contact.value)
    toast.add({
      severity: 'info',
      summary: 'Info',
      detail: 'OTP send successfully!',
      life: 3000
    })
    IsDialogVisible.value = true
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Eror',
      detail: error,
      life: 3000
    })
  }
}

const onOTPVerification = async () => {
  try {    
    if (otpNumber.value.toString().length === 4) {
      await userStore.verifyOtp(otpNumber.value, contact.value)
      toast.add({
        severity: 'info',
        summary: 'Info',
        detail: 'OTP verified successfully!',
        life: 3000
      })
      
    } else {
      toast.add({
        severity: 'error',
        summary: 'Eror',
        detail: 'OTP length is invalid. Enter 4 digit code.',
        life: 3000
      })
    }
    IsDialogVisible.value = false
    isOtpVerified.value = true
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Eror',
      detail: 'Something wrong with password verification.',
      life: 3000
    })
  }
}

onMounted(() => {
  // const loggedUser = localStorage.getItem('user')
  // console.log('logged user __________', loggedUser);
  // if (loggedUser) {
  //   userStore.setUserData(JSON.parse(loggedUser))
  //   console.log('logged user __________', loggedUser);
    
  //   router.push('/')
  // }
})

watch(
  () => contact.value,
  (newContact) => {
    if (newContact && newContact.toString().length === 9) {
      isContactInvalid.value = false
      isButtonDisabled.value = false
    } else {
      isContactInvalid.value = true
      isButtonDisabled.value = true
    }
  }
)

const loginOnAction = async () => {
  isProcessing.value = true
  try {
    if (isAdminLogin.value) {
      await userStore.adminLogin(userName.value, password.value)
      router.push('/dashboard')
    } else {
      await userStore.userLogin(userName.value, password.value)
      router.push('/')
    }
    isProcessing.value  = false
    router.push('/')
  } catch (error) {
    isProcessing.value  = false
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
}
const onChangePassword = async () => {
  try {
    await userStore.changePassword(userData.value.newPassword, contact.value)
    toast.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Password changes successfully!.',
      life: 3000
    })
    visibleRight.value = false
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Username or Password invalid.',
      life: 3000
    })
  }
}

const onConfirmPasswordBlur = async () => {
  if (
    userData.value.newPassword &&
    userData.value.newPasswordCheck &&
    userData.value.newPassword !== userData.value.newPasswordCheck
  ) {
    isPasswordInvalid.value = true
    isButtonDisabled.value = true
  } else {
    isPasswordInvalid.value = false
    isButtonDisabled.value = false
  }
}

const cancelConfirmation = (event) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Your data will be lost. Are you sure, you want to cancle?',
    icon: 'pi pi-info-circle',
    rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
    acceptClass: 'p-button-danger p-button-sm',
    rejectLabel: 'No',
    acceptLabel: 'Yes',
    accept: () => {
      visibleRight.value = false
      userData.value = {
        newPassword: null,
        newPasswordCheck: null
      }
      toast.add({
        severity: 'error',
        summary: 'Confirmed',
        detail: 'Password reset cancled',
        life: 3000
      })
    }
  })
}

const onDialogClose = () => {
  otpNumber.value = null
}
</script>

<style scoped>
#app {
  margin: auto;
}
.login-page__main-container {
  width: 100vw;
  justify-content: center;
  flex-direction: row;
  height: 100vh;

  .check-box-is-admin {
    display: flex;
    flex-direction: row;

    > p {
      margin: 0;
      margin-left: 10px;
    }
  }

  .loginpage-logo-container,
  .loginpage-form-container {
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

.p-inputtext,
.p-inputnumber {
  width: 100%;
}

.contact-error-label {
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
