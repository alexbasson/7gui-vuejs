<script setup lang="ts">
import CrudComponent from "@/components/crud/CrudComponent.vue";
import {PersonsRepository} from "@/components/crud/personsRepository";
</script>

<template>
  <div>
    <CrudComponent :repository="new PersonsRepository()" />
  </div>
</template>
