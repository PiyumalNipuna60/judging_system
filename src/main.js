import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import Lara from '@primevue/themes/lara'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Row from 'primevue/row'
import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'
import Sidebar from 'primevue/sidebar'

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

app.use(PrimeVue, {
  Theme: {
    preset: Lara
  }
})

app.mount('#app')
