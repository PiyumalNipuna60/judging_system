<template>
  <section class="user-homepage__container">
    <Toast />
    <section class="homepage-content-container flex-grow-1">
      <h2>ADMIN PANEL</h2>
      <Divider />
      <div class="flex flex-row justify-center">
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
          :value="studentList"
          tableStyle="min-width: 50rem"
          paginator
          :rows="10"
          :rowsPerPageOptions="[10, 20, 50]"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          selectionMode="single"
          dataKey="id"
        >
          <template #paginatorstart>
            <Button
              icon="pi pi-external-link"
              type="button"
              label="Export"
              @click="exportCSV($event)"
            />
          </template>
          <template #paginatorend> </template>

          <ColumnGroup type="header">
            <Row>
              <Column header="Serial Number" sortable :rowspan="2" />
              <Column header="Examiner 1" :colspan="6" />
              <Column header="Examiner 2" :colspan="6" />
              <Column header="Total" sortable :rowspan="2" />
              <Column header="Average" sortable :rowspan="2" />
            </Row>
            <Row>
              <Column field="mark_01" header="Mark 01"></Column>
              <Column field="mark_02" header="Mark 02"></Column>
              <Column field="mark_03" header="Mark 03"></Column>
              <Column field="mark_04" header="Mark 04"></Column>
              <Column field="mark_05" header="Mark 05"></Column>
              <Column field="total" header="Sub Total"></Column>
              <Column field="mark_01" header="Mark 01"></Column>
              <Column field="mark_02" header="Mark 02"></Column>
              <Column field="mark_03" header="Mark 03"></Column>
              <Column field="mark_04" header="Mark 04"></Column>
              <Column field="mark_05" header="Mark 05"></Column>
              <Column field="total" header="Sub Total"></Column>
            </Row>
          </ColumnGroup>
          <Column field="serialNumber" header="Serial Number" style="width: 15%"></Column>
          <Column field="mark_01" header="Mark 01"></Column>
          <Column field="mark_02" header="Mark 02"></Column>
          <Column field="mark_03" header="Mark 03"></Column>
          <Column field="mark_04" header="Mark 04"></Column>
          <Column field="mark_05" header="Mark 05"></Column>
          <Column field="total" sortable header="Sub Total"></Column>
          <Column field="mark_01" header="Mark 01"></Column>
          <Column field="mark_02" header="Mark 02"></Column>
          <Column field="mark_03" header="Mark 03"></Column>
          <Column field="mark_04" header="Mark 04"></Column>
          <Column field="mark_05" header="Mark 05"></Column>
          <Column field="total" sortable header="Sub Total"></Column>
          <Column field="total" style="width: 6%"></Column>
          <Column field="average" style="width: 6%"></Column>
        </DataTable>
      </div>
    </section>
    <section class="dialogbox-container">
      <Dialog
        v-model:visible="IsDialogVisible"
        modal
        header="Update student marks"
        :style="{ width: '25rem' }"
      >
        <span class="p-text-secondary block mb-5"
          >Student marks serial: {{ editableStudentData.serialNumber }}</span
        >
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
        <div class="input-field-container">
          <label for="username" class="font-semibold w-6rem">Mark 05</label>
          <InputText
            v-model="editableStudentData.mark_05"
            id="mark_05"
            class="flex-auto"
            autocomplete="off"
          />
        </div>
        <div class="flex justify-content-end gap-2">
          <Button type="button" label="Save" @click="saveStudentDetails"></Button>
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
import router from '@/router'
import { storeToRefs } from 'pinia'
import { useHomeStore } from '../stores/HomeStore'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const homeStore = useHomeStore()

const { filteredStudentLists } = storeToRefs(homeStore)

const items = ref([])
const dataTable = ref()
const selectedudent = ref(null)
const selectedDistrict = ref(null)
const selectedAgeGroup = ref(null)
const ageGroups = ref(['9-11', '12-13'])
const studentList = ref([])
const districts = [
  'Colombo',
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

onMounted(async () => {
  studentList.value = await homeStore.getStudentList()
  console.log('student list _____________', studentList.value, filteredStudentLists.value);
  
})

// const onRowSelect = (param) => {
//   IsDialogVisible.value = !IsDialogVisible.value
//   editableStudentData.value = param.data
//   // dataTable.value.blur()
// }

// const saveStudentDetails = () => {
//   let totalMarks = 0

//   for (const key in editableStudentData.value) {
//     if (key.startsWith('mark_')) {
//       totalMarks += parseInt(editableStudentData.value[key])
//     }
//   }

//   editableStudentData.value.total = totalMarks
//   IsDialogVisible.value = !IsDialogVisible.value

//   // End-point

//   toast.add({
//     severity: 'info',
//     summary: 'Info',
//     detail: 'student marks added succesfully',
//     life: 3000
//   })

//   console.log('markings_____________', editableStudentData.value)
// }

const onDropdownChange = () => {
  console.log('sele______', selectedDistrict.value, selectedAgeGroup.value)
  if (selectedDistrict.value !== null && selectedAgeGroup.value === null) {
    districtFilter()
    return
  } else if (selectedAgeGroup.value !== null && selectedDistrict.value === null) {
    ageGroupFilter()
    return
  } else if (selectedAgeGroup.value === null && selectedAgeGroup.value === null) {
    studentList.value = filteredStudentLists.value
    return
  }
  commonFilter()
}

const ageGroupFilter = () => {
  studentList.value = filteredStudentLists.value.filter(
    (item) => item.ageGroup === selectedAgeGroup.value
  )
  console.log(studentList.value)
}

const districtFilter = () => {
  studentList.value = filteredStudentLists.value.filter(
    (item) => item.district === selectedDistrict.value
  )
  console.log(studentList.value)
}

const commonFilter = () => {
  studentList.value = filteredStudentLists.value.filter(
    (item) => item.district === selectedDistrict.value && item.ageGroup === selectedAgeGroup.value
  )
  console.log(studentList.value)
}
const exportCSV = () => {
  dataTable.value.exportCSV()
  dataTable.value.exportXL()
}
</script>

<style lang="scss">
.user-homepage__container {
  display: flex;
  flex-direction: row;
  flex-grow: 1;

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

  .p-datatable-wrapper {
    height: 485px;
  }
}

.input-field-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
</style>
