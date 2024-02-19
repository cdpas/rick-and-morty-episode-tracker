<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, onBeforeMount } from 'vue'
import { useEpisodesStore } from '@/stores/episodesStore'
import rickAndMorty from '@/assets/images/Rick_and_Morty.svg'
import ToastComponent from '@/components/ToastComponent.vue'
import SingleEpisodeComponent from '@/components/SingleEpisodeComponent.vue'
import LoaderComponent from '@/components/LoaderComponent.vue'

const episodesStore = useEpisodesStore()
const page = ref(1)
const maxPage = ref()
const loaded = ref(false)
const errorMessage = ref('')
const showErrorToast = ref(false)
const hasFilteredResults = ref('all')
const characters = reactive(episodesStore.characters)
const episodes = ref([...episodesStore.episodes])
const filters = ['all', 'watched', 'unwatched', 'watching', 'favorites']

const getAllEpisodes = async () => {
  try {
    const res = await episodesStore.getAllEpisodes(page.value)
    if (res.status !== 200) {
      errorMessage.value = "Episodes could not be loaded"
      showErrorToast.value = true
    } else {
      const results = res.data.results
      maxPage.value = res.data.info.pages
      getCharacters(results)
      results.forEach(obj => (obj.watching = false))
      episodesStore.storeEpisodes(results)
    }
    loaded.value = true
  } catch (error) {
    console.error(error)
    errorMessage.value = "Episodes could not be loaded"
    showErrorToast.value = true
    loaded.value = true
  }
}

const getCharacters = async (results) => {
  for (let result of results) {
    const firstFiveCharacters = result.characters.slice(0, 5)
    for (let url of firstFiveCharacters) {
      if (!characterExists(url)) {
        try {
          const res = await episodesStore.getCharacter(url)
          if (res.status !== 200) {
            errorMessage.value = "There was a problem to get the Characters"
            showErrorToast.value = true
          } else {
            let singleCharacter = { url, data: res.data }
            characters.push(singleCharacter)
          }
        } catch (error) {
          console.error(error)
          errorMessage.value = "There was a problem to get the Characters"
          showErrorToast.value = true
        }
      }
    }
  }
}

const characterExists = (url) => {
  return characters.some(obj => obj.url === url)
}

const markEpisodeAsSeen = (data) => {
  const selectedEpisode = episodesStore.episodes.find(obj => obj.id === data.id)
  selectedEpisode.watched = data.value
  if (hasFilteredResults.value === 'watched' || hasFilteredResults.value === 'unwatched') {
    filterEpisodes(data.value ? 'watched' : 'unwatched')
  }
}

const markEpisodeAsFavorite = (data) => {
  const selectedEpisode = episodesStore.episodes.find(obj => obj.id === data.id)
  selectedEpisode.favorite = data.value
  if (hasFilteredResults.value === 'favorites') {
    filterEpisodes('favorites')
  }
}

const markEpisodeAsWatching = (data) => {
  const selectedEpisode = episodesStore.episodes.find(obj => obj.id === data.id)
  selectedEpisode.watching = data.value
  if (hasFilteredResults.value === 'watching') {
    filterEpisodes('watching')
  }
}
const filterEpisodes = (option) => {
  switch (option) {
    case 'all':
      hasFilteredResults.value = 'all'
      episodes.value = episodesStore.episodes
      break
    case 'watched':
      hasFilteredResults.value = 'watched'
      episodes.value = episodesStore.episodes.filter(obj => obj.watched)
      break
    case 'unwatched':
      hasFilteredResults.value = 'unwatched'
      episodes.value = episodesStore.episodes.filter(obj => !obj.watched)
      break
    case 'watching':
      hasFilteredResults.value = 'watching'
      episodes.value = episodesStore.episodes.filter(obj => obj.watching)
      break
    case 'favorites':
      hasFilteredResults.value = 'favorites'
      episodes.value = episodesStore.episodes.filter(obj => obj.favorite)
      break
    default:
      episodes.value = episodesStore.episodes
  }
}

const scrollHandler = () => {
  if (window.innerHeight + window.scrollY >= document.documentElement.offsetHeight) {
    if (page.value < maxPage.value) {
      page.value++
      getAllEpisodes()
    } else {
      page.value = maxPage.value
    }
  }
}
const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
onBeforeMount(() => {
  getAllEpisodes()

})
onMounted(() => {
  episodes.value = episodesStore.episodes
  window.addEventListener('scroll', scrollHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrollHandler)
}) 
</script>

<template>
  <div class="bg-slate-900 h-full pb-6">
    <ToastComponent :visible="showErrorToast" :content="errorMessage" @close="showErrorToast = false" />
    <LoaderComponent :show="!loaded" />
    <div class="grid grid-cols-1 content-start items-center p-5">
      <img :src="rickAndMorty" class="m-auto" />
      <h1 class="m-auto font-bold text-2xl sm:text-4xl mt-2 mb-2 text-green-500">Episode Tracker</h1>
    </div>
    <div class="grid grid-cols-1 content-start items-center">
      <div class="m-auto mt-4 pl-4 pr-4 sm:pl-0 sm:pr-0" v-if="loaded">
        <div class="text-center mb-6">
          <div class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer text-center border-solid border-2"
            v-for="filter in filters"
            :key="filter"
            @click="filterEpisodes(filter)"
            :class="{ 'border-green-500': filter === hasFilteredResults }"
          >
            <div class="flex">
              <p>{{ filter.toLocaleUpperCase() }}</p>
            </div>
          </div>
        </div>
        
        <div class="max-w-xl rounded overflow-hidden shadow-lg mb-4 bg-slate-400"
          v-for="episode in episodes"
          :key="episode.id"
        >
          <SingleEpisodeComponent :episode="episode"
            @markAsSeen="markEpisodeAsSeen"
            @markAsFavorite="markEpisodeAsFavorite"
            @markAsWatching="markEpisodeAsWatching"
          />
        </div>
      </div>
    </div>
    <button @click="scrollToTop" 
            class="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
      </svg>
    </button>
  </div>
</template>