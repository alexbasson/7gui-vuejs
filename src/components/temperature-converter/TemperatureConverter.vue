<script setup lang="ts">
import {ref} from 'vue'

const fahrenheit = ref('')
const celsius = ref('')

const celsiusToFahrenheit = (c: number): number => c * (9 / 5) + 32
const fahrenheitToCelsius = (f: number): number => (f - 32) * (5 / 9)

const onCelsiusChange = (event: Event): void => {
  let value = (event.target as HTMLInputElement).value;
  if (value.length === 0) {
    celsius.value = ''
    fahrenheit.value = ''
    return
  }

  const newCelsius = parseInt(value)

  if (isNaN(newCelsius)) { return }

  celsius.value = `${newCelsius}`
  fahrenheit.value = `${celsiusToFahrenheit(newCelsius)}`
}

const onFahrenheitChange = (event: Event): void => {
  let value = (event.target as HTMLInputElement).value;
  if (value.length === 0) {
    celsius.value = ''
    fahrenheit.value = ''
    return
  }

  const newFahrenheit = parseInt(value)

  if (isNaN(newFahrenheit)) { return }

  fahrenheit.value = `${newFahrenheit}`
  celsius.value = `${fahrenheitToCelsius(newFahrenheit)}`
}
</script>

<template>
  <div class="card">
    <div class="flex justify-between align-middle">
      <div>
        <label for="celsius" class="mr-4">celsius:</label>
        <input name="celsius" :value="celsius" @input="onCelsiusChange" class="text-black p-2 rounded" />
      </div>

      <div>
        <label for="fahrenheit" class="mr-4">fahrenheit:</label>
        <input name="fahrenheit" :value="fahrenheit" @input="onFahrenheitChange" class="text-black p-2 rounded" />
      </div>
    </div>
  </div>
</template>
