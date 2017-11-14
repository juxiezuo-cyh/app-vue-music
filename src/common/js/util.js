// 数组乱序
function getRandomInt(min, max) {
  // 返回min和max之间的随机数包括max
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function shuffle(arr) {
  let _arr = arr.slice() // 数组的拷贝不改变原来的数组arr
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i);
    let t = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = t;
  }
  return _arr
}
