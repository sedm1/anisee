<template>
    <div>
        <TheHeader></TheHeader>
        <section class="main">
            <div class="container">
                <h1 class="section__title">Избранное</h1>
                <div class="anime__block">
                    <VAnimeCard
                    v-for="AnimeItem in AnimeBlock"
                    :key = 'AnimeItem.id'
                    :AnimeItem = 'AnimeItem'
                    >

                    </VAnimeCard>
                </div>
            </div>
            
        </section>
    </div>
</template>
<script setup>
import {useUserStore} from '@/stores/User'
const UserStore = useUserStore()
const config = useRuntimeConfig()

useHead({
    title: "Избранное"
})
const AnimeBlock = computed(() => {
    let list = []
    // for(let FavoritesAnimeCode of UserStore.Favorites){
    //     console.log(`${config.public.AnimeApi}/title?code=${FavoritesAnimeCode}`)
    //     console.log(FavoritesAnimeCode)
    //     const {data} = useAsyncData(
    //         'FavoritesAnime',
    //         () => $fetch(`${config.public.AnimeApi}/title?code=${FavoritesAnimeCode}`)
    //     )
    //     console.log(data)
    //     // list.push(AnimeStore.GET_FAVORITES_ANIME(FavoritesAnimeCode))
    // }
    return list
})
</script>
<style lang="sass" scoped>
.main
    margin-top: 50px
.anime
    &__block
        display: grid
        grid-template-columns: repeat(5, 1fr)
        gap: 20px
        margin-top: 40px
</style>