<template>
    <header>
        <div class="container">
            <NuxtLink to="/" class="header__logo">
                <img src="/img/logo.svg" class="header__logo-icon">
                <h2 class="header__logo-text">AniSee</h2>
            </NuxtLink>
            <nav 
            class="header__menu-block"
            :class="{'header__menu-block-active': IsMenuOpen}"
            >
                <div class="header__menu-header">
                    <NuxtLink to="/" class="header__menu-logo">
                        <img src="/img/logo.svg" class="header__logo-icon">
                        <h2 class="header__logo-text">AniSee</h2>
                    </NuxtLink>
                    <button class="header__menu-button" @click='IsMenuOpen = false'><img src="/img/close.svg" alt="HeaderClose"></button>
                </div>
                
                <ul class="header__menu">
                    <li class="header__menu-item"><NuxtLink :to="{path : '/anime', query: {page: 1}}" >Все аниме</NuxtLink></li>
                    <!-- <li class="header__menu-item"><a href="#">Страница 2</a></li>
                    <li class="header__menu-item"><a href="#">Страница 3</a></li> -->
                    <li class="header__menu-item">
                        <NuxtLink to="/favourites">Избранное</NuxtLink>
                        <div class="header__menu-count" v-if="UserStore.Favourites.length">{{ UserStore.Favourites.length }}</div>
                    </li>
                </ul>
            </nav>
            <button @click='IsMenuOpen = true' class="header__button"><img src="/img/burger.svg" alt="HeaderButton"></button>
        </div>
    </header>
</template>
<script setup>
import { useUserStore } from '~/stores/User';
const UserStore = useUserStore()

let IsMenuOpen = ref(false)
</script>
<style lang="sass" scoped>
header
    padding: 20px 0px
    .container
        display: flex
        align-items: center
        justify-content: space-between
.header
    &__button 
        display: none
    &__logo
        display: flex
        align-items: center
        gap: 10px
        &-text
            font-size: 20px
            font-weight: 600
        &-icon 
            width: 50px
    &__links
        display: flex
        align-items: center
        gap: 25px
        &-per 
            width: 1px
            background: $white
            height: 20px
        &-item 
            transition: .3s
            font-weight: 500
            &:first-child
                border: 1px solid $white 
                border-radius: 10px
                padding: 10px 25px
                &:hover 
                    background: $white 
            &:hover 
                color: $blue
    &__profile
        display: flex
        align-items: center
        gap: 10px
        &-icon 
            width: 48px
            border-radius: 100%
        &-name 
            font-size: 16px
            margin-bottom: 3px
        &-count 
            font-size: 12px
            font-weight: 400
    &__menu
        display: flex
        align-items: center
        gap: 40px
        &-header
            display: none
        &-item 
            font-size: 16px
            font-weight: 500
            position: relative
            &::before
                content: ""
                position: absolute
                bottom: -3px
                left: 0px
                width: 0px
                height: 1px
                transition: .3s
                background: $white 
            &:hover 
                &::before 
                    width: 100%
        &-count 
            position: absolute
            z-index: 1
            top: -10px
            right: -20px
            font-size: 14px
            background: $blue
            width: 20px
            height: 20px
            display: flex
            align-items: center
            justify-content: center
            border-radius: 100%
            padding-bottom: 2px
@media screen and (max-width: 900px)
    .header
        &__button 
            display: block
            width: 30px
        &__menu
            flex-direction: column
            align-items: flex-start
            margin-top: 40px
            gap: 30px
            &-header 
                display: flex
                align-items: center
                justify-content: space-between
            &-button 
                width: 20px
            &-logo 
                
                display: flex
                align-items: center
                gap: 10px
            &-block 
                position: fixed
                top: 0px
                left: -110%
                z-index: 5
                max-width: 320px
                width: 100%
                height: 100dvh
                background: $black
                padding: 20px
                transition: .3s
                &-active 
                    left: 0
</style>