<script setup>
import { defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  content: String
})
const emit = defineEmits(['close'])

function close() {
  emit('close')
}
watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      setTimeout(() => {
        close()
      }, 10000)
    }
  }
)
</script>
<template>
  <div class="absolute flex w-full">
    <div
      id="toast-default"
      class="flex m-auto items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow"
      role="alert"
      v-if="props.visible"
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg"
      >
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="red"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
          />
        </svg>
        <span class="sr-only">Error icon</span>
      </div>
      <div class="ms-3 text-sm font-normal">
        <p>Oh Geez...</p>
        <p>{{ props.content }}</p>
      </div>
      <button
        type="button"
        class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white"
        data-dismiss-target="#toast-default"
        aria-label="Close"
        @click="close"
      >
        <span class="sr-only">Close</span>
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
