import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/counter',
      name: 'counter',
      component: () => import('../views/CounterView.vue')
    },
    {
      path: '/temperature-converter',
      name: 'temperatureConverter',
      component: () => import('../views/TemperatureConverterView.vue')
    },
    {
      path: '/flight-booker',
      name: 'flightBooker',
      component: () => import('../views/FlightBookerView.vue')
    },
    {
      path: '/timer',
      name: 'timer',
      component: () => import('../views/TimerView.vue')
    },
    {
      path: '/crud',
      name: 'crud',
      component: () => import('../views/CrudView.vue')
    },
  ]
})

export default router
