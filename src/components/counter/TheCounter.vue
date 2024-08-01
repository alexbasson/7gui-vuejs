<script setup lang="ts">
import { ref } from 'vue'

const counter = ref(0)
</script>

<template>
  <div>
    <p data-testid='counter'>{{ counter }}</p>
    <button @click="counter++">Count</button>
  </div>
</template>
