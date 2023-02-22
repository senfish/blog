
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

function compose(middleares) {
  let index = -1;
  const dispatch = (i) => {
    if(i <= index) throw new Error('next（） 不能调用多次');
    index = i;
    if(i >= middleares.length) return;
    const middleare = middleares[i];
    return middleare('ctx', dispatch.bind(null, i + 1));
  }
  return dispatch(0);
}

module.exports = koa;