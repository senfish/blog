const Emitter = require('events');
const context = require('./context');
const request = require('./request');
const response = require('./response');
const http = require('http');
class Application extends Emitter {
  constructor(options) {
    super();
    this.middleares = [];
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response)
  }
  use(middleare) {
    this.middleares.push(middleare);
    return this;
  }
  listen(...args) {
    const server = http.createServer(this.callback());
    // http.createServer((req, res) => {})
    return server.listen(...args);
  }
  callback() {
    const fnMiddleware = compose(this.middleares);
    // if (!this.listenerCount('error')) this.on('error', this.onerror);

    return (req, res) => {
      const ctx = this.createContext(req, res);
      return () => {
        const res = ctx.res;
        res.statusCode = 404;
        const onerror = err => ctx.onerror(err);
        const handleResponse = () => respond(ctx);
        onFinished(res, onerror);
        return fnMiddleware(ctx).then(handleResponse).catch(onerror);
      }
    }
  }
}



module.exports = Application;
