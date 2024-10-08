<template>
  <section class="student-creation-container">
    <Toast />
    <section class="student-creation-sub-container flex-grow-1">
      <h2>STUDENT ADDING</h2>
      <Divider />
      <section class="flex flex-row mt-3">
        <div class="input-field-container">
          <label class="font-semibold mb-2">Search by student serial number</label>
          <!-- <InputIcon class="pi pi-search search-icon-class" @click="searchStudent"> </InputIcon> -->
          <Dropdown
            v-model="studentData.serialNo"
            :options="studentList"
            :filter="true"
            :loading="isProcessing"
            optionLabel="serial_no"
            placeholder="Select a Student"
            class="flex-auto"
            style="width: 260px"
            @change="onStudentIdSelect"
          >
            <template #option="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option.serial_no }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
      </section>
      <section class="flex flex-row mt-5">
        <div class="input-field-container">
          <label class="font-semibold mb-2">Student serial number</label>
          <InputText
            v-model="studentData.serialNo"
            placeholder="Enter student serial number" 
            class="flex-auto"
            :disabled="isStudentUpdating"
            />
        </div>
        <div class="input-field-container">
          <label class="font-semibold mb-2">Student name</label>
          <InputText
            v-model="studentData.studentName"
            placeholder="Enter student name" 
            class="flex-auto student-name-input-field"
            />
        </div>
        <div class="flex flex-row">
          <div class="input-field-container">
            <label class="font-semibold mb-2">Student district</label>
            <Dropdown
              v-model="studentData.district"
              :options="districts"
              optionLabel="name"
              showClear
              placeholder="Select a District"
              class="w-full md:w-14rem flex flex-row relative"
              @change="onDistrictelect"
            />
          </div>
        </div>
      </section>
      <section class="flex flex-row mt-5">
        <div class="input-field-container">
            <label class="font-semibold mb-2">Student age group</label>
            <Dropdown
              v-model="studentData.ageGroup"
              :options="ageGroups"
              showClear
              placeholder="Select an Age Group"
              class="w-full md:w-14rem flex flex-row relative"
              @change="onAgeGroupelect"
            />
          </div>
        <div class="input-field-container">
          <label class="font-semibold mb-2">Stream</label>
          <Dropdown
            v-model="studentData.stream"
            :options="streamList"
            placeholder="Select a Stream"
            class="w-full md:w-14rem"
            @change="onStreamSelect"
          />
        </div>
        <div class="input-field-container" v-if="isEssaySelected">
          <label class="font-semibold mb-2">Language</label>
          <div class="flex flex-row flex-wrap gap-3">
            <div class="flex align-items-center">
              <RadioButton v-model="studentData.language" inputId="ingredient1" value="Sinhala" />
              <label for="language1" class="ml-2">Sinhala</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton v-model="studentData.language" inputId="ingredient2" value="Tamil" />
              <label for="language2" class="ml-2">Tamil</label>
            </div>
          </div>
        </div>
      </section>
      
      <section class="action-button-class">
        <Button
          type="button"
          :label="isStudentUpdating ? 'Update student' : 'Add student'"
          class="mr-2"
          :loading="isProcessing"
          @click="addNewStudent"
        ></Button>
        <Button
          type="button"
          label="Delete"
          @click="removeStudentData"
          :disabled="!isStudentUpdating"
          class="mr-2"
        ></Button>
        <Button type="button" label="Clear" @click="clearStudentData"></Button>
      </section>
    </section>
  </section>
</template>

<script setup>
import { find } from 'lodash'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'
import { useStudentStore } from '../stores/StudentStore'
import { DISTRICTS, AGEGROUPS, STREAMS } from '@/const/const'

const studentStore = useStudentStore()

const toast = useToast()
const ageGroups = ref(AGEGROUPS)
const streamList = ref(STREAMS)
const districts = ref(DISTRICTS)
const isEssaySelected = ref(false)
const docType = ref('image')
const studentData = ref({
  serialNo: null,
  studentName: null,
  stream: null,
  language: null,
  district: null,
  ageGroup: null,
  uploadedFile: {}
})
const studentList = ref([])
const isStudentUpdating = ref(false)
const isProcessing = ref(false)

onMounted(async () => {
  await getAllStudents()
})

const getAllStudents = async () => {
  try {
    isProcessing.value = true
    studentList.value = await studentStore.getAllStudents()
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: `${error.message}`,
      life: 3000
    })
  }
  isProcessing.value = false
}

const onStreamSelect = async (event) => {
  if (event.value === 'Essay') {
    isEssaySelected.value = true
    docType.value = 'application'
  } else {
    isEssaySelected.value = false
    docType.value = 'image'

    if (studentData.value.language) {
      studentData.value.language = null
    }
  }
}

const addNewStudent = async () => {
  try {
    isProcessing.value = true
    if (isStudentUpdating.value) {
      await studentStore.updateStudentData(studentData.value)
    } else {
      await studentStore.addStudentData(studentData.value)
    }
    await getAllStudents()
    toast.add({
      severity: 'info',
      summary: 'Info',
      detail: 'student data added succesfully',
      life: 3000
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: `${error.message}`,
      life: 3000
    })
  }
  clearStudentData()
  isProcessing.value = false
}

const onStudentIdSelect = (param) => {
  clearStudentData()
  isStudentUpdating.value = true
  console.log('  isStudentUpdating.value', isStudentUpdating.value)
  studentData.value = {
    id: param.value.student_id,
    serialNo: param.value.serial_no,
    studentName: param.value.studentName,
    school: param.value.school,
    stream: param.value.stream,
    language: param.value.language,
    ageGroup: param.value.age
  }
  if (param.value.stream === 'Essay') {
    isEssaySelected.value = true
    docType.value = 'application'
  } else {
    isEssaySelected.value = false
    docType.value = 'image'
    if (studentData.value.language) {
      studentData.value.language = null
    }
  }
  getDistrictValue(param.value.district)
}

const getDistrictValue = (param) => {
  studentData.value.district = find(DISTRICTS, { id: Number(param) })
}

const onAgeGroupelect = (param) => {
  studentData.value.ageGroup = param.value
}

const onDistrictelect = (param) => {
  studentData.value.district = param.value
}

const removeStudentData = async () => {
  try {
    isProcessing.value = true
    await studentStore.removeStudentData(studentData.value.id)
    getAllStudents()
    toast.add({
      severity: 'info',
      summary: 'Info',
      detail: 'student data deleted succesfully',
      life: 3000
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: `${error.message}`,
      life: 3000
    })
  }
  isProcessing.value = false
}

const clearStudentData = () => {
  isStudentUpdating.value = false
  studentData.value = {
    serialNo: null,
    studentName: null,
    school: null,
    stream: null,
    language: null,
    ageGroup: null,
    district: null,
    uploadedFile: []
  }
}
</script>

<style lang="scss">
.student-creation-container {
  display: flex;
  flex-grow: 1;

  .student-name-input-field{
    width: 300px !important;
  }

  .uploaded-content-container img {
    width: 300px;
    height: 150px;
  }

  .uploaded-content-container {
    .p-button {
      position: absolute;
      right: 20px;
    }
  }

  .action-button-class {
    display: flex;
    //  justify-content: flex-end;
    padding-top: 1rem;
  }

  .input-field-container {
    display: grid;
    margin-right: 20px;

    input {
      width: 250px;
    }

    .search-icon-class:hover {
      cursor: pointer;
    }
  }

  .student-creation-sub-container {
    padding: 10px;
  }
  .file-upload-container {
    .p-disabled {
      display: none;
    }
  }
}
</style>
