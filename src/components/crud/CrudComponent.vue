<script setup lang="ts">
import {ref} from 'vue'
import {type Person, PersonsRepository} from './personsRepository'

const props = defineProps<{
  repository: PersonsRepository
}>()
const {repository} = props

const persons = ref<Person[]>(repository.getAll())
const selectedPerson = ref<Person | null>(null)
const name = ref<string>('')
const surname = ref<string>('')
const filter = ref<string>('')

const handlePersonListItemClicked = (person: Person) => {
  selectedPerson.value = person
}

const handleCreateClicked = (event: Event) => {
  event.preventDefault()

  repository.createPerson(name.value, surname.value)
  name.value = ''
  surname.value = ''
}

const handleUpdateClicked = (event: Event) => {
  event.preventDefault()

  const personToUpdate = selectedPerson.value
  if (!personToUpdate) { return }

  repository.update(personToUpdate, name.value, surname.value)
  name.value = ''
  surname.value = ''
}

const handleDeleteClicked = (event: Event) => {
  event.preventDefault()

  const personToDelete = selectedPerson.value
  if (!personToDelete) { return }

  repository.delete(personToDelete)
}

const personFilter = (person: Person): boolean => {
  if (filter.value === '') {
    return true
  }
  return person.surname.toLowerCase().startsWith(filter.value.toLowerCase())
}

</script>

<template>
  <div class="bg-gray-200 p-4">
    <div class="mb-4">
      <label for="filter" class="text-black mr-4">Filter prefix:</label>
      <input name="filter" v-model="filter" class="text-black" />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="mb-4" :style="{height: '150px'}">
        <ul class="h-4/5 bg-white list-none overflow-y-scroll">
          <li v-for="person in persons.filter(personFilter)" :key="person.id"
              :class="[person === selectedPerson ? 'bg-blue-500 text-white' : 'text-black']"
              @click="handlePersonListItemClicked(person)"
          >
            {{ person.name }} {{ person.surname}}
          </li>
        </ul>
      </div>

      <div>
        <div class="flex justify-end mb-4">
          <label for="name" class="text-black mr-4">name:</label>
          <input name="name" v-model="name" class="text-black" />
        </div>

        <div class="flex justify-end mb-4">
          <label for="surname" class="text-black mr-4">surname:</label>
          <input name="surname" v-model="surname" class="text-black" />
        </div>
      </div>
    </div>

    <div class="w-3/5 flex justify-between">
      <button name="create" @click="handleCreateClicked" class="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
      <button name="update" @click="handleUpdateClicked" class="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
      <button name="delete" @click="handleDeleteClicked" class="bg-blue-500 text-white px-4 py-2 rounded">Delete</button>
    </div>
  </div>
</template>
