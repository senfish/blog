const Layer = require('./layer');

function Route(path) {
  this.path = path;
  this.stack = [];
}
// 创建route的layer
Route.prototype.get = function (...middlewares) { // app.get('/', middleware, middleware)
  for (let i = 0; i < middlewares.length; i++) {
    const middleware = middlewares[i];
    const layer = new Layer(undefined, middleware);
    layer.method = 'get';
    this.stack.push(layer);
  }
}
// 相当于kao的compose函数，是用来组合中间件的
Route.prototype.dispatch = function (req, res, done) {
  // 此处的done作用是跳到下一个Router的layer，不懂的可以看Router.prototype.handle方法
  let i = 0;
  const next = () => {
    const layer = this.stack[i++]; // layer = {handle: middleware, method}
    if(!layer) return done();
    if(req.method.toLowerCase() === layer.method) {
      layer.handle(req, res, next)
    } else {
      next();
    }
  }
  next();
}

module.exports = Route;