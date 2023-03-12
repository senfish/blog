const Route = require('./route');
const Layer = require('./layer');
const url =  require('url');

function Router () {
  this.stack = [];
}

Router.prototype.route = function (path) { // 创建Router的layer
  const route = new Route(path);
  let layer = new Layer(path, route.dispatch.bind(route)); // layer = {path, handle}
  layer.route = route;
  this.stack.push(layer);
  return route;
}
// 是http.createServer()的回调方法
Router.prototype.handle = function(req, res, done) {
  // 遍历router的stack，通过path找到对应的layer
  let index = 0;
  // 想实现next这种中间件的方法，处理中间件的时候，需要用到递归的方式，不能用遍历，这样才可以将next主动权交给用户手上
  const next  = () => {
    const {pathname} = url.parse(req.url);
    const layer = this.stack[index++];
    if(!layer) return done;// 如果所有的layer.path都没有匹配上path，说明没有对应的路由
     // 找到了path的话，需要执行对应的middleware
    if(pathname === layer.path) { // tips: 源码里面是通过正则来判断的，这里简化一下
      layer.handle(req, res, next); // 此时layer.handle其实就是route.dispatch方法，请看Router.prototype.route方法
      // tips: 源码里面是通过layer.handle_request来调用layer.handle
    } else {
      next();
    }
  }
  next();
}
// Router.prototype.use = function (path, middleware) {
//   const layer = new Layer(path, middleware);
//   layer.router = undefined;
//   this.stack.push(layer);
// }
module.exports = Router;