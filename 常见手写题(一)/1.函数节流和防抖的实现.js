// 防抖：在n秒内，如果重复触发事件，则重新计算时间，直到n秒后，事件没有重新触发才执行。
// 节流：在n秒内，如果重复触发事件，只会触发一次。


// 实现防抖

// 第一种方法，基于setTimeout实现
function debounce(fn, delay) {
  let timer = null;
  return function () {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay)
  }
}