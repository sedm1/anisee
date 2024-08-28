<template >
    <button 
    class="favourites__button"
    v-if="IsAnimeInFav"
    @click="UserStore.SET_ANIME_TO_FAVOURITES(AnimeData.id)"
    >Добавить в избранное</button>
    <button 
    v-else 
    class="favourites__button favourites__button-delete"
    @click="UserStore.REMOVE_ANIME_FROM_FAVOURITES(AnimeData.id)"
    >
        Удалить из избранного
    </button>
</template>
<script setup>
import { useUserStore } from '~/stores/User';
const {AnimeData} = defineProps({
    AnimeData: Object
})
const UserStore = useUserStore()

const IsAnimeInFav = computed(() => {
    return UserStore.Favourites.indexOf(AnimeData.id) == -1 ? true : false
})
</script>
<style lang="sass" scoped>
.favourites
    &__button
        margin-top: 40px
        padding: 15px 40px
        background: $blue
        border-radius: 30px
        border: 1px solid $blue 
        font-size: 14px
        font-weight: 500
        transition: .3s
        &:hover 
            background: $black 
            color: $blue
        &-delete
            background: $black 
            color: $blue
</style>