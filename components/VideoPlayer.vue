<template >
    <div class="video__player">
        <div class="video__setting">
            <div class="video__setting-item">
                <h3 class="main__subtitle">Серия</h3>
                <VCustomSelect 
                :options="GetListOfSeries"
                @InputChange="SeriesChange"
                :default="'1'">
                </VCustomSelect>
            </div>
            <div class="video__setting-item">
                <h3 class="main__subtitle">Качество</h3>
                <VCustomSelect 
                :options="GetQualityOfVideo"
                @InputChange="QualityChange"
                :default="'Full Hd'">
                </VCustomSelect>
            </div>
        </div>
        <VideoPlayer
            :src="'https://'+VideoItem.player.host + VideoItem.player.list[ActiveSeries].hls[ActiveQuality]"
            :poster="useRuntimeConfig().public.AnimePostersApi + VideoItem.player.list[ActiveSeries].preview"
            controls
            :loop="false"
            :volume="0.6"
        >
        </VideoPlayer>
    </div>
        
</template>
<script setup>
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
let ActiveSeries =  ref(1)
let ActiveQuality = ref('fhd')

const props = defineProps({
    VideoItem: {
        type: Object,
        default(){
            return{}
        }
    }
})
function SeriesChange(newSeries){
    ActiveSeries.value = newSeries
}
function QualityChange(newQuality){
    switch (newQuality) {
        case 'SD':
            ActiveQuality.value = 'sd'
            break
        case 'HD':
            ActiveQuality.value = 'hd'
            break
        case 'Full Hd':
            ActiveQuality.value = 'fhd'
            break
    }    
}
const GetListOfSeries = computed(() =>{
    let list = []
    for (let i = 1; i <= props.VideoItem.player.episodes.last; i++){
        list.push(i)
    }
    return list
})

const GetQualityOfVideo = computed(() => {
    let qualitis = []
    let qualitisArray = Object.entries(props.VideoItem.player.list[ActiveSeries.value].hls)
    for (let qualitisArrayItem of  qualitisArray){
        switch (qualitisArrayItem[0]) {
            case 'sd':
                qualitis.push('SD')
                break
            case 'hd':
                qualitis.push('HD')
                break
            case 'fhd':
                qualitis.push('Full Hd')
                break
        }
    }
    return qualitis
})
</script>
<style lang="sass">
.video
    &__player
        max-width: 100%
        margin-top: 40px
        position: relative
    &-js 
        max-width: 100%
        width: 100%
        height: 867px
        cursor: pointer
        *
            outline: 0 none
        .vjs-control-bar
            background: rgba(10, 12, 12, 0.4) !important
    &__setting
        display: flex
        align-items: center
        gap: 20px
        position: absolute
        top: 10px
        left: 20px
        z-index: 3
        &-item
            width: 150px
            .custom-select
                background: $blue
</style>