<template >
    <div>
        <LayoutTheHeader></LayoutTheHeader>
        <main>
            <section class="main">
                <div class="container">
                    <h1 class="main__title section__title">Избранное</h1>
                    <AnimeBLock
                    :AnimeList="UserStore.FavouritesAnimeList"
                    ></AnimeBLock>
                </div>
            </section>
        </main>
    </div>
</template>
<script setup>
import {useUserStore} from '~/stores/User'
const UserStore = useUserStore()

UserStore.GET_FAVOURITES_ANIME_LIST()

onBeforeMount(() => {
    UserStore.FavouritesAnimeList = []
})
</script>
<style lang="sass" scoped>
.main
    margin-top: 50px
</style>