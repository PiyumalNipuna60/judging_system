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
            optionLabel="name"
            optionValue="id"
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
        <div class="homepage-content-container_dropdown">
          <Dropdown
            v-model="selectedMedium"
            :options="mediumList"
            showClear
            placeholder="Select a Medium"
            class="w-full md:w-14rem flex flex-row relative"
            @change="onMediumChange"
          />
        </div>
      </div>
      <div>
        <DataTable
          ref="dataTable"
          v-model:selection="selectedudent"
          :value="studentList"
          tableStyle="max-width: 50rem"
          paginator
          scrollable
          sortable
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
              <Column header="Serial Number" sortable :rowspan="2" field="serial_no"  />
              <Column header="Examiner 1" :colspan="6" />
              <Column header="Examiner 2" :colspan="6" />
              <Column header="Examiner 3" :colspan="6" />
              <Column header="Total" :sortable="true" :rowspan="2" field="finalTotal" />
              <Column header="Average" sortable :rowspan="2" field="average" />
            </Row>
            <Row>
              <Column field="mark_01" header="Mark 01"></Column>
              <Column field="mark_02" header="Mark 02"></Column>
              <Column field="mark_03" header="Mark 03"></Column>
              <Column field="mark_04" header="Mark 04"></Column>
              <Column field="mark_05" header="Mark 05"></Column>
              <Column field="total"  header="Sub Total"></Column>

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
          <Column field="serial_no" header="Serial Number" style="min-width: 200px"></Column>
          <Column field="mark_01" header="Mark 01">
            <template #body="slotProps">
              {{ slotProps.data.marks[0]?.mark_01 ? slotProps.data.marks[0]?.mark_01 : '--' }}
            </template>
          </Column>
          <Column field="mark_02" header="Mark 02">
            <template #body="slotProps">
              {{ slotProps.data.marks[0]?.mark_02 ? slotProps.data.marks[0]?.mark_02 : '--' }}
            </template>
          </Column>
          <Column field="mark_03" header="Mark 03">
            <template #body="slotProps">
              {{ slotProps.data.marks[0]?.mark_03 ? slotProps.data.marks[0]?.mark_03 : '--' }}
            </template>
          </Column>
          <Column field="mark_04" header="Mark 04">
            <template #body="slotProps">
              {{ slotProps.data.marks[0]?.mark_04 ? slotProps.data.marks[0]?.mark_04 : '--' }}
            </template>
          </Column>
          <Column field="mark_05" header="Mark 05">
            <template #body="slotProps">
              {{ slotProps.data.marks[0]?.mark_05 ? slotProps.data.marks[0]?.mark_05 : '--' }}
            </template>
          </Column>
          <Column field="total" sortable header="Sub Total">
            <template #body="slotProps">
              {{ slotProps.data.marks[0]?.total ? slotProps.data.marks[0]?.total : '--' }}
            </template>
          </Column>

          <Column field="mark_01" header="Mark 01">
            <template #body="slotProps">
              {{ slotProps.data.marks[1]?.mark_01 ? slotProps.data.marks[1]?.mark_01 : '--' }}
            </template>
          </Column>
          <Column field="mark_02" header="Mark 02">
            <template #body="slotProps">
              {{ slotProps.data.marks[1]?.mark_02 ? slotProps.data.marks[1]?.mark_02 : '--' }}
            </template>
          </Column>
          <Column field="mark_03" header="Mark 03">
            <template #body="slotProps">
              {{ slotProps.data.marks[1]?.mark_03 ? slotProps.data.marks[1]?.mark_03 : '--' }}
            </template>
          </Column>
          <Column field="mark_04" header="Mark 04">
            <template #body="slotProps">
              {{ slotProps.data.marks[1]?.mark_04 ? slotProps.data.marks[1]?.mark_04 : '--' }}
            </template>
          </Column>
          <Column field="mark_05" header="Mark 05">
            <template #body="slotProps">
              {{ slotProps.data.marks[1]?.mark_05 ? slotProps.data.marks[1]?.mark_05 : '--' }}
            </template>
          </Column>
          <Column field="total" sortable header="Sub Total">
            <template #body="slotProps">
              {{ slotProps.data.marks[1]?.total ? slotProps.data.marks[1]?.total : '--' }}
            </template>
          </Column>

          <Column field="mark_01" header="Mark 01">
            <template #body="slotProps">
              {{ slotProps.data.marks[2]?.mark_01 ? slotProps.data.marks[2]?.mark_01 : '--' }}
            </template>
          </Column>
          <Column field="mark_02" header="Mark 02">
            <template #body="slotProps">
              {{ slotProps.data.marks[2]?.mark_02 ? slotProps.data.marks[2]?.mark_02 : '--' }}
            </template>
          </Column>
          <Column field="mark_03" header="Mark 03">
            <template #body="slotProps">
              {{ slotProps.data.marks[2]?.mark_03 ? slotProps.data.marks[2]?.mark_03 : '--' }}
            </template>
          </Column>
          <Column field="mark_04" header="Mark 04">
            <template #body="slotProps">
              {{ slotProps.data.marks[2]?.mark_04 ? slotProps.data.marks[2]?.mark_04 : '--' }}
            </template>
          </Column>
          <Column field="mark_05" header="Mark 05">
            <template #body="slotProps">
              {{ slotProps.data.marks[2]?.mark_05 ? slotProps.data.marks[2]?.mark_05 : '--' }}
            </template>
          </Column>
          <Column field="total" header="Sub Total">
            <template #body="slotProps">
              {{ slotProps.data.marks[2]?.total ? slotProps.data.marks[2]?.total : '--' }}
            </template>
          </Column>
          <Column field="finalTotal" header="Sortable Total" :sortable="true" style="width: 5%">
            <!-- <template #body="slotProps">
              {{ calculateRowTotal(slotProps) }}
            </template> -->
          </Column>
          <Column field="average" sortable style="width: 5%">
            <!-- <template #body="slotProps">
              {{ calculateRowAvg(slotProps) }}
            </template> -->
          </Column>
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
import { storeToRefs } from 'pinia'
import { useHomeStore } from '../stores/HomeStore'
import { useToast } from 'primevue/usetoast'
import { DISTRICTS } from '@/const/const'
import ExcelJS from 'exceljs'

const toast = useToast()
const homeStore = useHomeStore()

const { allStudentLists } = storeToRefs(homeStore)

const dataTable = ref()
const selectedudent = ref(null)
const selectedDistrict = ref(null)
const selectedAgeGroup = ref(null)
const selectedMedium = ref(null)
const ageGroups = ref(['9-11', '12-13'])
const mediumList = ref(['Essay', 'Art'])
const studentList = ref([])
const districts = ref(DISTRICTS)
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
  studentList.value = await homeStore.getAllStudents()
  console.log('mapped marks ____________', studentList.value );
  
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
    studentList.value = allStudentLists.value
    return
  }
  commonFilter()
}

const ageGroupFilter = () => {
  studentList.value = allStudentLists.value.filter(
    (item) => item.age === selectedAgeGroup.value
  )
}

const districtFilter = () => {
  studentList.value = allStudentLists.value.filter(
    (item) => Number(item.district) === selectedDistrict.value
  )
}

const onMediumChange = () => {
  studentList.value = allStudentLists.value.filter(
    (item) => item.stream === selectedMedium.value
  )
}

const commonFilter = () => {
  studentList.value = allStudentLists.value.filter(
    (item) => item.district === selectedDistrict.value && item.ageGroup === selectedAgeGroup.value
  )
  console.log(studentList.value)
}

const exportCSV = () => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Sheet2')

  // worksheet.mergeCells('A1:Z1')
  // worksheet.getCell('A1').value = 'Student Marks Report' // Set the main header text
  // worksheet.getCell('A1').alignment = { horizontal: 'center' } // Center align the main header
  // worksheet.getCell('A1').font = { bold: true, size: 16 }


  // // Set up the subheaders
  // const subheaders = [
  //   'Student ID',
  //   'Serial No',
  //   'Language',
  //   'District',
  //   'Age',
  //   'Stream',
  //   'Mark 01',
  //   'Mark 02',
  //   'Mark 03',
  //   'Mark 04',
  //   'Mark 05',
  //   'Sub Total',
  //   'Mark 01',
  //   'Mark 02',
  //   'Mark 03',
  //   'Mark 04',
  //   'Mark 05',
  //   'Sub Total',
  //   'Mark 01',
  //   'Mark 02',
  //   'Mark 03',
  //   'Mark 04',
  //   'Mark 05',
  //   'Sub Total',
  //   'Total Marks',
  //   'Average Marks'
  // ];

  // Add subheaders to the second row
  // subheaders.forEach((header, index) => {
  //   worksheet.getCell(2, index + 1).value = header; // Set the value for each subheader
  // });

  // // Style the subheaders
  // worksheet.getRow(2).font = { bold: true }; // Make the subheaders bold
  // worksheet.getRow(2).alignment = { horizontal: 'center' }; // Center align subheaders


  worksheet.columns = [
    { header: 'Student ID', key: 'student_id', width: 10 },
    { header: 'Serial No', key: 'serial_no', width: 30 },
    { header: 'Language', key: 'language', width: 10 },
    { header: 'District', key: 'district', width: 10 },
    { header: 'Age', key: 'age', width: 10 },
    { header: 'Stream', key: 'stream', width: 10 },
    { header: 'Mark 01', key: 't_01_mark_01', width: 10 },
    { header: 'Mark 02', key: 't_01_mark_02', width: 10 },
    { header: 'Mark 03', key: 't_01_mark_03', width: 10 },
    { header: 'Mark 04', key: 't_01_mark_04', width: 10 },
    { header: 'Mark 05', key: 't_01_mark_05', width: 10 },
    { header: 'Sub Total', key: 't_01_total', width: 10 },
    { header: 'Mark 01', key: 't_02_mark_01', width: 10 },
    { header: 'Mark 02', key: 't_02_mark_02', width: 10 },
    { header: 'Mark 03', key: 't_02_mark_03', width: 10 },
    { header: 'Mark 04', key: 't_02_mark_04', width: 10 },
    { header: 'Mark 05', key: 't_02_mark_05', width: 10 },
    { header: 'Sub Total', key: 't_02_total', width: 10 },
    { header: 'Mark 01', key: 't_03_mark_01', width: 10 },
    { header: 'Mark 02', key: 't_03_mark_02', width: 10 },
    { header: 'Mark 03', key: 't_03_mark_03', width: 10 },
    { header: 'Mark 04', key: 't_03_mark_04', width: 10 },
    { header: 'Mark 05', key: 't_03_mark_05', width: 10 },
    { header: 'Sub Total', key: 't_03_total', width: 10 },
    { header: 'Total Marks', key: 'finalTotal', width: 10 },
    { header: 'Average Marks', key: 'average', width: 10 }
  ]

  // Optionally, style subheaders (row 2)
  worksheet.getRow(1).font = { bold: true } // Make the subheaders bold
  worksheet.getRow(1).alignment = { horizontal: 'center' }

  console.log('student list ssss________',studentList.value);
  

  studentList.value.forEach((student) => {
    const row = {
      student_id: student.student_id,
      serial_no: student.serial_no,
      language: student.language,
      district: student.district,
      age: student.age,
      stream: student.stream,
      t_01_mark_01: student.marks[0]?.mark_01 ?? '--',
      t_01_mark_02: student.marks[0]?.mark_02 ?? '--',
      t_01_mark_03: student.marks[0]?.mark_03 ?? '--',
      t_01_mark_04: student.marks[0]?.mark_04 ?? '--',
      t_01_mark_05: student.marks[0]?.mark_05 ?? '--',
      t_01_total: student.marks[0]?.total ?? '--',
      t_02_mark_01: student.marks[1]?.mark_01 ?? '--',
      t_02_mark_02: student.marks[1]?.mark_02 ?? '--',
      t_02_mark_03: student.marks[1]?.mark_03 ?? '--',
      t_02_mark_04: student.marks[1]?.mark_04 ?? '--',
      t_02_mark_05: student.marks[1]?.mark_05 ?? '--',
      t_02_total: student.marks[1]?.total ?? '--',
      t_03_mark_01: student.marks[2]?.mark_01 ?? '--',
      t_03_mark_02: student.marks[2]?.mark_02 ?? '--',
      t_03_mark_03: student.marks[2]?.mark_03 ?? '--',
      t_03_mark_04: student.marks[2]?.mark_04 ?? '--',
      t_03_mark_05: student.marks[2]?.mark_05 ?? '--',
      t_03_total: student.marks[2]?.total ?? '--',
      finalTotal: student.finalTotal ?? '--',
      average: student.average ?? '--'
    }

    worksheet.addRow(row) 
  })

  // Save the file
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'Students Marks Report.xlsx'
    link.click()
  })

  // dataTable.value.exportCSV()
  // dataTable.value.exportXL()
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

  .p-datatable {
    // overflow: scroll;
    max-width: 1300px;
    font-size: 15px;
  }

  .p-datatable .p-datatable-tbody > tr > td,
  .p-datatable .p-datatable-thead > tr > th {
    padding: 0.5rem 0.5rem;
  }

  tr td:nth-child(6):nth-child(12) {
    background: blue;
  }

  td {
    // background: blue;
  }

  .p-selectable-row td:nth-child(n + 8):nth-child(-n + 13) {
    background: rgba(159, 220, 255, 0.596);
  }

  .p-selectable-row td:nth-child(n + 20):nth-child(-n + 21) {
    background: rgba(121, 203, 251, 0.788);
  }

  thead tr:nth-child(1) th:nth-child(n + 5):nth-child(-n + 6) {
    background: rgba(121, 203, 251, 0.788);
  }

  tr th:nth-child(n + 7):nth-child(-n + 12) {
    background: rgba(159, 220, 255, 0.596);
  }

  thead tr:nth-child(1) th:nth-child(3) {
    background: rgba(159, 220, 255, 0.596);
  }

  thead tr:nth-child(1) tr th:nth-child(5) {
    background: rgba(159, 220, 255, 0.596);
  }
  thead tr:nth-child(1) tr th:nth-child(6) {
    background: rgba(159, 220, 255, 0.596);
  }

  thead > tr:nth-child(1) > th:nth-child(1) {
    background: rgba(159, 220, 255, 0.596);
  }

  tr td:nth-child(1) {
    background: rgba(159, 220, 255, 0.596);
  }

  .p-paginator-bottom {
    // position: fixed;
    // width: 74vw;
  }
}

.input-field-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
</style>
