<script setup lang="ts">
import {ref} from 'vue'
import type {Person, PersonsRepository} from "@/components/crud/PersonsRepository";

const props = defineProps<{
  repository: PersonsRepository
}>()
const {repository} = props

const persons = ref<Person[]>([])
const selectedPerson = ref<Person | null>(null)
const name = ref<string>('')
const surname = ref<string>('')
const filter = ref<string>('')

const handlePersonListItemClicked = (person: Person) => {
  selectedPerson.value = person
}

const handleCreateClicked = async () => {
  await repository.create(name.value, surname.value)
  persons.value = await repository.getAll()
  name.value = ''
  surname.value = ''
}

const handleUpdateClicked = async () => {
  const personToUpdate = selectedPerson.value
  if (!personToUpdate) { return }

  await repository.update(personToUpdate, name.value, surname.value)
  persons.value = await repository.getAll()
  name.value = ''
  surname.value = ''
}

const handleDeleteClicked = async () => {
  const personToDelete = selectedPerson.value
  if (!personToDelete) { return }

  await repository.delete(personToDelete)
  persons.value = await repository.getAll()
  selectedPerson.value = null
}

const personFilter = (person: Person): boolean => {
  if (filter.value === '') {
    return true
  }
  return person.surname.toLowerCase().startsWith(filter.value.toLowerCase())
}

</script>

<template>
  <div class="card">
    <div class="mb-4">
      <label for="filter" class="text-black mr-4">Filter prefix:</label>
      <input name="filter" v-model="filter" class="text-black rounded" />
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
          <input name="name" v-model="name" class="text-black rounded" />
        </div>

        <div class="flex justify-end mb-4">
          <label for="surname" class="text-black mr-4">surname:</label>
          <input name="surname" v-model="surname" class="text-black rounded" />
        </div>
      </div>
    </div>

    <div class="w-3/5 flex justify-between">
      <button name="create" @click="handleCreateClicked" class="btn">Create</button>
      <button name="update" @click="handleUpdateClicked" class="btn">Update</button>
      <button name="delete" @click="handleDeleteClicked" class="btn">Delete</button>
    </div>
  </div>
</template>
