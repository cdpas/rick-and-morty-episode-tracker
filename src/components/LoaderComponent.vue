<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  show: Boolean
});
</script>

<template>
  <div v-if="props.show" class="fixed inset-0 flex items-center justify-center z-50 bg-slate-200 bg-opacity-50">
    <div class="flex items-center">
      <svg class="animate-spin h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"></circle>
        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" class="opacity-75"></path>
      </svg>
    </div>
  </div>
</template>