<script setup lang="ts">
import TheTimer from "@/components/timer/TheTimer.vue";
import { RealTimer } from "@/components/timer/timer"
</script>

<template>
  <div>
    <TheTimer :interval="10" :timer="new RealTimer()" :defaultDuration="30000"/>
  </div>
</template>
