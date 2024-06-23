<template>
    <NuxtLink class="anime__card" :to='`../anime/${AnimeItem.code}`'>
        <div class="anime__card-img"><img :src="'https://static-libria.weekstorm.one/' + AnimeItem.posters.original.url" alt="AnimeCardImg"></div>
    </NuxtLink>
</template>

<script setup>
    const props = defineProps({
        AnimeItem: {
            type: Object,
            default(){
                return{}
            }
        }
    })
</script>
<style lang="sass">
.anime__card
    transition: .3s
    border-radius: 10px
    img
        border-radius: 10px
    &:hover 
        transform: scale(1.05)
</style>