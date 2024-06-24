<template>
    <div>
        <TheHeader></TheHeader>
        <VLoader v-if="AnimeStore.IsLoad"></VLoader>
        <main v-else>
            <section class="main">
                <div class="container">
                    <div class="main__img"><img :src="`${useRuntimeConfig().public.AnimeStaticApi}${AnimeStore.CurrentAnime.posters.medium.url}`" alt="MainImg"></div>
                    <div class="main__info">
                        <h1 class="main__title">{{AnimeStore.CurrentAnime.names.ru }}</h1>
                        <h3 class="main__subtitle">Описание:</h3>
                        <p class="main__descript">{{ AnimeStore.CurrentAnime.description}}</p>
                        <h3 class="main__subtitle">Категории</h3>
                        <div class="main__categories">
                            <router-link 
                            to="/" 
                            class="main__categories-item"
                            v-for="(MainCategories, index) in AnimeStore.CurrentAnime.genres"
                            :key="index"
                            >{{ MainCategories }}</router-link>
                        </div>
                        <h3 class="main__subtitle">Франшина</h3>
                        <div class="main__franchies">
                            <NuxtLink
                            v-for="FranchisesItem in CurrentFranshies"
                            :key="FranchisesItem.id"
                            :to="`../anime/${FranchisesItem.code}`"
                            class="main__franchies-item"
                            >
                                <div class="main__franchies-img"><img :src="`${useRuntimeConfig().public.AnimeStaticApi}${FranchisesItem.posters.original.url}`" alt="MainImg"></div>
                                <h3 class="main__franchies-title">{{ FranchisesItem.names.ru }}</h3>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </section>
            <!-- <section class="video">
                <div class="container">
                    <h2 class="section__title">Смотерть аниме</h2>
                    
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
                    </div>
                    
                </div>
                
            </section> -->
        </main>
    </div>
</template>
<script setup>
import {useAnimeStore} from '@/stores/Anime'
const AnimeStore = useAnimeStore()
const route = useRoute()


let ActiveSeries =  ref(1)
let ActiveQuality = ref('fhd')
let IsAnimeActive = ref(false)

AnimeStore.GET_ANIME_FROM_CODE(route.params.name)
onBeforeUnmount(() => {
    AnimeStore.CurrentAnime = []
})


// function SeriesChange(newSeries){
//     ActiveSeries.value = newSeries
// }
const CurrentFranshies = computed(() => {
    AnimeStore.CurrentAnimeFranshies = []
    if (AnimeStore.CurrentAnime?.franchises.length == 0){
        return []
    }
    let FranchisesAnime = AnimeStore.CurrentAnime.franchises[0].releases
    for (let i = 0; i < FranchisesAnime.length; i++){
        AnimeStore.GET_ANIME_FRANSHIES_INFO_FROM_CODE(FranchisesAnime[i].code)
    }
    return AnimeStore.CurrentAnimeFranshies
})

// function QualityChange(newQuality){
//     switch (newQuality) {
//         case 'SD':
//             ActiveQuality.value = 'sd'
//             break
//         case 'HD':
//             ActiveQuality.value = 'hd'
//             break
//         case 'Full Hd':
//             ActiveQuality.value = 'fhd'
//             break
//     }
    
// }
// function GetListOfSeries(){
//     let list = []
//     for (let i = 1; i <= ANIMEFROMPAGE.player.episodes.last; i++){
//         list.push(i)
//     }
//     return list
// }

// function GetQualityOfVideo(){
//     let qualitis = []
//     let qualitisArray = Object.entries(ANIMEFROMPAGE.player.list[ActiveSeries].hls)
//     for (let qualitisArrayItem of  qualitisArray){
//         switch (qualitisArrayItem[0]) {
//             case 'sd':
//                 qualitis.push('SD')
//                 break
//             case 'hd':
//                 qualitis.push('HD')
//                 break
//             case 'fhd':
//                 qualitis.push('Full Hd')
//                 break
//         }
//     }
//     return qualitis
// }
</script>
<style lang="sass" scoped>
.main
    margin-top: 50px
    .container
        display: flex
        align-items: flex-start
        gap: 100px
    &__img
        max-width: 400px
        width: 100%
    &__info
        max-width: 940px
        width: 100%
    &__title
        font-size: 32px
        font-weight: 700
    &__subtitle
        font-size: 16px
        font-weight: 600
        margin-bottom: 10px
        margin-top: 20px
    &__descript
        font-size: 14px
        font-weight: 400
        line-height: 20px
    &__categories
        display: flex
        align-items: center
        gap: 10px
        margin-top: 8px
        &-item 
            padding: 5px 10px
            border-radius: 5px
            font-size: 14px
            border: 1px solid $white 
    &__franchies
        display: grid
        grid-template-columns: repeat(6, 1fr)
        gap: 20px
        &-img 
            margin-bottom: 5px
        &-title 
            font-size: 14px
            font-weight: 400
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