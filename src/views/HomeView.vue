<template>
  <section class="user-homepage__container">
    <Toast />
    <section class="homepage-content-container flex-grow-1">
      <h2>HOME PAGE</h2>
      <Divider />
      <div class="flex flex-row">
        <div class="homepage-content-container_dropdown">
          <Dropdown
            v-model="selectedDistrict"
            :options="districts"
            showClear
            placeholder="Select a District"
            class="w-full md:w-14rem flex flex-row relative"
            @change="onDropdownChange"
          />
        </div>
        <div class="homepage-content-container_dropdown">
          <Dropdown
            v-model="selectedAgeGroup"
            :options="ageGroups"
            showClear
            placeholder="Select an Age Group"
            class="w-full md:w-14rem flex flex-row relative"
            @change="onDropdownChange"
          />
        </div>
      </div>
      <div>
        <DataTable
          ref="dataTable"
          v-model:selection="selectedudent"
          :value="markingListArt"
          tableStyle="min-width: 50rem"
          paginator
          :rows="10"
          :rowsPerPageOptions="[10, 20, 50]"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          selectionMode="single"
          dataKey="id"
          @rowClick="onRowSelect"
          @rowUnSelect="onRowSelect"
        >
          <Column field="serialNumber" header="Serial Number"></Column>
          <Column field="mark_01" header="Mark 01">
            <template #body="slotProps">
              {{ slotProps.data.mark_01 ? slotProps.data.mark_01 : '--' }}
            </template>
          </Column>
          <Column field="mark_02" header="Mark 02">
            <template #body="slotProps">
              {{ slotProps.data.mark_02 ? slotProps.data.mark_02 : '--' }}
            </template>
          </Column>
          <Column field="mark_03" header="Mark 03">
            <template #body="slotProps">
              {{ slotProps.data.mark_03 ? slotProps.data.mark_03 : '--' }}
            </template>
          </Column>
          <Column field="mark_04" header="Mark 04">
            <template #body="slotProps">
              {{ slotProps.data.mark_04 ? slotProps.data.mark_04 : '--' }}
            </template>
          </Column>
          <Column v-if="getLoggedUser.stream !== 'Essay'" field="mark_05" header="Mark 05">
            <template #body="slotProps">
              {{ slotProps.data.mark_05 ? slotProps.data.mark_05 : '--' }}
            </template>
          </Column>
          <Column field="total" header="Total"></Column>
        </DataTable>
      </div>
    </section>
    <section class="sidebar-container">
      <Sidebar
        v-model:visible="IsDialogVisible"
        modal
        header="Update student marks"
        :style="{ width: '70rem' }"
        position="right"
      >
        <span class="p-text-secondary block mb-5"
          >Student serial number: {{ editableStudentData.serialNumber }}</span
        >
        <section class="sidebar-content-container">
          <section class="sidebar-content-container__image-container">
            <div v-if="getLoggedUser.stream !== 'Essay'">
              <Image src="/src/assets/sample_drawing.webp" alt="Image" width="250" preview />
            </div>
            <div v-else>
              <fge-pdf-vue3
                style="height: 100vh"
                :viewButton="viewButton"
                :viewSignature="viewSignature"
                :signature="signature"
                :page-number="1"
                file-name="Custom fileName"
                v-model:files="files"
                :footer-visible="false"
                :theme="'light'"
              ></fge-pdf-vue3>
            </div>
          </section>
          <Divider layout="vertical" />
          <section class="sidebar-content-container__form-container">
            <div class="input-field-container">
              <label for="username" class="font-semibold w-6rem">Mark 01</label>
              <InputText
                v-model="editableStudentData.mark_01"
                id="mark_01"
                class="flex-auto"
                autocomplete="off"
              />
            </div>
            <div class="input-field-container">
              <label for="username" class="font-semibold w-6rem">Mark 02</label>
              <InputText
                v-model="editableStudentData.mark_02"
                id="mark_02"
                class="flex-auto"
                autocomplete="off"
              />
            </div>
            <div class="input-field-container">
              <label for="username" class="font-semibold w-6rem">Mark 03</label>
              <InputText
                v-model="editableStudentData.mark_03"
                id="mark_03"
                class="flex-auto"
                autocomplete="off"
              />
            </div>
            <div class="input-field-container">
              <label for="username" class="font-semibold w-6rem">Mark 04</label>
              <InputText
                v-model="editableStudentData.mark_04"
                id="mark_04"
                class="flex-auto"
                autocomplete="off"
              />
            </div>
            <div class="input-field-container" v-if="getLoggedUser.stream !== 'Essay'">
              <label for="username" class="font-semibold w-6rem">Mark 05</label>
              <InputText
                v-model="editableStudentData.mark_05"
                id="mark_05"
                class="flex-auto"
                autocomplete="off"
              />
            </div>
          </section>
        </section>
        <div class="button-section">
          <Button type="button" label="Save" @click="saveStudentDetails"></Button>
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="IsDialogVisible = false"
          ></Button>
        </div>
      </Sidebar>
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
import { DISTRICTS } from '@/const/const'
import Image from 'primevue/image'
// import FgePdfVue3 from 'fge-pdf-vue3'
// import 'vue3-pdf-app/dist/icons/main.css'

const toast = useToast()
const userStore = useUserStore()
const homeStore = useHomeStore()

const { markingList } = storeToRefs(homeStore)
const { getLoggedUser } = storeToRefs(userStore)

const dataTable = ref()
const selectedudent = ref(null)
const selectedDistrict = ref(null)
const selectedAgeGroup = ref(null)
const ageGroups = ref(['9-11', '12-13'])
const markingListArt = ref([])
const districts = ref([])
const IsDialogVisible = ref(false)
const editableStudentData = ref({
  serialNumber: null,
  district: null,
  ageGroup: null,
  mark_01: null,
  mark_02: null,
  mark_03: null,
  mark_04: null,
  mark_05: null,
  total: null
})

const files = ref([
  {
    id: '6359b8a82736f8d11cd61190',
    fileName: 'cv2.pdf',
    pdf: '/src/assets/PE0449.pdf'
  }
])

const viewSignature = {
  adsib: true,
  agetic: true
}
const signature = {
  adsib: true,
  agetic: true
}


const viewButton = ref({
  // print: true,
  openFile: true,
  presentationMode: true,
  // download: true,
  // bookmark: true,
  files: true
})

onMounted(async () => {
  markingListArt.value = await homeStore.getMarkingLists()
  getDistrictList()
})

const onRowSelect = (param) => {
  if (selectedDistrict.value !== null && selectedAgeGroup.value === null) {
    toast.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Please select an Age group.',
      life: 3000
    })
    return
  } else if (selectedAgeGroup.value !== null && selectedDistrict.value === null) {
    toast.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Please select a District.',
      life: 3000
    })
    return
  } else if (selectedAgeGroup.value === null && selectedAgeGroup.value === null) {
    toast.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Please select a District and Age group.',
      life: 3000
    })
    return
  }
  IsDialogVisible.value = !IsDialogVisible.value
  editableStudentData.value = param.data
  // dataTable.value.blur()
}

const saveStudentDetails = () => {
  let totalMarks = 0

  for (const key in editableStudentData.value) {
    if (key.startsWith('mark_')) {
      totalMarks += parseInt(editableStudentData.value[key])
    }
  }

  editableStudentData.value.total = totalMarks
  IsDialogVisible.value = !IsDialogVisible.value

  // End-point

  toast.add({
    severity: 'info',
    summary: 'Info',
    detail: 'student marks added succesfully',
    life: 3000
  })

  console.log('markings_____________', editableStudentData.value)
}

const onDropdownChange = () => {
  if (selectedDistrict.value !== null && selectedAgeGroup.value === null) {
    districtFilter()
    return
  } else if (selectedAgeGroup.value !== null && selectedDistrict.value === null) {
    ageGroupFilter()
    return
  } else if (selectedAgeGroup.value === null && selectedAgeGroup.value === null) {
    markingListArt.value = markingList.value
    return
  }
  commonFilter()
}

const ageGroupFilter = () => {
  markingListArt.value = markingList.value.filter(
    (item) => item.ageGroup === selectedAgeGroup.value
  )
}

const districtFilter = () => {
  markingListArt.value = markingList.value.filter(
    (item) => item.district === selectedDistrict.value
  )
}

const commonFilter = () => {
  markingListArt.value = markingList.value.filter(
    (item) => item.district === selectedDistrict.value && item.ageGroup === selectedAgeGroup.value
  )
}

const getDistrictList = () => {
  getLoggedUser.value.districtDetails?.forEach((element) => {
    districts.value.push(DISTRICTS.find((ele) => ele.id === element).name)
  })
}
</script>

<style lang="scss">
.user-homepage__container {
  flex-grow: 1;
  display: flex;
  flex-direction: row;

  .homepage-content-container {
    justify-content: center;
    align-items: center;
    padding: 10px;
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

  .homepage-content-container_dropdown {
    padding: 10px;
  }
}

.input-field-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.sidebar-content-container__image-container {
  width: 50rem;
}

.sidebar-content-container__form-container {
  width: 20rem;
}

.sidebar-content-container {
  display: flex;
}

.button-section {
  position: absolute;
  bottom: 0px;
  margin: 15px;
  right: 0;

  > button {
    width: 150px;
  }
}

#toolbarViewerRight, #viewFind, .sidebar-toggle, #pageNumber, #numPages{
  display: none !important;
}

.sidebar-toggle{
  display: none !important;
}
</style>
