import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import AdminPanel from '../views/AdminPanel.vue'
import UserManage from '../views/UserManage.vue'
import PasswordReset from '@/views/PasswordReset.vue'
import CreateStudent from '@/views/CreateStudent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: AdminPanel,
      meta: { requiresAuth: true }
    },
    {
      path: '/manage-user',
      name: 'manage-user',
      component: UserManage,
      meta: { requiresAuth: true }
    },
    {
      path: '/password-reset',
      name: 'password-reset',
      component: PasswordReset,
      meta: { requiresAuth: true }
    },
    {
      path: '/student-add',
      name: 'add-student',
      component: CreateStudent,
      meta: { requiresAuth: true }
    }
  ]
})

export default router
