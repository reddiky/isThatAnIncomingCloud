import { useSurveyStore } from './../stores/index';
import { createRouter, createWebHistory } from 'vue-router'
import SurveyView from '../views/SurveyView.vue'
import pinia from "@/stores";
import { useLocationStore } from '@/stores/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SurveyView
    },
    {
      path: '/location',
      name: 'location',
      beforeEnter(to, from, next) {
        const survey = useSurveyStore(pinia);
        if (survey.temp === null) {
          next({ path: '/' })
        }
        next()
      },
      component: () => import('../views/LocationView.vue')
    },
    {
      path: '/weather',
      name: 'weather',
      beforeEnter(to, from, next) {
        const location = useLocationStore(pinia);
        if (location.primaryLocation === null || location.secondaryLocation === null) {
          next({ path: '/' })
        }
        next()
      },
      component: () => import('../views/WeatherComparisonView.vue')
    }
  ]
})

export default router
