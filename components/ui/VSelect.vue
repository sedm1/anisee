<template>
    <div class="custom-select" :tabindex="tabindex" @blur="open = false" v-if="options?.length">
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
            $emit('inputSelect', option);
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
        : this.options?.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
};
</script>
<style scoped lang="sass">
.custom-select 
  position: relative
  width: 100%
  text-align: left
  outline: none
.custom-select .selected
  cursor: pointer
  user-select: none
  background: $blue
  padding: 15px 70px
  padding-left: 10px
.custom-select .selected:after 
  position: absolute
  content: ""
  top: 50%
  transform: translateY(-30%)
  right: 10px
  width: 0
  height: 0
  border: 5px solid transparent
  border-color: #fff transparent transparent transparent
.custom-select .items 
  overflow: hidden
  position: absolute
  left: 0
  right: 0
  z-index: 1
  max-height: 100px
  overflow-y: auto
  scrollbar-color: $blue $black
  scrollbar-width: thin
.custom-select .items div 
  color: #fff
  padding: 10px
  cursor: pointer
  user-select: none
  background: $black
.custom-select .items div:hover 
  background-color: $blue
.selectHide 
  display: none
</style>