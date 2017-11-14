<template>
  <div class="progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.baidu.com">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" />
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent"
      :stroke-dasharray="dashArray"
      :stroke-dashoffset="dashOffset" />
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dashArray: Math.PI * 100 // 周长2*PI*r
    }
  },
  props: {
    radius: {
      default: 100,
      type: Number
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  computed: {
    dashOffset() {
      return (1 - this.percent) * this.dashArray
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-circle
    position: relative
    circle
      stroke-width: 8px
      transform-origin: center
      &.progress-background
        transform: scale(0.9)
        stroke: $color-theme-d
      &.progress-bar
        transform: scale(0.9) rotate(-90deg)
        stroke: $color-theme
</style>
