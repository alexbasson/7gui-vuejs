<script setup lang="ts">
import {RouterLink, RouterView, useRoute} from 'vue-router'
import {computed} from "vue";
const route = useRoute()
const path = computed(() => route.path)
</script>

<template>
  <div class="flex justify-center mt-8">
    <div class="w-[60rem] mx-auto">
      <div class="w-[19rem] float-left pr-8">
        <ul>
          <li class="nav-link" :class="[path === '/counter' ? 'nav-link-active' : 'nav-link-inactive']"><RouterLink to="/counter">Counter</RouterLink></li>
          <li class="nav-link" :class="[path === '/temperature-converter' ? 'nav-link-active' : 'nav-link-inactive']"><RouterLink to="/temperature-converter">Temperature Converter</RouterLink></li>
          <li class="nav-link" :class="[path === '/flight-booker' ? 'nav-link-active' : 'nav-link-inactive']"><RouterLink to="/flight-booker">Flight Booker</RouterLink></li>
          <li class="nav-link" :class="[path === '/timer' ? 'nav-link-active' : 'nav-link-inactive']"><RouterLink to="/timer">Timer</RouterLink></li>
          <li class="nav-link" :class="[path === '/crud' ? 'nav-link-active' : 'nav-link-inactive']"><RouterLink to="/crud">CRUD</RouterLink></li>
        </ul>
      </div>

      <div class="w-[41rem] ml-[19rem]">
        <RouterView/>
      </div>
    </div>
  </div>
</template>
