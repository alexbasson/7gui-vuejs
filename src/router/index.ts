import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
