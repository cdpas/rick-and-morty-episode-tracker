<script setup>
import { defineProps, defineEmits } from 'vue'
import {
  HeartIcon,
  EyeIcon,
  EyeSlashIcon,
  VideoCameraIcon,
  VideoCameraSlashIcon
} from '@heroicons/vue/24/solid'
import { useEpisodesStore } from '@/stores/episodesStore'

const prop = defineProps({
  episode: Object
})
const emit = defineEmits(['markAsSeen', 'markAsFavorite', 'markAsWatching'])

function markAsSeen(value) {
  emit('markAsSeen', { value: value, id: prop.episode.id })
}
function markAsFavorite(value) {
  emit('markAsFavorite', { value: value, id: prop.episode.id })
}
function markAsWatching(value) {
  emit('markAsWatching', { value: value, id: prop.episode.id })
}

const characters = useEpisodesStore().characters

function findCharacter(url) {
  return characters.find((obj) => obj.url === url)?.data
}
</script>

<template>
  <div
    class="px-6 py-4 relative border-solid border-4"
    :class="[
      { 'border-red-500': episode.favorite && episode.watched },
      { 'border-slate-400': !episode.favorite || !episode.watched }
    ]"
    v-if="episode"
  >
    <div class="absolute top-5 right-5 " v-if="episode.watched">
      <HeartIcon
        class="h-8 w-8 cursor-pointer drop-shadow-lg"
        :class="[{ 'text-red-500': episode.favorite }, { 'text-slate-900': !episode.favorite }]"
        @click="markAsFavorite(!episode.favorite)"
      />
    </div>
    <div class="font-bold text-xl mb-0 text-black max-w-[90%]">
      {{ episode.episode }} - {{ episode.name }}
    </div>
    <div class="font-bold text-ml mb-2 text-slate-700">{{ episode.air_date }}</div>
    <div class="px-6 pt-4 pb-2">
      <div
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        v-for="url in episode.characters.slice(0, 5)"
        :key="url"
      >
        <div class="flex">
          {{ findCharacter(url)?.name }}
          <img
            :src="findCharacter(url)?.image"
            v-if="findCharacter(url)?.image"
            width="25px"
            class="pl-2 rounded-full"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-4 text-center items-end">
      <div></div>
      <div></div>
      <div class="text-center">
        <p class="text-sm text-slate-700 font-bold">{{ episode.watched ? "Watched": "Unwatched"}}</p>
        <div class="content-center">
          <EyeIcon
            class="m-auto w-8 h-8 cursor-pointer text-blue-600 drop-shadow-lg"
            v-if="episode.watched"
            @click="markAsSeen(false)"
          />
          <EyeSlashIcon class="m-auto w-8 h-8 cursor-pointer" v-else @click="markAsSeen(true)" />
        </div>
      </div>
      <div>
        <p class="text-sm text-slate-700 font-bold">{{ episode.watching ? "Watching": ""}}</p>
        <VideoCameraIcon
          class="m-auto w-8 h-8 text-green-600 drop-shadow-lg"
          v-if="episode.watching"
          @click="markAsWatching(false)"
        />
        <VideoCameraSlashIcon class="m-auto w-8 h-8" v-else @click="markAsWatching(true)" />
      </div>
    </div>
  </div>
</template>
