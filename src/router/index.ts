
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/components/SignupForm.vue'),
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('@/components/MenuForm.vue'),
    },
    {
      path: '/feed',
      name: 'feed',
      component: () => import('@/components/FeedBeesForm.vue'),
    },
    {
      path: '/mite',
      name: 'mite',
      component: () => import('@/components/MiteForm.vue'),
    },
    {
      path: '/treatment',
      name: 'treatment',
      component: () => import('@/components/TreatmentForm.vue'),
    },
    {
      path: '/harvesthoney',
      name: 'harvesthoney',
      component: () => import('@/components/HarvestHoneyForm.vue'),
    },
    {
      path: '/winterize',
      name: 'winterize',
      component: () => import('@/components/WinterizeForm.vue'),
    },
    {
      path: '/deadhive',
      name: 'deadhive',
      component: () => import('@/components/DeadHiveForm.vue'),
    },
    {
      path: '/logsymptoms',
      name: 'logsymptoms',
      component: () => import('@/components/LogSymptomsForm.vue'),
    },
    {
      path: '/requeen',
      name: 'requeen',
      component: () => import('@/components/RequeenForm.vue'),
    },
    {
      path: '/flora',
      name: 'flora',
      component: () => import('@/components/DocumentFloraForm.vue'),
    }
  ]
})

export default router;