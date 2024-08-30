<template>
    <div>
        <LayoutTheHeader/>
        <main>
            <section class="main">
                <video src='/video/main__bg.mp4'
                muted
                autoplay
                ></video>
                <div class="main__bg">
                    <div class="container">
                        <div class="main__block">
                            <h1 class="main__title">AniSee - сервис просмотра аниме онлайн</h1>
                            <p class="main__descript">Смотреть аниме онлайн в хорошем качестве без рекламы</p>
                            <NuxtLink to="/anime" class='main__link'>Смотреть онлайн</NuxtLink>
                        </div>
                        
                    </div>
                    
                </div>
            </section>
            <section class="last">
                <div class="container">
                    <h2 class="section__title">Последние обновления и релизы</h2>
                    <LazySwiper
                    :slides-per-view="1"
                    :loop="true"
                    class="last__slider"
                    :space-between="20"
                    navigation
                    :modules="[Navigation]"
                    :breakpoints="{
                        '550': {
                            slidesPerView: 2,
                        },
                        '750': {
                            slidesPerView: 3,
                        },
                        '1100': {
                            slidesPerView: 4,
                        }
                    }"
                    >
                        <SwiperSlide v-for="LastUpdatedAnime in MainStore.LastUpdatedAnime" 
                        :key="LastUpdatedAnime.code">
                            <AnimeCard :AnimeItem="LastUpdatedAnime"></AnimeCard>
                        </SwiperSlide>
                    </LazySwiper>
                </div>
            </section>
            <section class="schedule">
                <div class="container">
                    <h2 class="section__title">Ближайшие обновления и релизы</h2>
                    <LazyScheduleBlock/>
                </div>
            </section>
        </main>
    </div>
</template>
<script setup>
import 'swiper/css/navigation';

import { UseMainStore } from '~/stores/main';
import { Navigation} from 'swiper/modules';

const MainStore = UseMainStore()

useSeoMeta({
    title: 'AniSee - смотреть аниме онлайн',
    
})
onMounted(() => {
    MainStore.GET_LAST_UPDATED_ANIME()
})


</script>
<style lang="sass" scoped>
header
    position: absolute
    top: 0
    left: 0
    width: 100%
    z-index: 3
video
    max-width: 100%
    height: 100%
    position: absolute
    width: 100%
    top: 0
    left: 0
    z-index: -1
    object-fit: cover
.main
    width: 100%
    height: 100vh
    position: relative
    z-index: 1
.main
    &__bg
        width: 100%
        height: 100%
        background: rgba(0, 0, 0, .6)
    .container
        height: 100%
    &__block
        width: 100%
        height: 100%
        display: flex
        align-items: center
        justify-content: center
        flex-direction: column
        text-align: center
    &__title
        font-size: 40px
        font-weight: 700
        margin-bottom: 20px
    &__descript
        font-size: 16px
        font-weight: 400
    &__link
        background: $blue 
        border: 1px solid $blue 
        color: $white
        font-size: 18px
        padding: 15px 50px
        font-weight: 500
        margin-top: 50px
        border-radius: 30px
        transition: .3s
        &:hover 
            background: transparent
.last 
    &__slider
        padding: 40px 0px
        padding-bottom: 60px
    :deep(.swiper-button-prev)
        position: absolute
        right: 60px
        left: auto
        bottom: 5px
        top: auto
        background-image: url('/img/arrow-active.svg')
        background-size: cover
        background-position: center center
        background-repeat: no-repeat
        width: 40px
        height: 40px

    :deep(.swiper-button-next)
        position: absolute
        right: 0px
        left: auto
        bottom: 5px
        top: auto
        background-image: url('/img/arrow-active.svg')
        background-size: cover
        background-position: center center
        background-repeat: no-repeat
        width: 40px
        height: 40px
        transform: rotate(180deg)
    :deep(.swiper-button-prev::after), :deep(.swiper-button-next::after)
        display: none
@media screen and (max-width: 900px)
    .main
        &__title
            font-size: 6.8vw
        &__descript
            font-size: 2.5vw
    .last
        &__slider
            padding-top: 20px
@media screen and (max-width: 650px)
    .main
        &__link
            padding: 15px 0px
            width: 100%
</style>