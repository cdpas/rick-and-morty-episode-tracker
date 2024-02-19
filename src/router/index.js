import { createRouter, createWebHistory } from 'vue-router'
import EpisodesViewVue from '@/views/EpisodesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'episodes-view',
      component: EpisodesViewVue
    },
    
  ]
})

export default router
