import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import Lara from '@primevue/themes/lara'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Row from 'primevue/row'
import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'
import Sidebar from 'primevue/sidebar'
import Tag from 'primevue/tag'
import MultiSelect from 'primevue/multiselect'
import RadioButton from 'primevue/radiobutton'
import Divider from 'primevue/divider'
import ColumnGroup from 'primevue/columngroup'
import ConfirmPopup from 'primevue/confirmpopup'
import FileUpload from 'primevue/fileupload'
import ProgressBar from 'primevue/progressbar'
import Badge from 'primevue/badge'
import Checkbox from 'primevue/checkbox';
import Image from 'primevue/image';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Skeleton from 'primevue/skeleton';

import ExcelJS from 'exceljs'; 

import './assets/main.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastService)
app.use(ConfirmationService)

app.component('InputText', InputText)
app.component('Button', Button)
app.component('Dropdown', Dropdown)
app.component('Row', Row)
app.component('Column', Column)
app.component('DataTable', DataTable)
app.component('Dialog', Dialog)
app.component('Toast', Toast)
app.component('Sidebar', Sidebar)
app.component('Tag', Tag)
app.component('MultiSelect', MultiSelect)
app.component('RadioButton', RadioButton)
app.component('Divider', Divider)
app.component('ColumnGroup', ColumnGroup)
app.component('ConfirmPopup', ConfirmPopup)
app.component('InputNumber', InputNumber)
app.component('FileUpload', FileUpload)
app.component('ProgressBar', ProgressBar)
app.component('Badge', Badge)
app.component('Checkbox', Checkbox)
app.component('Image', Image)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.component('Skeleton', Skeleton)

app.config.globalProperties.$exceljs = ExcelJS;

app.use(PrimeVue, {
  Theme: {
    preset: Lara
  }
})

app.mount('#app')
