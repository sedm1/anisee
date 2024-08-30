<template>
    <div class="loader__bg">
        <div class="loader__spinner"></div>
    </div>
</template>
<script>
export default {
    name: "VSmallLoader"
}
</script>
<style lang="sass" scoped>
.loader
    &__bg
        display: flex
        align-items: center
        justify-content: center
        position: absolute
        top: 0
        left: 0
        z-index: 3
        width: 100%
        height: 100%
        background: $black
    &__spinner
        width: 48px
        height: 48px
        border: 5px solid $blue
        border-bottom-color: transparent
        border-radius: 50%
        display: inline-block
        box-sizing: border-box
        animation: rotation 1s linear infinite
@keyframes rotation 
    0% 
        transform: rotate(0deg)
    
    100% 
        transform: rotate(360deg)

</style>