<template>
    <div>
        <TheHeader></TheHeader>
        <VLoader v-if="AnimeStore.IsLoad"></VLoader>
        <main v-else>
            <section class="main">
                <div class="container">
                    <h1 class="section__title">Все аниме</h1>
                    <div class="main__search">
                        <input 
                        type="text" 
                        placeholder="Поиск по названию или описанию" 
                        class="main__search-input"
                        v-model="AnimeSearch"
                        >
                        <button @click='this.SearchAnimeWithTitle()' class="main__search-button"><img src="@/assets/img/search.svg" alt="Search"></button>
                    </div>
                    <div class="anime__block">
                        <VAnimeCard
                        v-for="AnimeItem in AnimeStore.ANIME"
                        :key = 'AnimeItem.id'
                        :AnimeItem = 'AnimeItem'
                        >

                        </VAnimeCard>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>
<script setup>
import {useAnimeStore} from '@/stores/Anime'
useHead({
    title: "Все аниме"
})

const AnimeStore = useAnimeStore()
let AnimeSearch = ref('')

onMounted(() => {
    nextTick(() => {
        AnimeStore.GET_ALL_ANIME_FROM_DB()
    })
})
</script>
<style lang="sass" scoped>
.main
    margin-top: 50px
    &__search
        width: 100%
        margin-top: 20px
        position: relative
        &-input 
            width: 100%
            padding: 15px 20px
            border: 1px solid $white 
            font-weight: 500
            &:focus
                border: 1px solid $blue
        &-button 
            position: absolute
            top: 50%
            right: 20px
            transform: translateY(-50%)
            width: 30px
            display: flex
            justify-content: center
.anime
    &__block
        display: grid
        grid-template-columns: repeat(5, 1fr)
        gap: 20px
        margin-top: 40px
</style>