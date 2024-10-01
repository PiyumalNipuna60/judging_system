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
      <div v-if="isTableVisible">
        <DataTable
          ref="dataTable"
          v-model:selection="selectedStudent"
          :value="filteredStudentList"
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
          <Column field="serial_no" header="Serial Number"></Column>
          <Column field="mark_01" header="Mark 01">
            <template #body="slotProps">
              {{ slotProps.data.marks?.mark_01 ? slotProps.data.marks.mark_01 : '--' }}
            </template>
          </Column>
          <Column field="mark_02" header="Mark 02">
            <template #body="slotProps">
              {{ slotProps.data.marks?.mark_02 ? slotProps.data.marks.mark_02 : '--' }}
            </template>
          </Column>
          <Column field="mark_03" header="Mark 03">
            <template #body="slotProps">
              {{ slotProps.data.marks?.mark_03 ? slotProps.data.marks.mark_03 : '--' }}
            </template>
          </Column>
          <Column header="Mark 04">
            <template #body="slotProps">
              {{ slotProps.data.marks?.mark_04 ? slotProps.data.marks.mark_04 : '--' }}
            </template>
          </Column>
          <Column v-if="getLoggedUser?.stream !== 'Essay'" field="mark_05" header="Mark 05">
            <template #body="slotProps">
              {{ slotProps.data.marks?.mark_05 ? slotProps.data.marks.mark_05 : '--' }}
            </template>
          </Column>
          <Column field="total" header="Total">
            <template #body="slotProps">
              {{ slotProps.data.marks?.total ? slotProps.data.marks.total : '--' }}
            </template></Column
          >
        </DataTable>
      </div>
      <div v-else class="empty-area-container">
        <i class="pi pi-filter" style="font-size: 2rem"></i>
        <p>Please select a District and Age group to dispaly student details.</p>
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
          >Student serial number: {{ editableStudentData.serial_no }}</span
        >
        <section class="sidebar-content-container">
          <section class="sidebar-content-container__image-container">
            <div v-if="getLoggedUser?.stream !== 'Essay'">
              <Image
                :src="getImageUrl(editableStudentData.serial_no)"
                alt="Image"
                width="500"
                preview
              />
            </div>
            <div v-else>
              <embed :src="getPdfUrl(editableStudentData.serial_no)" type="application/pdf" width="100%" height="600px">
            </div>
          </section>
          <Divider layout="vertical" />
          <section class="sidebar-content-container__form-container">
            <div class="input-field-container">
              <label for="username" class="font-semibold w-6rem">Mark 01</label>
              <InputNumber
                v-model="editableStudentData.marks.mark_01"
                id="mark_01"
                class="flex-auto"
                autocomplete="off"
              />
            </div>
            <div class="input-field-container">
              <label for="username" class="font-semibold w-6rem">Mark 02</label>
              <InputNumber
                v-model="editableStudentData.marks.mark_02"
                id="mark_02"
                class="flex-auto"
                autocomplete="off"
              />
            </div>
            <div class="input-field-container">
              <label for="username" class="font-semibold w-6rem">Mark 03</label>
              <InputNumber
                v-model="editableStudentData.marks.mark_03"
                id="mark_03"
                class="flex-auto"
                autocomplete="off"
              />
            </div>
            <div class="input-field-container">
              <label for="username" class="font-semibold w-6rem">Mark 04</label>
              <InputNumber
                v-model="editableStudentData.marks.mark_04"
                id="mark_04"
                class="flex-auto"
                autocomplete="off"
              />
            </div>
            <div class="input-field-container" v-if="getLoggedUser?.stream !== 'Essay'">
              <label for="username" class="font-semibold w-6rem">Mark 05</label>
              <InputNumber
                v-model="editableStudentData.marks.mark_05"
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
import { replace } from 'lodash'
import { storeToRefs } from 'pinia'
import { useHomeStore } from '../stores/HomeStore'
import { useToast } from 'primevue/usetoast'
import { useUserStore } from '../stores/UserStore'
import { find } from 'lodash'
import { DISTRICTS, AGEGROUPS, S3_BUCKET } from '@/const/const'
import Image from 'primevue/image'
// import PDFViewer from 'pdf-viewer-vue'

const toast = useToast()
const userStore = useUserStore()
const homeStore = useHomeStore()

const { filteredStudentLists } = storeToRefs(homeStore)
const { getLoggedUser } = storeToRefs(userStore)

const dataTable = ref()
const selectedStudent = ref(null)
const selectedDistrict = ref(null)
const selectedAgeGroup = ref(null)
const ageGroups = ref(AGEGROUPS)
const filteredStudentList = ref([])
const districts = ref([])
const IsDialogVisible = ref(false)
const isMarksAdding = ref(false)
const isTableVisible = ref(false)
const editableStudentData = ref({
  serialNo: null,
  district: null,
  ageGroup: null,
  marks: {
    mark_01: null,
    mark_02: null,
    mark_03: null,
    mark_04: null,
    mark_05: null,
    total: null
  }
})


onMounted(async () => {
  filteredStudentList.value = await homeStore.getStudentList(getLoggedUser.value)
  getDistrictList()
})

const getImageUrl = (serialNo) => {
  return `${S3_BUCKET}image/${encodeURIComponent(replace(serialNo, /\//g, '-'))}.jpg`
}

const getPdfUrl = (serialNo) => {  
  return `${S3_BUCKET}pdf/${encodeURIComponent(replace(serialNo, /\//g, '-'))}.pdf`
}

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
  if (!param.data.marks) {
    isMarksAdding.value = true
    param.data.marks = editableStudentData.value.marks
  }
  editableStudentData.value = param.data
  // dataTable.value.blur()
}

const saveStudentDetails = async () => {
  let totalMarks = 0

  for (const key in editableStudentData.value.marks) {
    if (key.startsWith('mark_0') && editableStudentData.value.marks[key]) {
      totalMarks += parseInt(editableStudentData.value.marks[key])
    }
  }

  editableStudentData.value.marks.total = totalMarks
  IsDialogVisible.value = !IsDialogVisible.value

  try {
    if (isMarksAdding.value) {
      editableStudentData.value.marks.teacher_id = getLoggedUser.value.teacher_id
      editableStudentData.value.marks.student_id = editableStudentData.value.student_id
      await homeStore.addStudentMarks(editableStudentData.value.marks)
    } else {
      await homeStore.updateStudentMarks(editableStudentData.value.marks)
    }
    filteredStudentList.value = await homeStore.getStudentList(getLoggedUser.value)
    toast.add({
      severity: 'info',
      summary: 'Info',
      detail: 'student marks added succesfully',
      life: 3000
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Something went wrong',
      life: 3000
    })
  }

  isMarksAdding.value = false
  clearStudentData()
}

const clearStudentData = () => {
  editableStudentData.value = {
    serialNo: null,
    district: null,
    ageGroup: null,
    marks: {
      mark_01: null,
      mark_02: null,
      mark_03: null,
      mark_04: null,
      mark_05: null,
      total: null
    }
  }
}

const onDropdownChange = () => {
  if (selectedDistrict.value !== null && selectedAgeGroup.value === null) {
    isTableVisible.value = false
    districtFilter()
    return
  } else if (selectedAgeGroup.value !== null && selectedDistrict.value === null) {
    isTableVisible.value = false
    ageGroupFilter()
    return
  } else if (selectedAgeGroup.value === null && selectedAgeGroup.value === null) {
    filteredStudentList.value = filteredStudentLists.value
    isTableVisible.value = false
    return
  }
  commonFilter()
}

const ageGroupFilter = () => {
  filteredStudentList.value = filteredStudentLists.value.filter(
    (item) => item.age === selectedAgeGroup.value
  )
}

const districtFilter = () => {
  filteredStudentList.value = filteredStudentLists.value.filter(
    (item) => Number(item.district) === find(DISTRICTS, { name: selectedDistrict.value }).id
  )
}

const commonFilter = () => {
  filteredStudentList.value = filteredStudentLists.value.filter(
    (item) =>
      Number(item.district) === find(DISTRICTS, { name: selectedDistrict.value }).id &&
      item.age === selectedAgeGroup.value
  )
  isTableVisible.value = true
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

  .empty-area-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50%;
    justify-content: center;
    color: #495057;
  }

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
  display: flex;
  align-items: center;
  justify-content: center;
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

#toolbarViewerRight,
#viewFind,
.sidebar-toggle,
#pageNumber,
#numPages {
  display: none !important;
}

.sidebar-toggle {
  display: none !important;
}

.sidebar-content-container__image-container > div {
  width: 100%;
}
</style>
