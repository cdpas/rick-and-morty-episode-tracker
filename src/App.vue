<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-slate-900 h-full min-h-screen">
    <RouterView v-slot="{Component, route}" >
    <Transition name="fade">
      <component :is="Component" :key="route.path" />
    </Transition>
    </RouterView>
  </div>
  
</template>

