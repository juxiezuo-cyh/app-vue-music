<template>
  <!-- 各个歌手的歌曲页面-->
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImg">
      <div class="play-wrapper">
        <div class="play" v-show="songs.length" @click="random" ref="palyBtn">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll @scroll="scroll" :pro-type="proType" :listen-scroll="listenScroll" :data="songs" class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list @select="selectItem" :songs="songs"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
    <div class="bg-layer"></div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import Loading from 'base/loading/loading'
import { prefixStyle } from 'common/js/dom'
import {mapActions} from 'vuex'
import {playlistMixin} from 'common/js/mixin'
const RESEVED_HRIGHT = 40
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')
export default {
  mixins: [playlistMixin],
  created() {
    this.proType = 3
    this.listenScroll = true
  },
  data() {
    return {
      scrollY: 0
    }
  },
  watch: {
    scrollY(newY) {
      let tranlateY = Math.max(this.minTranlateY, newY)
      let zIndex = 0
      let scale = 1
      let blur = 0
      this.$refs.layer.style[transform] = `translate3d(0,${tranlateY}px,0)`
      const percent = Math.abs(newY / this.imgHeight)
      if (newY > 0) {
        scale = 1 + percent
        zIndex = 10
      } else {
        blur = Math.min(20 * percent, 20)
      }
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`
      if (newY < this.minTranlateY) {
        zIndex = 10
        this.$refs.bgImg.style.paddingTop = 0
        this.$refs.bgImg.style.height = `${RESEVED_HRIGHT}px`
        this.$refs.palyBtn.style.display = 'none'
      } else {
        this.$refs.bgImg.style.paddingTop = `70%`
        this.$refs.bgImg.style.height = `0px`
        this.$refs.palyBtn.style.display = 'block'
      }
      this.$refs.bgImg.style[transform] = `scale(${scale})`
      this.$refs.bgImg.style.zIndex = zIndex
    }
  },
  methods: {
    random () {
      this.randomPlay({
        list: this.songs
      })
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index: index
      })
    },
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ]),
    scroll(pos) {
      this.scrollY = pos.y
    },
    back() {
      this.$router.back()// 返回上一层
    }
  },
  mounted() {
    this.imgHeight = this.$refs.bgImg.clientHeight
    this.minTranlateY = -this.imgHeight + parseInt(RESEVED_HRIGHT)
    this.$refs.list.$el.style.top = `${this.$refs.bgImg.clientHeight}px`
  },
  components: {
    SongList,
    Scroll,
    Loading
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImg})`
    }
  },
  props: {
    bgImg: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
