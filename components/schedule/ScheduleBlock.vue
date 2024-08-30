<template>
    <div class="schedule__block">
        <div class="schedule__tabs">
            <button 
            v-for="(DaysItem, id) in days"
            :key="id"
            @click="TabsClicked(id)"
            class='schedule__tabs-item'
            :class="{'schedule__tabs-item-active' : ActiveTab == id}"
            >
                {{ DaysItem }}
            </button>
        </div>
        <div class="schedule__main">
            <UiVSmallLoader v-if="MainStore.IsScheduleLoading"></UiVSmallLoader>
            <div class='schedule__main-block' v-else>
                <LazyAnimeCard
                v-for="AnimeItem in MainStore.ScheduleAnime"
                :key="AnimeItem.code"
                :AnimeItem="AnimeItem"
                >
                
                </LazyAnimeCard>
            </div>
        </div>
    </div>
</template>
<script setup>
import { UseMainStore } from '~/stores/main';

let date = new Date()
const MainStore = UseMainStore()

onMounted(() => {
    MainStore.GET_SCHEDULE_ANIME(date.getDay() - 1)
})

const days = ['Понедельник', 'Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье']

let ActiveTab = ref(date.getDay() - 1)

function TabsClicked(id){
    ActiveTab.value = id
    MainStore.GET_SCHEDULE_ANIME(id)
}
</script>
<style lang="sass" scoped>
.schedule
    &__block
        display: flex
        gap: 20px
        margin-top: 40px
        position: relative
        align-items: flex-start
    &__tabs
        display: flex
        flex-direction: column
        gap: 10px
        position: sticky
        top: 20px
        &-item 
            padding: 12px 20px 
            border: 1px solid $blue 
            color: $white 
            font-size: 14px
            border-radius: 5px
            &-active 
                background: $blue
    &__main
        position: relative
        width: 100%
        &-block 
            display: grid
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
            gap: 20px
@media screen and (max-width: 900px)
    .schedule
        &__main
            &-block 
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr))
                gap: 10px
@media screen and (max-width: 650px)
    .schedule
        &__block
            flex-direction: column
        &__tabs
            width: 100%
            position: static
</style>