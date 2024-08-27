<template>
    <VideoPlayer
      :volume="1"
      :src="'https://'+AnimeData.host + AnimeData.list[CurrentEpisode].hls[CurrentQuality]"
      :poster="useRuntimeConfig().public.AnimeStaticApi + AnimeData.list[CurrentEpisode].preview"
      controls
    >
      <template v-slot="">
        <div class="video__settings">
          <div class="video__settings-item">
            <UiVSelect
            :options="episodes"
            @inputSelect="EpisodesSelect"
            ></UiVSelect>
          </div>
          <div class="video__settings-item">
            <UiVSelect
            :options="quality"
            @inputSelect="QualitySelect"
            ></UiVSelect>
          </div>
          
          
        </div>
      </template>
    </VideoPlayer>
    
</template>
<script setup>
import 'video.js/dist/video-js.css'
import { VideoPlayer } from '@videojs-player/vue'
const {AnimeData} = defineProps({
  AnimeData: Object
})

let CurrentEpisode = ref(1)
let CurrentQuality = ref('fhd') 

const episodes = computed(() => {
  let list = []
  for (let i = 1; i <= AnimeData.episodes.last; i++){
    list.push(i)
  }
  return list
})
const quality = computed(() => {
  return Object.keys(AnimeData.list[1].hls)
})
function EpisodesSelect(episode){
  CurrentEpisode.value = episode
}
function QualitySelect(quality){
  CurrentQuality.value = quality
}

</script>

<style lang="sass" scoped>
.video
  &-js
    max-width: 1000px
    width: 1000px
    max-height: 562px
    height: 562px
    margin-top: 40px
    
    video 
      border: 0 none
      outline: 0 none
  &__settings
    display: flex
    gap: 10px
    margin: 10px
    transition: visibility 1s, opacity 1s
    visibility: visible
    opacity: 1
.vjs-has-started.vjs-user-inactive.vjs-playing
  .video__settings
    visibility: hidden
    opacity: 0
</style>