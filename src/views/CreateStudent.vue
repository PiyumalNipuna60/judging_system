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
            optionLabel="serial_no"
            placeholder="Select a Student"
            class="flex-auto"
            style="width: 250px"
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
            id="mark_03"
            class="flex-auto"
            autocomplete="off"
            :disable="isStudentUpdating"
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
        </div>
      </section>
      <section class="flex flex-row mt-5">
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
      <section class="file-upload-container">
        <Toast />
        <!-- <div class="ml-4">
          <FilePicker
            v-model:files="files"
            :image-display-name="ruleName"
            :is-larger-image-preview="isLargerImagePreview"
            :file-types="['.jpeg', '.jpg', 'image/jpeg', '.png', 'image/png']"
            file-types-text="Formats accepted: JPEG, JPG, PNG"
            :max-files="1"
            :is-file-picker-template-hide="isFilePickerTemplateHide"
            is-promotion
            generate-preview
            :processing="filesProcessing"
            @on-files-added="onFilesAdded"
          />
        </div> -->
        <!-- <FileUpload
          name="demo[]"
          url="/api/upload"
          :auto="true"
          customUpload
          @select="onAdvancedUpload($event)"
          :accept="`${docType}/*`"
          :maxFileSize="10000000"
        >
          <template #content>
            <div v-if="studentData.uploadedFile.length > 0" class="uploaded-content-container">
              <div class="flex flex-wrap">
                <div class="card m-0 px-6 flex flex-column align-items-center gap-3">
                  <div>
                    <img
                      role="presentation"
                      :alt="studentData.uploadedFile[0].name"
                      :src="studentData.uploadedFile[0].objectURL"
                      width="100"
                      height="50"
                    />
                  </div>
                  <span class="font-semibold">{{ studentData.uploadedFile[0].name }}</span>
                  <div>{{ formatSize(studentData.uploadedFile[0].size) }}</div>
                  <Button
                    icon="pi pi-times"
                    @click="removeUploadedFileCallback()"
                    rounded
                    severity="danger"
                  />
                </div>
              </div>
            </div>
          </template>
          <template #empty v-if="!studentData.uploadedFile.length > 0">
            <p>Drag and drop files to here to upload.</p>
          </template>
        </FileUpload> -->
      </section>
      <section class="action-button-class">
        <Button
          type="button"
          :label="isStudentUpdating ? 'Update student' : 'Add student'"
          class="mr-2"
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
import { usePrimeVue } from 'primevue/config'
import { useStudentStore } from '../stores/StudentStore'
import { DISTRICTS, AGEGROUPS, STREAMS } from '@/const/const'

const studentStore = useStudentStore()

const $primevue = usePrimeVue()
const toast = useToast()
const imageData = ref()
const ageGroups = ref(AGEGROUPS)
const streamList = ref(STREAMS)
const districts = ref(DISTRICTS)
const isEssaySelected = ref(false)
const docType = ref('image')
const studentData = ref({
  serialNo: null,
  stream: null,
  language: null,
  district: null,
  ageGroup: null,
  uploadedFile: {}
})
const files = ref([])
const filesProcessing = ref(false)
const ruleImageUrl = ref()
const studentList = ref([])
const isStudentUpdating = ref(false)

onMounted(async () => {
  await getAllStudents()
})

const getAllStudents = async () => {
  try {
    studentList.value = await studentStore.getAllStudents()
    console.log('student lust _', studentList.value)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: `${error.message}`,
      life: 3000
    })
  }
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
    if (isStudentUpdating.value) {
      await studentStore.updateStudentData(studentData.value)
    } else {
      await studentStore.addStudentData(studentData.value)
    }
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
}

const onStudentIdSelect = (param) => {
  clearStudentData()
  isStudentUpdating.value = true
  console.log('  isStudentUpdating.value', isStudentUpdating.value)
  studentData.value = {
    id: param.value.student_id,
    serialNo: param.value.serial_no,
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
}

const clearStudentData = () => {
  isStudentUpdating.value = false
  studentData.value = {
    serialNo: null,
    stream: null,
    language: null,
    ageGroup: null,
    district: null,
    uploadedFile: []
  }
}

// need to implement  -  fie upload part
import { uploadImage } from '../service/StudentService'
import FilePicker from './component/FilePicker.vue'

const ruleName = ref()
const isLargerImagePreview = ref(true)
const isFilePickerTemplateHide = ref(false)

async function generatePreviews(files) {
  return Promise.all(files.map((file) => (file.blob ? studentStore.uploadImage(file) : null)))
}

const onFilesAdded = async ({ newFiles, filesList }) => {
  filesProcessing.value = true
  const previews = await generatePreviews(filesList)
  files.value = filesList.map((file, i) => ({
    ...file,
    ...(previews[i] && { location: previews[i] })
  }))
  ruleImageUrl.value = files.value[0].location
  filesProcessing.value = false
  console.log('file details ________________________', files)

  studentData.value.uploadedFile = {
    file: files.value[0].blob,
    name: files.value[0].name
  }
}

const onAdvancedUpload = async (event) => {
  const file = event.files[0]
  try {
    const reader = new FileReader()

    if (file.type.startsWith('application/pdf') || file.type.startsWith('image/')) {
      reader.readAsDataURL(file)
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Unsupported file type: Only PDF and image files are allowed.',
        life: 3000
      })
    }
    reader.onloadend = function () {
      if (reader.error) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `${reader.error.message}`,
          life: 3000
        })
      }

      const fileData = reader.result
      imageData.value = fileData
      studentData.value.uploadedFile = event.files

      const formData = new FormData()
      formData.append('file', file, file.name)
      studentData.value.uploadedFile = formData

      console.log('File data:', formData)
      console.log('File data:', studentData.value.uploadedFile)
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: `${error.message}`,
      life: 3000
    })
  }
}

const formatSize = (bytes) => {
  const k = 1024
  const dm = 3
  const sizes = $primevue.config.locale.fileSizeTypes

  if (bytes === 0) {
    return `0 ${sizes[0]}`
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))

  return `${formattedSize} ${sizes[i]}`
}

const removeUploadedFileCallback = async () => {
  console.log('remove______')

  // studentData.value.uploadedFile = []
}

const searchStudent = async () => {
  studentStore.searchStudent(studentData.value.serial)
}
</script>

<style lang="scss">
.student-creation-container {
  display: flex;
  flex-grow: 1;

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
