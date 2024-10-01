<template>
  <section class="user-dashboard__container">
    <Toast />
    <section class="dashboard-content-container flex-grow-1">
      <h2>USER CREATION</h2>
      <!-- <Divider /> -->
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

      <div v-if="!processing">
        <DataTable
          ref="dataTable"
          v-model:selection="selecteUser"
          :value="usersList"
          :highlightOnSelect="false"
          tableStyle="min-width: 40rem"
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
          <Column field="user_name" header="User Name" style="width: 15%"></Column>
          <Column field="contact" header="Contact" style="width: 15%"></Column>
          <Column field="availableDistricts" header="Districts" style="width: 30%">
            <template #body="{ data }">
              <div class="district-chip-container">
                <div v-for="obj in data.district_details" :key="obj.district_id">
                  {{ districts.find((dis) => dis.id === obj.district_id).name }}
                </div>
              </div>
            </template>
          </Column>
          <Column field="language" header="Language" style="width: 15%">
            <template #body="slotProps">
              {{ slotProps.data.language !== null ? slotProps.data.language : '--' }}
            </template>
          </Column>
          <Column field="stream" header="Stream" style="width: 15%"></Column>
          <Column header="Action" style="width: 10%">
            <template #body="{ data }">
              <Button type="button" label="Remove" @click="removeUser(data)"></Button>
            </template>
          </Column>
        </DataTable>
      </div>
      <div v-else>
        <DataTable :value="skelatonArray">
            <Column header="User Name">
                <template #body>
                    <Skeleton></Skeleton>
                </template>
            </Column>
            <Column header="Contact">
                <template #body>
                    <Skeleton></Skeleton>
                </template>
            </Column>
            <Column header="Districts" >
                <template #body>
                    <Skeleton></Skeleton>
                </template>
            </Column>
            <Column header="Language" >
                <template #body>
                    <Skeleton></Skeleton>
                </template>
            </Column>
            <Column header="Stream" >
                <template #body>
                    <Skeleton></Skeleton>
                </template>
            </Column>
            <Column header="Action" >
                <template #body>
                    <Skeleton></Skeleton>
                </template>
            </Column>
        </DataTable>
      </div>
    </section>
    <section>
      <Sidebar
        v-model:visible="visibleRight"
        header="Create user"
        position="right"
        @hide="isUserUpdating = false"
      >
        <div class="input-field-container">
          <label for="username" class="font-semibold">Contact number</label>
          <InputNumber
            v-model="userData.contact"
            class="flex-auto"
            inputId="integeronly"
            :useGrouping="false"
            placeholder="format: 705045099"
            :invalid="isContactInvalid"
            :disabled="isUserUpdating"
          />
          <label v-if="isContactInvalid" for="contact" class="contact-error-label"
            >Contact number length invalid. format: 705045099</label
          >
        </div>
        <div class="input-field-container">
          <label for="username" class="font-semibold">User name</label>
          <InputText
            v-model="userData.userName"
            :disabled="isUserUpdating"
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
            :disabled="isUserUpdating"
          />
        </div>
        <div class="input-field-container">
          <label for="username" class="font-semibold">Available districts</label>
          <div class="tag-div-container gap-2 px-1">
            <Tag v-for="district in userData.availableDistricts" :key="district" value="Info">
              <div class="flex align-items-center tag-div">
                <span class="text-base">{{ districts[district - 1]?.name }}</span>
              </div>
            </Tag>
          </div>
          <MultiSelect
            v-model="userData.availableDistricts"
            filter
            display="chip"
            :options="districts"
            optionLabel="name"
            optionValue="id"
            placeholder="Select Cities"
            :maxSelectedLabels="4"
            class="district-dropdown-container w-full md:w-20rem"
          />
        </div>
        <div class="input-field-container">
          <label for="username" class="font-semibold">Stream</label>
          <Dropdown
            v-model="userData.stream"
            :options="streamList"
            placeholder="Select a Stream"
            class="w-full md:w-14rem"
            @change="onStreamSelect"
          />
        </div>
        <div class="input-field-container" v-if="isEssaySelected">
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
        <div class="button-setion">
          <Button
            type="button"
            :label="isUserUpdating ? 'Update' : 'Save'"
            @click="saveUserDetails"
            :disabled="isButtonDisabled"
          ></Button>
          <Button type="button" label="Cancel" severity="secondary" @click="onClear"></Button>
        </div>
      </Sidebar>
    </section>
  </section>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useUserStore } from '../stores/UserStore'
import { DISTRICTS } from '@/const/const'
import Skeleton from 'primevue/skeleton';

const userStore = useUserStore()
const toast = useToast()

const selecteUser = ref(null)
const dataTable = ref()
const districts = ref(DISTRICTS)
const visibleRight = ref(false)
const usersList = ref([])
const isEssaySelected = ref(false)
const isContactInvalid = ref(false)
const isButtonDisabled = ref(true)
const streamList = ref(['Essay', 'Art'])
const isUserUpdating = ref(false)
const processing = ref(false)
const skelatonArray = ref(new Array(4));
const userData = ref({
  contact: null,
  userName: null,
  password: null,
  availableDistricts: [],
  language: null,
  stream: null
})

onMounted(async () => {
  processing.value = true
  usersList.value = await userStore.getUserLists()
  processing.value = false
})

watch(
  () => userData.value.contact,
  (newContact) => {
    if (newContact) {
      if (newContact.toString().length === 9) {
        isContactInvalid.value = false
        isButtonDisabled.value = false
      } else {
        isContactInvalid.value = true
        isButtonDisabled.value = true
      }
    }
  }
)

const saveUserDetails = async () => {
  try {
    processing.value = true
    if (isUserUpdating.value) {
      await userStore.updateUser(userData.value)
    } else {
      await userStore.saveUser(userData.value)
    }
    usersList.value = await userStore.getUserLists()
    toast.add({
      severity: 'info',
      summary: 'Success',
      detail: 'User saved succesfully!',
      life: 3000
    })
    onClear()
  } catch (error) {
    if (error.status === 422) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Contact number cannot be duplicated!',
        life: 3000
      })
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Something went wrong!',
        life: 3000
      })
    }
  }
  processing.value = false
}

const removeUser = async (param) => {
  try {
    processing.value = true
    const response = await userStore.deleteUser(param?.teacher_id)
    usersList.value = await userStore.getUserLists()    
    if (response) {
      toast.add({
        severity: 'info',
        summary: 'Success',
        detail: 'User deleted succesfully',
        life: 3000
      })
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Something went wrong!',
      life: 3000
    })
  }
  processing.value = false
}

const addNewUser = async () => {
  clearUserData()
  visibleRight.value = !visibleRight.value
}

const onRowSelect = (param) => {
  isUserUpdating.value = true
  visibleRight.value = !visibleRight.value
  userData.value = param?.data
  userData.value.userName = param?.data.user_name
  userData.value.availableDistricts = param?.data.district_details.map((item) => item.district_id)
  if (param.data.stream === 'Essay') {
    isEssaySelected.value = true
  } else {
    isEssaySelected.value = false
  }
}

const onBlurSelect = (param) => {
  console.log('param log ______ss____', param)
}
const onUnSelect = (param) => {
  console.log('param log ______suns____', param)
}

const onStreamSelect = async (event) => {
  if (event.value === 'Essay') {
    isEssaySelected.value = true
  } else {
    isEssaySelected.value = false
    if (userData.value.language) {
      userData.value.language = null
    }
  }
}

const onClear = () => {
  clearUserData()
  isUserUpdating.value = false
  visibleRight.value = false
}

const clearUserData = () => {
  userData.value = {
    userName: null,
    contact: null,
    password: null,
    availableDistricts: [],
    language: null,
    stream: null
  }
}
</script>
<style lang="scss">
.user-dashboard__container {
  flex-grow: 1;
  display: flex;
  flex-direction: row;

  .district-chip-container {
    display: flex;
    flex-direction: row;

    > div {
      background: #7cbdffa1;
      margin: 2px;
      padding: 2px 6px;
      border-radius: 3px;
    }
  }

  .p-datatable-tbody > tr.p-highlight {
    background: #ffffff;
  }

  .dashboard-content-container {
    padding: 10px;
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

  .dashboard-content-container_dropdown {
    padding: 10px;
  }

  .p-datatable-wrapper {
    height: 485px;
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
    margin-top: 5px;
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

.p-inputnumber {
  width: 100%;
}

.contact-error-label {
  color: #ec0d0d;
}
</style>
