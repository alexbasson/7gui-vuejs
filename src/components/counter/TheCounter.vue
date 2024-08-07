<script setup lang="ts">
import { ref } from 'vue'

const counter = ref(0)
</script>

<template>
  <div class="w-1/6">
    <p data-testid='counter' class="mb-4">count: {{ counter }}</p>

    <button @click="counter++" class="w-full btn">Count</button>
  </div>
</template>
