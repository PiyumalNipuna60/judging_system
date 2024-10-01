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
            @change="onDropdownChange"
          />
        </div>
      </div>
      <div v-if="!processing" class="admin-data-table-container">
        <DataTable
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
              <Column header="Serial Number" sortable :rowspan="2" field="serial_no" />
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
              <Column field="total" header="Sub Total"></Column>

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
          <Column
            field="finalTotal"
            header="Sortable Total"
            :sortable="true"
            style="width: 5%"
          ></Column>
          <Column field="average" sortable style="width: 5%"></Column>
        </DataTable>
      </div>
      <div v-else>
        <DataTable :value="skelatonArray">
          <ColumnGroup type="header">
            <Row>
              <Column header="Serial Number" :rowspan="2" style="min-width: 200px">
                <template #body> <Skeleton></Skeleton> </template>
              </Column>
              <Column header="Examiner 1" :colspan="6">
                <template #body> <Skeleton></Skeleton> </template>
              </Column>
              <Column header="Examiner 2" :colspan="6">
                <template #body> <Skeleton></Skeleton> </template>
              </Column>
              <Column header="Examiner 3" :colspan="6">
                <template #body> <Skeleton></Skeleton> </template>
              </Column>
              <Column header="Total" :sortable="true" :rowspan="2" field="finalTotal" />
              <Column header="Average" sortable :rowspan="2" field="average" />
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

              <Column field="mark_01" header="Mark 01"></Column>
              <Column field="mark_02" header="Mark 02"></Column>
              <Column field="mark_03" header="Mark 03"></Column>
              <Column field="mark_04" header="Mark 04"></Column>
              <Column field="mark_05" header="Mark 05"></Column>
              <Column field="total" header="Sub Total"></Column>
            </Row>
          </ColumnGroup>
          <Column>
            <template #body>
              <Skeleton></Skeleton>
            </template>
          </Column>
          <Column>
            <template #body>
              <Skeleton></Skeleton>
            </template>
          </Column>
          <Column>
            <template #body>
              <Skeleton></Skeleton>
            </template>
          </Column>
          <Column>
            <template #body>
              <Skeleton></Skeleton>
            </template>
          </Column>
          <Column>
            <template #body> <Skeleton></Skeleton> </template>
          </Column>
          <Column>
            <template #body> <Skeleton></Skeleton></template>
          </Column>
          <Column>
            <template #body>
              <Skeleton></Skeleton>
            </template>
          </Column>
          <Column>
            <template #body>
              <Skeleton></Skeleton>
            </template>
          </Column>
          <Column>
            <template #body>
              <Skeleton></Skeleton>
            </template>
          </Column>
          <Column>
            <template #body>
              <Skeleton></Skeleton>
            </template>
          </Column>
          <Column>
            <template #body>
              <Skeleton></Skeleton>
            </template>
          </Column>
          <Column>
            <template #body>
              <Skeleton></Skeleton>
            </template>
          </Column>
          <Column>
            <template #body>
              <Skeleton></Skeleton>
            </template>
          </Column>
          <Column>
            <template #body>
              <Skeleton></Skeleton>
            </template>
          </Column>
          <Column>
            <template #body>
              <Skeleton></Skeleton>
            </template>
          </Column>
          <Column>
            <template #body>
              <Skeleton></Skeleton>
            </template>
          </Column>
          <Column>
            <template #body>
              <Skeleton></Skeleton>
            </template>
          </Column>
          <Column>
            <template #body>
              <Skeleton></Skeleton>
            </template>
          </Column>
          <Column>
            <template #body>
              <Skeleton></Skeleton>
            </template>
          </Column>
          <Column>
            <template #body>
              <Skeleton></Skeleton>
            </template>
          </Column>
          <Column>
            <template #body>
              <Skeleton></Skeleton>
            </template>
          </Column>
        </DataTable>
      </div>
    </section>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useHomeStore } from '../stores/HomeStore'
import { DISTRICTS } from '@/const/const'
import ExcelJS from 'exceljs'

const homeStore = useHomeStore()
const { allStudentLists } = storeToRefs(homeStore)

const selectedudent = ref(null)
const selectedDistrict = ref(null)
const selectedAgeGroup = ref(null)
const selectedMedium = ref(null)
const ageGroups = ref(['9-11', '12-13'])
const mediumList = ref(['Essay', 'Art'])
const studentList = ref([])
const districts = ref(DISTRICTS)
const skelatonArray = ref(new Array(12))
const processing = ref(true)

onMounted(async () => {
  processing.value = true
  studentList.value = await homeStore.getAllStudents()
  processing.value = false
})

const onDropdownChange = () => {
  studentList.value = allStudentLists.value
  console.log('sele______', selectedDistrict.value, selectedAgeGroup.value, selectedMedium.value)
  if (selectedDistrict.value !== null) {
    studentList.value = studentList.value.filter(
      (item) => Number(item.district) === selectedDistrict.value
    )
  }
  if (selectedAgeGroup.value !== null) {
    studentList.value = studentList.value.filter((item) => item.age === selectedAgeGroup.value)
  }
  if (selectedMedium.value !== null) {
    studentList.value = studentList.value.filter((item) => item.stream === selectedMedium.value)
  }
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
    // border-radius: 10px;
  }

  

  .data-table-container{
    // background: #ffffff;
    // border: 1px solid #dcdcdc;
    // border-radius: 10px;
    // margin-bottom: 1rem;
    // padding: 0.5rem;
  }

  .admin-data-table-container{
    .p-datatable {
    max-width: 1300px;
    font-size: 15px;
  }
  
    .p-datatable .p-datatable-tbody > tr > td,
  .p-datatable .p-datatable-thead > tr > th {
    padding: 0.5rem 0.5rem;
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
  }

  

  .p-paginator-bottom {
    // position: fixed;
    // width: 74vw;
  }
}
</style>
