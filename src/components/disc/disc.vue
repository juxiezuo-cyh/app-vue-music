<template>
  <transition>
    <music-list></music-list>
  </transition>

</template>

<script>
import MusicList from "components/music-list/music-list"
export default {
  components: {
    MusicList
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
