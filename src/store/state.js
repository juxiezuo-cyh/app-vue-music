import {playMode} from 'common/js/config'
const state = {
  singer: {},
  playing: false, // 是否在播放
  fullScreen: false, // 收起和全屏
  playlist: [], // 播放列表
  sequenceList: [], // 播放顺序
  mode: playMode.sequence, // 播放模式
  currentIndex: -1
};

export default state;
