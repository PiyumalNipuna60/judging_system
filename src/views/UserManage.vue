<template>
  <section class="user-dashboard__container">
    <Toast />
    <section class="dashboard-nav-container flex-none flex">
      <div class="dashboard-nav-container__logo-container">
        <div class="gov_logo_container">
          <img src="../assets/logo/aus_gov_logo.jpg" alt="aus gov logo" class="gov_logo" />
        </div>
        <div class="gov_logo_container">
          <img src="../assets/logo/sl_gov_logo.png" alt="sl gov logo" class="gov_logo" />
        </div>
      </div>
      <div class="dashboard-nav-container__main-container">
        <div v-for="(item, index) in items" :key="index">
          <div @click="navigateToRoute(item.route)" class="dashboard-nav-container__item">
            <div class="pr-3"><i :class="`pi ${item.icon}`" style="font-size: 1rem"></i></div>
            <div>{{ item.title }}</div>
          </div>
        </div>
      </div>
    </section>
    <section class="dashboard-content-container flex flex-grow-1">
      <div class="dashboard-content-container__title-section">
        <p>
          All created user details of teachers will be display here. You can add new teachers by
          this add user button.
        </p>
        <div class="dashboard-content-container__button-section">
          <Button icon="pi pi-plus" type="button" label="Add New User" @click="addNewUser"></Button>
        </div>
      </div>
      <Divider type="solid" />

      <div>
        <DataTable
          ref="dataTable"
          v-model:selection="selecteUser"
          :value="usersList"
          :highlightOnSelect="false"
          tableStyle="min-width: 50rem"
          paginator
          :rows="10"
          :rowsPerPageOptions="[10, 20, 50]"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          selectionMode="single"
          dataKey="id"
          @rowClick="onRowSelect"
          @Blur="onBlurSelect"
          @row-unselect="onUnSelect"
        >
          <Column field="userName" header="User Name"></Column>
          <Column field="password" header="Password"></Column>
          <Column field="availableDistricts" header="Districts">
            <template #body="{ data }">
              {{ data.availableDistricts.join(', ') }}
            </template>
          </Column>
          <Column field="language" header="Language"></Column>
          <Column field="stream" header="Stream"></Column>
          <Column header="Action">
            <template #body="{ data }">
              <Button type="button" label="Remove" @click="removeUser(data)"></Button>
            </template>
          </Column>
        </DataTable>
      </div>
    </section>
    <section>
      <Sidebar v-model:visible="visibleRight" header="Create user" position="right">
        <div class="input-field-container">
          <label for="username" class="font-semibold">User name</label>
          <InputText
            v-model="userData.userName"
            id="mark_01"
            class="flex-auto"
            autocomplete="off"
          />
        </div>
        <div class="input-field-container">
          <label for="username" class="font-semibold">Password</label>
          <InputText
            v-model="userData.password"
            id="mark_02"
            class="flex-auto"
            autocomplete="off"
          />
        </div>
        <div class="input-field-container">
          <label for="username" class="font-semibold">Available districts</label>
          <MultiSelect
            v-model="userData.availableDistricts"
            filter
            display="chip"
            :options="districts"
            placeholder="Select Cities"
            :maxSelectedLabels="4"
            class="district-dropdown-container w-full md:w-20rem"
          />
          <div class="tag-div-container gap-2 px-1">
            <Tag v-for="district in userData.availableDistricts" :key="district" value="Info">
              <div class="flex align-items-center tag-div">
                <span class="text-base">{{ district }}</span>
              </div>
            </Tag>
          </div>
        </div>
        <div class="input-field-container">
          <label for="username" class="font-semibold">Language</label>
          <div class="flex flex-row flex-wrap gap-3">
            <div class="flex align-items-center">
              <RadioButton v-model="userData.language" inputId="ingredient1" value="Sinhala" />
              <label for="language1" class="ml-2">Sinhala</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton v-model="userData.language" inputId="ingredient2" value="Tamil" />
              <label for="language2" class="ml-2">Tamil</label>
            </div>
          </div>
        </div>
        <div class="input-field-container">
          <label for="username" class="font-semibold">Stream</label>
          <Dropdown v-model="userData.stream" :options="streamList" placeholder="Select a Stream" class="w-full md:w-14rem" />
        </div>
        <div class="button-setion">
          <Button type="button" label="Save" @click="saveUserDetails"></Button>
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="IsDialogVisible = false"
          ></Button>
        </div>
        <template #footer>
          <Button type="button" label="Save" @click="saveUserDetails"></Button>
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="IsDialogVisible = false"
          ></Button>
        </template>
      </Sidebar>
    </section>
  </section>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { useUserStore } from '../stores/UserStore'

const userStore = useUserStore()
const toast = useToast()

const selecteUser = ref(null)
const dataTable = ref()
const userData = ref({
  userName: null,
  password: null,
  availableDistricts: null,
  language: null,
  stream: null
})
const districts = [
  'Colombo',
  'Galle',
  'Gampaha',
  'Kalutara',
  'Kandy',
  'Matale',
  'Nuwara Eliya',
  'Gampaha',
  'Hambantota',
  'Kalutara',
  'Jaffna',
  'Kilinochchi',
  'Mannar',
  'Mullaitivu',
  'Vavuniya',
  'Ampara',
  'Batticaloa',
  'Trincomalee',
  'Anuradhapura',
  'Polonnaruwa',
  'Kurunegala',
  'Puttalam',
  'Badulla',
  'Monaragala',
  'Ratnapura'
]
const visibleRight = ref(false)
const usersList = ref([])
const { markingList, markingLists } = storeToRefs(userStore)

const items = ref([])
const streamList = ref(['Essay', 'Art'])

const navigateToRoute = (route) => {
  if (route === '/login') {
    logout()
  }
  router.push(route)
}
onMounted(async () => {
  items.value = [
    {
      title: 'Dashboard',
      icon: 'pi-home',
      route: '/dashboard'
    },
    {
      title: 'Create User',
      icon: 'pi-user',
      route: '/manage-user'
    },
    {
      title: 'Logout',
      icon: 'pi-sign-out',
      route: '/login'
    }
  ]
  usersList.value = await userStore.getUserLists()
})

const saveUserDetails = async () => {
  try {
    const response = await userStore.saveUser(userData.value)
    if (response === 'success') {
      toast.add({
        severity: 'info',
        summary: 'Success',
        detail: 'User deleted succesfully',
        life: 3000
      })
    }
  } catch (error) {
    toast.add({
      severity: 'info',
      summary: 'Info',
      detail: 'student marks added succesfully',
      life: 3000
    })
  }
  console.log('remove user ')
}

const removeUser = async (param) => {
  try {
    const response = await userStore.deleteUser(param?.id)
    if (response === 'success') {
      toast.add({
        severity: 'info',
        summary: 'Success',
        detail: 'User deleted succesfully',
        life: 3000
      })
    }
  } catch (error) {
    toast.add({
      severity: 'info',
      summary: 'Info',
      detail: 'student marks added succesfully',
      life: 3000
    })
  }
  console.log('remove user ', param)
}

const addNewUser = async () => {
  userData.value = {
    userName: null,
    password: null,
    availableDistricts: null,
    language: null,
    stream: null
  }
  visibleRight.value = !visibleRight.value
}

const onRowSelect = (param) => {
  visibleRight.value = !visibleRight.value
  userData.value = param?.data
  // dataTable.value.blur()

  console.log('param log __________', param)
}

const onBlurSelect = (param) => {
 
  console.log('param log ______ss____', param)
}
const onUnSelect = (param) => {
 
  console.log('param log ______suns____', param)
}
</script>
<style lang="scss">
.user-dashboard__container {
  width: 100vw;
  display: flex;
  flex-direction: row;

  .p-divider-horizontal{
    width: 77%;
  }

  .p-datatable-tbody > tr.p-highlight {
    background: #ffffff;
  }

  .dashboard-content-container {
    justify-content: center;
    align-items: center;
  }

  .dashboard-content-container__title-section {
    min-width: 59rem;
    margin-bottom: 15px;
  }

  .dashboard-content-container__button-section {
    display: flex;
    justify-content: flex-end;
  }

  .dashboard-nav-container {
    background: #1e1e1e;
    color: rgb(217, 209, 209);
    width: 200px;
  }

  .dashboard-nav-container__item :hover {
  }

  .dashboard-nav-container__item {
    padding: 7px 0px 7px 20px;
    display: inline-flex;
  }

  .dashboard-nav-container__main-container {
    margin-top: 15px;
  }

  .dashboard-nav-container__main-container > div:hover {
    background: grey;
    cursor: pointer;
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

  .dashboard-content-container_dropdown {
    padding: 10px;
  }

  .p-datatable-wrapper{
    height: 550px;
  }
}

.input-field-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.p-sidebar {
  width: 27rem;

  .input-field-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;

    input {
      width: 100%;
    }
  }

  .button-setion {
    position: absolute;
    bottom: 0;
    width: 100%;
    justify-content: space-evenly;
    display: flex;
    margin-bottom: 10px;

    .p-button {
      width: 160px;
    }
  }

  .district-dropdown-container {
    margin-bottom: 7px;
  }

  .tag-div {
    font-weight: 500;
  }

  .p-tag {
    background: var(--blue-100);
    color: var(--blue-700);
    margin: 0px 5px 5px 0px;
  }

  .input-field-container label {
    margin-bottom: 10px;
  }

  .p-multiselect-token {
    padding: 0.25rem 0.5rem;
    margin-right: 0.5rem;
    background: #dee2e6;
    color: #495057;
    border-radius: 4px;
  }
}
</style>
