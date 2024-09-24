<template>
  <div
    class="file-picker-container flex flex-column"
    :class="{
      'file-picker-container--drop-zone-active': dropZoneActive,
      'file-picker-container--processing': processing,
      'file-picker-container--promotion': props.isPromotion
    }"
    @dragenter.prevent="onDragOver"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
  >
    <!-- <LoadingOverlay v-if="processing" :is-full-page="false" :darken="false" /> -->
    <div v-if="showFilePicker">
      <label for="file-input" class="file-picker__file-input-label flex flex-column">
        <div class="file-picker__icon-container text-center">
          <img src="" alt="image-gallery" />
        </div>
        <div class="file-picker__text-container text-center">
          <div class="file-picker__title text-center">
            <span v-if="unsupportedFileType">
              <span class="unsupported-file-type">unsupported</span>
            </span>
            <span v-else-if="dropZoneActive">
              <span>drop zone active</span>
            </span>
            <span v-else>
              <span>drag and drop &nbsp;</span>
              <span class="underline">choose file</span>
            </span>
          </div>
          <span class="file-picker__subtitle" :class="{ 'file-picker__subtitle--highlighted': unsupportedFileType }">
            {{ props.fileTypesText }}
          </span>
        </div>
        <div class="file-picker__input-container hidden">
          <input
            id="file-input"
            class="file-picker__file-input"
            type="file"
            :accept="props.fileTypes.join(',')"
            :multiple="props.maxFiles !== 1"
            @change="onFileInputChange"
          />
        </div>
      </label>
    </div>

    <div v-if="files.length & !isLargerImagePreview" class="file-preview-container flex flex-column">
      <div v-for="file in files" :key="file.name" class="file-preview flex flex-row">
        <div v-if="file.location" class="file-preview__image-container flex">
          <img :src="file.location" :alt="file.name" />
        </div>
        <div class="file-preview__name-container flex flex-grow-1 align-items-center">
          <span>{{ file.name }}</span>
        </div>
        <div class="file-preview__action-container flex align-items-center">
          <i class="material-icons cancel" title="file preview" @click="onClickRemoveFile(file)"></i>
        </div>
      </div>
    </div>
    <div v-else-if="files.length">
      <div v-for="file in files" :key="file.name" class="larger-file-preview-container flex flex-column">
        <div class="larger-file-preview flex flex-row relative">
          <div v-if="file.location" class="larger-file-preview__image-container flex flex-column">
            <img :src="file.location" :alt="file.name" />
            <div class="larger-file-preview__image-name-container">
              <p class="larger-file-preview__image-name-tag">{{ imageDisplayName }}</p>
            </div>
          </div>
          <div class="larger-file-preview__action-container flex align-items-center absolute">
            <i class="material-icons cancel" title="remove image" @click="onClickRemoveFile(file)"></i>
          </div>
        </div>
        
        <div v-if="!props.isPromotion" class="larger-file-preview__name-container flex flex-grow-1 align-items-center">
          <span>{{ file.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { uniqBy } from 'lodash'
import { onMounted, onUnmounted, ref, watch } from 'vue'
// import { useI18n } from 'vue-i18n'
// import LoadingOverlay from './LoadingOverlay.vue'

const processing = ref(false)

const props = defineProps({
  files: {
    type: Array,
    required: false,
    default: []
  },
  fileTypes: {
    type: Array,
    required: false,
    default: ['*']
  },
  fileTypesText: {
    type: String,
    required: false,
    default: ''
  },
  maxFiles: {
    type: Number,
    required: false,
    default: -1
  },
  generatePreview: {
    type: Boolean,
    required: false,
    default: true
  },
  processing: {
    type: Boolean,
    required: false,
    default: false
  },
  imageDisplayName: {
    type: String,
    required: false,
    default: ''
  },
  isLargerImagePreview: {
    type: Boolean,
    required: false,
    default: false
  },
  isFilePickerTemplateHide: {
    type: Boolean,
    required: false,
    default: false
  },
  isPromotion: {
    type: Boolean,
    required: false,
    default: false
  }
})
const emit = defineEmits(['update:files', 'onFileRemoved', 'onFilesAdded'])

const showFilePicker = ref(props.files.length && props.maxFiles === 1 ? false : true)
const files = ref(props.files)
const promotionName = ref('')

watch(
  () => props.processing,
  (newValue) => {
    processing.value = newValue
  }
)

watch(
  () => props.files,
  (newValue) => {
    files.value = newValue
  }
)

watch(
  () => props.promotionName,
  (newValue) => {
    promotionName.value = newValue
  }
)

const delay = async(duration) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, duration)
  })
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop']
onMounted(() => {
  if (props.isFilePickerTemplateHide) {
    showFilePicker.value = false
  }
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults)
  })
})
onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults)
  })
})

const dropZoneActive = ref(false)
const unsupportedFileType = ref(false)

let inActiveTimeout = null
const onDragOver = (e) => {
  if (showFilePicker.value) {
    e.dataTransfer.effectAllowed = 'move'
    dropZoneActive.value = true
    clearTimeout(inActiveTimeout)
  }
}
const onDragLeave = () => {
  if (showFilePicker.value) {
    /*
     * Adding timeout to avoid flicker on child components
     */
    inActiveTimeout = setTimeout(() => {
      dropZoneActive.value = false
    }, 50)
  }
}
const onDrop = async (e) => {
  if (showFilePicker.value) {
    dropZoneActive.value = false
    if (await addFiles(e.dataTransfer.files)) {
      notifyFilesUpdate()
    } else {
      unsupportedFileType.value = true
      await delay(1500)
      unsupportedFileType.value = false
    }
  }
}

const onFileInputChange = async (e) => {
  if (await addFiles(e.target.files)) {
    notifyFilesUpdate()
  } else {
    unsupportedFileType.value = true
    await delay(1500)
    unsupportedFileType.value = false
  }
}
const onClickRemoveFile = (file) => {
  files.value = files.value.filter((f) => f.name !== file.name)
  emit('onFileRemoved', { removedFile: file, filesList: [...files.value] })
  if (!files.value.length) {
    showFilePicker.value = true
  }
}

function notifyFilesUpdate() {
  emit('update:files', [...files.value])
}

async function addFiles(filesList) {
  processing.value = true
  let filesArray = Array.from(filesList)
  if (props.maxFiles !== -1) {
    filesArray = filesArray.slice(0, props.maxFiles)
  }
  if (!areFileTypesSupported(filesArray)) {
    processing.value = false
    return false
  }

  let previews = []
  if (props.generatePreview) {
    previews = await generatePreviews(filesArray)
  }
  filesArray = filesArray.map((file, i) => ({
    name: file.name,
    blob: file,
    location: previews[i]
  }))
  files.value = uniqBy([...files.value, ...filesArray], 'name')
  if (props.maxFiles !== -1) {
    files.value = files.value.slice(-props.maxFiles)
  }
  emit('onFilesAdded', { newFiles: filesArray, filesList: [...files.value] })
  processing.value = false
  if (props.maxFiles === 1) {
    showFilePicker.value = false
  }
}
function areFileTypesSupported(files) {
  return files.map((file) => file.type).every((fileType) => props.fileTypes.includes(fileType))
}
function preventDefaults(e) {
  e.preventDefault()
}
async function generatePreviews(files) {
  await delay(1500)
  return Promise.all(files.map((file) => toBase64(file)))
}
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
</script>
<style lang="scss" scoped>
.file-picker-container--processing,
.file-picker-container {
  width: 192px;
  height: 242px;
  justify-content: center;
}
.file-picker-container--promotion {
  width: 185px;
  height: 225px;
  align-items: center;
  justify-content: center;
}
.file-picker {
  &-container {
    position: relative;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    padding: 8px;
    gap: 24px;

    &--drop-zone-active {
      border: 1px dashed #444444;
    }

    &--processing {
      min-height: 160px;
    }
  }
  &__file-input-label {
    cursor: pointer;
    padding: 12px;
  }
  &__title {
    font-weight: 500;
    margin-bottom: 8px;
  }
  &__subtitle {
    color: #555555;
    font-weight: 500;
    font-size: 12px;
    transition: color 1s linear;

    &--highlighted {
      color: #000;
      transition: none;
    }
  }
}
.file-preview {
  gap: 8px;

  &-container {
    gap: 8px;
  }
  &__image-container {
    min-width: 40px;

    img {
      max-width: 40px;
      max-height: 40px;
      border-radius: 4px;
    }
  }
  &__action-container {
    color: #555555;

    i {
      font-size: 20px;
      cursor: pointer;
      transition: color 200ms linear;

      &:hover {
        color: rgb(51, 51, 51);
      }
    }
  }
}
.larger-file-preview {
  gap: 8px;

  &-container {
    gap: 8px;
  }
  &__image-container {
    min-width: 40px;

    img {
      max-height: 200px;
      border-radius: 4px;
    }
  }
  &__action-container {
    color: #555555;
    right: 0;
    i {
      font-size: 20px;
      cursor: pointer;
      transition: color 200ms linear;

      &:hover {
        color: rgb(51, 51, 51);
      }
    }
  }
  &__name-container {
    max-width: 150px;
  }
  &__image-name-container {
    width: 150px;
    position: relative;
    display: flex;
    justify-content: center;

    p {
      position: absolute;
      bottom: 10px;
      background: white;
      font-size: 0.75rem;
      max-width: 90%;
    }
  }
}
</style>
