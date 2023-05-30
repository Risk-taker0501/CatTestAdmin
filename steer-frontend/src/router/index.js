import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/User.vue'),
      },
      {
        path: '/driverId',
        name: 'DriverID',
        component: () => import('@/views/DriverId.vue'),
      },
      {
        path: '/scenario',
        name: 'Scenario',
        component: () => import('@/views/Scenario.vue'),
      },
      {
        path: '/license',
        name: 'License Plate',
        component: () => import('@/views/License.vue'),
      },
      {
        path: '/admin',
        name: 'Manage Admin',
        component: () => import('@/views/Admin.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pages/Login'),
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
