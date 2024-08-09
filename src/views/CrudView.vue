<script setup lang="ts">
import CrudComponent from "@/components/crud/CrudComponent.vue";
import {LocalPersonsRepository} from "@/components/crud/LocalPersonsRepository";
</script>

<template>
  <div>
    <CrudComponent :repository="new LocalPersonsRepository()" />
  </div>
</template>
