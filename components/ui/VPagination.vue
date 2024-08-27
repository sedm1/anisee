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
    margin-top: 20px
    .container
        display: flex
        align-items: center
        justify-content: center
        gap: 100px
    &__button
        &-right
            transform: rotate(180deg)
</style>