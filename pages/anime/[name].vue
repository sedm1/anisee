<template>
    <div>
        <TheHeader></TheHeader>
        <VLoader v-if="AnimeStore.IsLoad"></VLoader>
        <main v-else>
            <section class="main">
                <div class="container">
                    <div class="main__img-block">
                        <div class="main__img">
                            <img :src="`${useRuntimeConfig().public.AnimeStaticApi}${AnimeStore.CurrentAnime.posters.medium.url}`" alt="MainImg">
                        </div>
                        <button 
                        class="main__img-button main__img-button-active" 
                        v-if="UserStore.Favorites.includes(AnimeStore.CurrentAnime.id)"
                        @click="DeleteAnimeFromFavorites()"
                        >В избранном</button>
                        <button 
                        class="main__img-button" 
                        v-else
                        @click="SetAnimeToFavorites()"
                        >Добавить в избранное <img src="@/assets/img/favorites.svg" alt="favoritesIcon"></button>
                        
                    </div>
                    
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
                        <h3 class="main__subtitle" v-if="CurrentFranshies.length > 0">Франшиза</h3>
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
            <section class="video">
                <div class="container">
                    <h2 class="section__title">Смотреть аниме</h2>
                    <VideoPlayer
                    :VideoItem="AnimeStore.CurrentAnime"
                    ></VideoPlayer>
                </div>
                
            </section>
        </main>
    </div>
</template>
<script setup>
import {useAnimeStore} from '@/stores/Anime'
import { useUserStore } from '@/stores/User';
const AnimeStore = useAnimeStore()
const UserStore = useUserStore()
const route = useRoute()

AnimeStore.GET_ANIME_FROM_CODE(route.params.name)
onBeforeUnmount(() => {
    AnimeStore.CurrentAnime = []
})


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

function SetAnimeToFavorites(){
    let id = AnimeStore.CurrentAnime.id
    UserStore.SetAnimeToFavorites(id)
}
function DeleteAnimeFromFavorites(){
    let id = AnimeStore.CurrentAnime.id
    UserStore.DeleteAnimeFromFavorites(id)
}
</script>
<style lang="sass" scoped>
.main
    margin-top: 50px
    .container
        display: flex
        align-items: flex-start
        gap: 100px
    &__img
        &-block
            max-width: 400px
            width: 100%
        &-button 
            margin-top: 10px
            display: flex
            align-items: center
            gap: 20px
            width: 100%
            border: 1px solid $blue 
            border-radius: 10px
            justify-content: center
            color: $blue 
            font-weight: 600
            font-size: 16px
            padding: 10px 0px
            img
                width: 30px
            &-active 
                background: $blue 
                color: $white
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