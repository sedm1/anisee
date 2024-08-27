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
                    </div>
                </div>
                
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

onBeforeMount(() => {
    AnimeStore.CurrentAnime = {}
})
</script>
<style lang="sass" scoped>
.main
    &__block
        display: flex
        align-items: flex-start
        gap: 50px
        margin-top: 40px
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
</style>