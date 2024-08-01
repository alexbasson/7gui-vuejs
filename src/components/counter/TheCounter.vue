<script setup lang="ts">
import { ref } from 'vue'

const counter = ref(0)
</script>

<template>
  <div class="w-1/6">
    <p data-testid='counter' class="mb-4">count: {{ counter }}</p>

    <button @click="counter++" class="bg-blue-500 text-white w-full px-4 py-2 rounded">Count</button>
  </div>
</template>
