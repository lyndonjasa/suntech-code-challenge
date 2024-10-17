import { createRouter, createWebHistory } from 'vue-router'
import ProfileDetail from './../components/profile/ProfileDetails.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: { name: 'profile-detail' }
    },
    {
      path: '/profile/profile-detail',
      name: 'profile-detail',
      component: ProfileDetail
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

export default router
