<script setup lang="ts">
import { ref } from 'vue'
import DateFormatter from "@/components/flight-booker/date-formatter";

type FlightType = 'one-way' | 'return'

const validDateRegex = new RegExp("^\\d{4}-\\d{1,2}-\\d{1,2}$")
const dateFormatter = new DateFormatter()

const flightType = ref<FlightType>('one-way')
const departureDate = ref<string>(dateFormatter.format(new Date()))
const departureDateValid = ref<boolean>(true)
const returnDateValid = ref<boolean>(true)
const returnDate = ref<string>(dateFormatter.format(new Date()))
const formEnabled = ref<boolean>(true)
const displayMessage = ref<boolean>(false)

const handleFlightTypeChange = (event: Event) => {
  displayMessage.value = false
  const value = (event.target as HTMLSelectElement).value as FlightType
  flightType.value = value
}

const handleDepartureDateChange = (event: Event) => {
  displayMessage.value = false
  const value = (event.target as HTMLInputElement).value
  departureDate.value = value

  const dateIsValid = validDateRegex.test(value)
  formEnabled.value = dateIsValid
  departureDateValid.value = dateIsValid
}

const handleReturnDateChange = (event: Event) => {
  displayMessage.value = false
  const value = (event.target as HTMLInputElement).value
  returnDate.value = value

  const dateIsValid = validDateRegex.test(value)
  const departureDateIsBeforeReturnDate = (new Date(departureDate.value) <= new Date(returnDate.value))
  formEnabled.value = dateIsValid && departureDateIsBeforeReturnDate
  returnDateValid.value = dateIsValid && departureDateIsBeforeReturnDate
}

const handleSubmit = (event: Event) => {
  event.preventDefault()

  displayMessage.value = true
}
</script>

<template>
  <form @submit="handleSubmit" class="w-2/4">
    <div class="mb-4">
      <select :value="flightType" @change="handleFlightTypeChange" class="w-full text-black p-2">
        <option value="one-way">One way</option>
        <option value="return">Return</option>
      </select>
    </div>

    <div class="flex justify-between mb-4">
      <label for="departure" class="mr-2">departure date:</label>
      <input name="departure" :value="departureDate" @input="handleDepartureDateChange" class="text-black p-2" :class="[departureDateValid ? 'bg-white' : 'bg-red-500']" />
    </div>

    <div class="flex justify-between mb-4">
      <label for="return" class="mr-2">return date:</label>
      <input name="return" :value="returnDate" @input="handleReturnDateChange" :disabled="flightType === 'one-way'" class="text-black p-2 disabled:text-gray-400" :class="[returnDateValid ? 'bg-white' : 'bg-red-500']" />
    </div>

    <div class="mb-4">
      <button type="submit" :disabled="!formEnabled" class="w-full bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400">Submit</button>
    </div>

    <div>
      <p v-if="displayMessage" class="text-white text-lg">You have booked a {{ flightType }} flight on {{ departureDate }}.</p>
    </div>
  </form>
</template>
