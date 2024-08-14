<script setup lang="ts">
import { ref } from 'vue'
import { type Timer } from './timer'

const props = defineProps<{
  interval: number,
  defaultDuration: number,
  timer: Timer,
}>()
const {interval, defaultDuration, timer} = props

const duration = ref<number>(defaultDuration)
const handleDurationChange = (event: Event) => {
  const { value } = event.target as HTMLInputElement
  duration.value = parseInt(value)
}

const elapsedTime = ref<number>(0)

const percentComplete = (): number => {
  if (elapsedTime.value < duration.value) {
    return (elapsedTime.value / duration.value) * 100
  }
  return 100
}

const startTimer = () => {
  timer.setInterval(() => {
    if (elapsedTime.value < duration.value) {
      elapsedTime.value = elapsedTime.value + interval
    }
  }, interval)
}
startTimer()
</script>

<template>
  <div class="w-1/2 card">
    <div class="w-full bg-gray-400 h-6 mb-4">
      <div id="progress-bar" class="bg-blue-500 h-6" :style="{width: `${percentComplete()}%`}"></div>
    </div>

    <div class="mb-4">
      <p data-testid='duration'>Duration: {{ (duration / 1000).toFixed(1) }}s</p>
      <p data-testid='elapsed-time'>Elapsed: {{ (elapsedTime / 1000).toFixed(1) }}s</p>
    </div>

    <div class="mb-4">
      <input type="range" :value="duration" @input="handleDurationChange" min="0" max="60000" class="w-full" />
    </div>

    <div>
      <button @click="elapsedTime = 0" class="w-full btn">Reset</button>
    </div>
  </div>
</template>
