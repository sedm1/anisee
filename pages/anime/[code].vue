<template>
    <LayoutTheHeader></LayoutTheHeader>
    <UiVLoader v-if="AnimeStore.IsLoading"></UiVLoader>
    <main v-else>
        <section class="main">
            <div class="container">
                <div class="main__block">
                    <div class="main__img"><img :src="`${useRuntimeConfig().public.AnimeStaticApi}`+AnimeStore.CurrentAnime.posters.original.url" alt="MainImg"></div>
                    <div class="main__info">
                        <h5 class="main__info-code">{{AnimeStore.CurrentAnime.code}}</h5>
                        <h1 class="main__info-title">{{ AnimeStore.CurrentAnime.names.ru }}</h1>
                        <p class="main__info-descript">{{ AnimeStore.CurrentAnime.description }}</p>
                        <UiVFavouritesButton
                        :AnimeData="AnimeStore.CurrentAnime"
                        ></UiVFavouritesButton>
                        <div class="main__franchies" v-if="franchies.length">
                            <h3 class="main__subtitle">Франшиза</h3>
                            <LazyAnimeBLock
                            :AnimeList="franchies"
                            />
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
        <section class="video">
            <div class="container">
                <h2 class="section__title">Смотреть онлайн</h2>
                <LazyLayoutVideoPlayer
                :AnimeData="AnimeStore.CurrentAnime.player"
                />
            </div>
        </section>
    </main>
</template>
<script setup>
import { useAnimeStore } from '~/stores/Anime';
const AnimeStore = useAnimeStore()

const route = useRoute()

AnimeStore.GET_ANIME_FROM_CODE(route.params.code)


useSeoMeta({
    title: () => AnimeStore.CurrentAnime.names?.ru
})

const franchies = computed(() => {
    if (AnimeStore.CurrentAnime.franchises[0]){
        AnimeStore.GET_ANIME_FRANSHIES(AnimeStore.CurrentAnime.franchises[0].releases)
    }
    
    return AnimeStore.CurrentAnimeFranchies
})

onBeforeMount(() => {
    AnimeStore.CurrentAnime = {}
    AnimeStore.CurrentAnimeFranchies = []
})
</script>
<style lang="sass" scoped>
.main
    margin-top: 50px
    &__block
        display: flex
        align-items: flex-start
        gap: 50px
        
    &__img
        max-width: 500px
        width: 100%
    &__info
        width: 100%
        &-code 
            color: $gray
            font-size: 12px
            margin-bottom: 5px
        &-title 
            font-size: 40px
            margin-bottom: 20px
        &-descript
            font-size: 16px
            line-height: 24px
    &__franchies
        margin-top: 40px
    &__subtitle 
        font-size: 20px
</style>