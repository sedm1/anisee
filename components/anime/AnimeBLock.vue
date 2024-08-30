<template>
    <div class="anime__block">
        <AnimeCard 
        v-for="AnimeItem in AnimeList"
        :key="AnimeItem.code"
        :AnimeItem="AnimeItem"
        ></AnimeCard>
    </div>
</template>
<script setup>
const {AnimeList} = defineProps({
    AnimeList: Array
})
</script>
<style lang="sass" scoped>
.anime
    &__block
        display: grid
        grid-template-columns: repeat(5, 1fr)
        gap: 20px
        margin-top: 40px
@media screen and (max-width: 1100px)
    .anime
        &__block
            grid-template-columns: repeat(4, 1fr)
@media screen and (max-width: 900px)
    .anime
        &__block
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))
            gap: 10px
@media screen and (max-width: 650px)
    .anime
        &__block
            margin-top: 20px
</style>