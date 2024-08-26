<template>
    <div>
        <LayoutTheHeader></LayoutTheHeader>
        <UiVLoader v-if="AnimeStore.IsLoading"></UiVLoader>
        <main v-else>
            <section class="main">
                <div class="container">
                    <h1 class="section__title">Все аниме</h1>
                    <div class="main__search">
                        <input 
                        type="text" 
                        placeholder="Поиск по названию или описанию" 
                        class="main__search-input"
                        >
                        <button  class="main__search-button"><img src="/img/search.svg" alt="Search"></button>
                    </div>
                    <AnimeBLock :AnimeList="AnimeStore.AllAnime"/>
                    <UiVPagination 
                    :paginationData="AnimeStore.Pagination"
                    @RouteToPrevPage="RouteToNewpage(Number(Route.query.page)-1)"
                    @RouteToNextPage="RouteToNewpage(Number(Route.query.page)+1)"
                    ></UiVPagination>
                </div>
            </section>
        </main>
    </div>
</template>
<script setup lang="ts">
import { useAnimeStore } from '~/stores/Anime';

const AnimeStore = useAnimeStore()
const Route = useRoute()
const Router = useRouter()
useHead({
    title: "Все аниме"
})
AnimeStore.GET_ALL_ANIME_FROM_DB(Number(Route.query.page))

function RouteToNewpage(page: number){
    AnimeStore.GET_ALL_ANIME_FROM_DB(page)
    Router.push({path: '/anime', query: {page: page}})
}
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
    &__pagination
        justify-content: center
</style>