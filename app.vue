<script setup lang="ts">

</script>

<template>
    <VitePwaManifest />
    <NuxtPage />
</template>
<style lang="sass">
*
    padding: 0
    margin: 0
    box-sizing: border-box
    font-family: "Raleway", sans-serif
    color: $white
    font-size: 14px
body
  background: $black
  position: relative
h1, h2, h3
    font-family: "Inter", sans-serif
section
    margin-bottom: 100px
img
    width: 100%
    height: auto
a
    text-decoration: none
    color: inherit
    cursor: pointer
button
    font-family: inherit
    background: none
    border: 0 none
    outline: 0 none
    cursor: pointer
li
    list-style: none
.container
    max-width: calc($container + 20px)
    width: 100%
    padding: 0px 20px
    margin: 0 auto
input 
    background: none
    border: 0 none
    outline: 0 none
    cursor: text
.section__title
    font-size: 32px
    font-weight: 700
@media screen and (max-width: 900px)
    section
        margin-bottom: 60px
    .section__title
        font-size: 5vw
</style>