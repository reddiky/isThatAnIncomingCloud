import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import pinia from "@/stores";
import { useLocationStore } from '@/stores/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/survey',
      name: 'survey',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SurveyView.vue')
    },
    {
      path: '/weather',
      name: 'weather',
      beforeEnter(to, from, next) {
        const location = useLocationStore(pinia);
        console.log(location, '!!!!!!!!!')
        if (location.primaryLocation === null || location.secondaryLocation === null) {
          next({ path: '/' })
        }
        next()
      },
      component: () => import('../views/WeatherView.vue')
    },
    {
      path: '/comparison',
      name: 'comparison',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/WeatherComparisonView.vue')
    }
  ]
})

export default router
