import { createRouter, createWebHistory } from 'vue-router'
import ProfileDetail from './../components/profile/ProfileDetails.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: { name: 'profile-details' }
    },
    {
      path: '/profile/profile-details',
      name: 'profile-details',
      component: ProfileDetail
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

export default router
