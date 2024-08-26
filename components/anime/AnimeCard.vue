<template>
    <NuxtLink class="anime__card" :to='{name: `anime-code`, params: {code: AnimeItem.code}}'>
        <div class="anime__card-img"><img :src="`${useRuntimeConfig().public.AnimeStaticApi}${AnimeItem.posters.original.url}`" alt="AnimeCardImg"></div>
    </NuxtLink>
</template>

<script setup >
const {AnimeItem} = defineProps({
    AnimeItem: {
        type: Object
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