<template>
    <section class="pagination">
        <div class="container">
            <button 
            class="pagination__button pagination__button-left" 
            :disabled="IsPrevEnable" 
            @click="emit('RouteToPrevPage')"
            >
                <img src="/img/arrow-disable.svg" alt="ArrowIcon" v-if="IsPrevEnable">
                <img src="/img/arrow-active.svg" alt="ArrowIcon" v-else>
            </button>
            <div class="pagination__main">
                <p class="pagination__main-item">1 </p>
                <p class="pagination__main-current">{{paginationData.current_page}}</p>
                <p class="pagination__main-item">{{paginationData.pages  }}</p>
            </div>
            <button 
            class="pagination__button pagination__button-right" 
            :disabled="IsNextEnable"
            @click="emit('RouteToNextPage')"
            >
                <img src="/img/arrow-disable.svg" alt="ArrowIcon" v-if="IsNextEnable">
                <img src="/img/arrow-active.svg" alt="ArrowIcon" v-else>
            </button>
        </div>
        
    </section>
</template>
<script setup>
const emit = defineEmits(['RouteToPrevPage', 'RouteToNextPage'])

const {paginationData} = defineProps({
    paginationData: Object
})

const Route = useRoute()
const ActualLink = Route.query.page

const IsPrevEnable = computed(() => {
    return ActualLink == 1
})
const IsNextEnable = computed(() => {
    return ActualLink == paginationData.pages
})

</script>
<style lang="sass" scoped>
.pagination
    margin: 20px auto
    max-width: 350px
    width: 100%
    .container
        display: flex
        align-items: center
        justify-content: center
        gap: 20px
    &__main
        display: flex
        align-items: center
        justify-content: space-between
        width: 100%
        &-item 
            font-size: 16px
            font-weight: 500
        &-current 
            color: $blue
            font-size: 16px
            font-weight: 500
    &__button
        min-width: 30px
        width: 30px
        &-right
            transform: rotate(180deg)
@media screen and (max-width: 650px)
    .pagination
        max-width: 100%
</style>