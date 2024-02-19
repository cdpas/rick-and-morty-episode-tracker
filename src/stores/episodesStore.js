
import { defineStore } from 'pinia'
import axios from 'axios'
const handleApiRequest = async(url, method, data) => {
const response = axios({method, url, data})
return response
}
export const useEpisodesStore = defineStore('episodesStore', {
  state: () => ({
    episodes: [],
    characters: []
  }),
  actions: {
    async getAllEpisodes(page) {
      return handleApiRequest(`https://rickandmortyapi.com/api/episode?page=${page}`, 'GET')
    },
    async getCharacter(url) {
      return handleApiRequest(url, 'GET')
    },
    storeEpisodes(data) {
      const episodeIds = new Set(this.episodes.map(episode => episode.id));
      data.forEach(single => {
        if (!episodeIds.has(single.id)) {
          this.episodes.push(single);
          episodeIds.add(single.id);
        }
      });
    }
  },
  persist: true
})
