<template>
    <div>
        <LayoutTheHeader></LayoutTheHeader>
        <UiVLoader v-if="AnimeStore.IsLoading"></UiVLoader>
        <main v-else>
            <section class="main">
                <div class="container">
                    <h1 class="section__title main__title">Все аниме</h1>
                    <div class="main__search">
                        <input 
                        type="text" 
                        placeholder="Поиск аниме" 
                        class="main__search-input"
                        v-model="SearchingAnime"
                        >
                        <button @click="GetSearchAnime" class="main__search-button"><img src="/img/search.svg" alt="Search"></button>
                    </div>
                    <AnimeBLock :AnimeList="AnimeStore.AllAnime"/>
                    
                </div>
                
            </section>
            <UiVPagination 
                    :paginationData="AnimeStore.Pagination"
                    @RouteToPrevPage="RouteToNewpage(ActualPage-1)"
                    @RouteToNextPage="RouteToNewpage(ActualPage+1)"
            ></UiVPagination>
        </main>
    </div>
</template>
<script setup>
import { useAnimeStore } from '~/stores/Anime';

const AnimeStore = useAnimeStore()
const Route = useRoute()
const Router = useRouter()

definePageMeta({
    middleware: ["anime-page"]
})
useSeoMeta({
    title: "Все аниме"
})

let ActualPage = computed(() => {
    return Number(Route.query.page)
})

onMounted(()=> {
    AnimeStore.GET_ALL_ANIME_FROM_DB(ActualPage.value ? ActualPage.value : 1)
})

function RouteToNewpage(page){
    AnimeStore.GET_ALL_ANIME_FROM_DB(page)
    Router.push({path: '/anime', query: {page: page}})
}

let SearchingAnime = ref('')
function GetSearchAnime(){
    AnimeStore.GET_ANIME_FROM_SEARCH(SearchingAnime.value)
}
</script>
<style lang="sass" scoped>
.main
    margin-top: 50px
    margin-bottom: 40px
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
@media screen and (max-width: 650px)
    .main
        margin-top: 20px
        &__title
            font-size: 6vw
</style>