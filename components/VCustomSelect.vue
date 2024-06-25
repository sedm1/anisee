<template>
    <div class="custom-select" :tabindex="tabindex" @blur="open = false">
      <div class="selected" :class="{ open: open }" @click="open = !open">
        {{ selected }}
      </div>
      <div class="items" :class="{ selectHide: !open }">
        <div
          v-for="(option, i) of options"
          :key="i"
          @click="
            selected = option;
            open = false;
            $emit('input', option);
          "
        >
          {{ option }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      options: {
        type: Array,
        required: true,
      },
      default: {
        type: String,
        required: false,
        default: null,
      },
      tabindex: {
        type: Number,
        required: false,
        default: 0,
      },
    },
    data() {
      return {
        selected: this.default
          ? this.default
          : this.options.length > 0
          ? this.options[0]
          : null,
        open: false,
      };
    },
    watch: {
      selected: function (newSeries) {
        this.$emit('InputChange', newSeries)
      }
    },
  };
  </script>
  
<style scoped lang="sass">
.custom-select 
  width: 100%
  position: relative
  margin-top: 5px
.custom-select .selected 
  border: 1px solid $blue
  padding: 10px 15px
  font-size: 16px
  font-weight: 500
  cursor: pointer
.custom-select .selected.open 
  border: 1px solid $white
  
.custom-select .selected:after 
  content: ">"
  position: absolute
  top: 50%
  right: 10px
  width: 10px
  height: 10px
  background-size: cover
  background-position: center center
  background-repeat: no-repeat
  transform: translateY(-50%) rotate(90deg)
  transition: .3s
.custom-select .items 
  position: absolute
  z-index: 1
  transition: .3s
  opacity: 1
  max-height: 150px
  width: 100%
  background: $black
  cursor: pointer
  border-left: 1px solid $white 
  border-right: 1px solid $white
  border-bottom: 1px solid $white
  overflow-y: auto
  

.custom-select .items div 
  padding: 10px 15px
  font-size: 16px
  font-weight: 500
  width: 100%
  transition: .3s
.custom-select .items div:hover
  color: $blue
.custom-select .selectHide 
  overflow: hidden
  max-height: 0px
  opacity: 0
    

</style>
  