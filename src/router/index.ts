import { createRouter, createWebHistory } from 'vue-router'
import ProfileDetail from './../components/profile/ProfileDetails.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProfileDetail
    }
  ]
})

export default router
