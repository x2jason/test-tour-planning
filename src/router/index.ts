import { createRouter, createWebHistory } from 'vue-router'
import DriverManagement from '@/views/DriverManagement.vue'
import TourManagement from '@/views/TourManagement.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/drivers',
    },
    {
      path: '/drivers',
      name: 'drivers',
      component: DriverManagement,
    },
    {
      path: '/tours',
      name: 'tours',
      component: TourManagement,
    },
  ],
})

export default router
