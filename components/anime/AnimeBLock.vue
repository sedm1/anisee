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
    AnimeList: {
        type: Array
    }
})
</script>
<style lang="sass" scoped>
.anime
    &__block
        display: grid
        grid-template-columns: repeat(5, 1fr)
        gap: 20px
        margin-top: 40px
</style>