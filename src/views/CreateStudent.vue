<template>
  <section class="student-creation-container">
    <Toast />
    <section class="student-creation-sub-container flex-grow-1">
      <h2>STUDENT ADDING</h2>
      <Divider />
      <section class="flex flex-row mt-5">
        <div class="input-field-container">
          <label class="font-semibold mb-2">Student serial number</label>
          <InputText
            v-model="studentData.serial"
            id="mark_03"
            class="flex-auto"
            autocomplete="off"
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
      <section class="file-upload-container">
        <Toast />
        <div class="ml-4">
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
        </div>
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
        <Button type="button" label="Add Student" class="mr-2" @click="addNewStudent"></Button>
        <Button type="button" label="Clear" @click="clearStudentData"></Button>
      </section>
    </section>
  </section>
</template>

<script setup>
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'
import router from '@/router'
import { usePrimeVue } from 'primevue/config'
import { useStudentStore } from '../stores/StudentStore'
import { uploadImage } from '../service/StudentService'
import FilePicker from './component/FilePicker.vue'
const studentStore = useStudentStore()

const $primevue = usePrimeVue()
const toast = useToast()
const imageData = ref()
const streamList = ref(['Essay', 'Art'])
const isEssaySelected = ref(false)
const docType = ref('image')
const studentData = ref({
  serial_no: null,
  stream: null,
  language: null,
  uploadedFile: {}
})
const files = ref([])
const ruleName = ref()
const isLargerImagePreview = ref(true)
const isFilePickerTemplateHide = ref(false)
const filesProcessing = ref(false)
const ruleImageUrl = ref()

const onFilesAdded = async ({ newFiles, filesList }) => {
  filesProcessing.value = true
  const previews = await generatePreviews(filesList)
  files.value = filesList.map((file, i) => ({
    ...file,
    ...(previews[i] && { location: previews[i] })
  }))
  ruleImageUrl.value = files.value[0].location
  filesProcessing.value = false
  console.log('file details ________________________',files);

  studentData.value.uploadedFile = {
    file: files.value[0].blob,
    name: files.value[0].name
  }
}

async function generatePreviews(files) {  
  return Promise.all(
    files.map((file) => (file.blob ? studentStore.uploadImage(file) : null))
  )
}

onMounted(async () => {})

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

const onStreamSelect = async (event) => {
  // console.log('log______', event)
  if (event.value === 'Essay') {
    isEssaySelected.value = true
    docType.value = 'application'
  } else {
    isEssaySelected.value = false
    docType.value = 'image'
  }
}

const addNewStudent = async () => {
  try {
    console.log('log____________', studentData.value)

    await studentStore.addStudentData(studentData.value)
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

const clearStudentData = () => {
  studentData.value = {
    serial: null,
    stream: null,
    language: null,
    uploadedFile: []
  }
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
    justify-content: flex-end;
    padding-top: 1rem;
  }

  .input-field-container {
    display: grid;
    margin-right: 20px;

    input {
      width: 250px;
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
