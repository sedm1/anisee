<template>
    <header>
        <div class="container">
            <NuxtLink to="/" class="header__logo">
                <img src="/img/logo.svg" class="header__logo-icon">
                <h2 class="header__logo-text">AniSee</h2>
            </NuxtLink>
            <nav class="header__menu-block">
                <ul class="header__menu">
                    <li class="header__menu-item"><NuxtLink :to="{path : '/anime', query: {page: 1}}" >Все аниме</NuxtLink></li>
                    <li class="header__menu-item"><a href="#">Страница 2</a></li>
                    <li class="header__menu-item"><a href="#">Страница 3</a></li>
                    <li class="header__menu-item">
                        <NuxtLink to="/">Избранное</NuxtLink>
                        <div class="header__menu-count">{{ 0 }}</div>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>
<script setup>
</script>
<style lang="sass" scoped>
header
    padding: 20px 0px
    .container
        display: flex
        align-items: center
        justify-content: space-between
.header
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
</style>