const Router = require('./router/router');
const Layer = require('./router/layer');
const http = require('http');
function Application () {

}

Application.prototype.get = function (path, ...middlewares) {
  // this.lazyrouter();
  if(!this.router) {
    this.router = new Router();
  }
  const route = this.router.route(path);
  route.get(...middlewares);
}

Application.prototype.listen = function (...args) {
  const server = http.createServer((req, res) => {
    const done = () => {
      res.end(`cannot find ${req.method} ${req.url}`)
    }
    this.router.handle(req, res, done);
    // this.handle(req, res, done);
  });
  server.listen(...args);
}

Application.prototype.handle = function(req, res, done) {
  this.router.handle(req, res, done)
}

// Application.prototype.use = function (...middlewares) {
//   const path = '/';
//   if(!this.router) {
//     this.router = new Router();
//   }
//   middlewares.forEach(middleware => {
//     this.router.use(path, middleware);
//   })
// }
module.exports = Application;