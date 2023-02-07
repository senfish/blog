
function koa () {
  this.middleares = [];
}

koa.prototype.use = function (callback) {
  this.middleares.push(callback); // callback(ctx, next);
}

koa.prototype.listen = function () {
  // 执行 middleares
  const fn = compose(this.middleares);
}

function compose (middleares) {
  let index = -1;
  return dispatch(0);
  function dispatch(i) {
    index = i;
    let fn = middleares[i];
    if(i === middleares.length) return; // 返回到最后一个中间件里面去
    return fn('ctx', dispatch.bind(null, i + 1));
  }
}

module.exports = koa;