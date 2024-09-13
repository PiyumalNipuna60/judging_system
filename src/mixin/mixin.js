import { useRouter } from 'vue-router'
import { useStore, usePinia } from 'pinia'
import { useUserStore } from '../stores/UserStore'
const { isLoggedUser } = useUserStore()

const globalMixin = {
  created() {
    const pinia = usePinia() // Access the Pinia instance
    const store = pinia.store('UserStore')
    const router = useRouter()

    if (this.$route.meta.requiresAuth && !store.isLoggedUser) {
      router.push('/login')
    }
  }
}

export default globalMixin
