const Emitter = require('events');
const context = require('./context');
const request = require('./request');
const response = require('./response');
const compose = require('./compose');
const http = require('http');

class Application extends Emitter {
  constructor(options = {}) {
    super();
    this.middleares = [];
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
    this.compose = options.compose || compose;
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
  callback () {
    const fn = this.compose(this.middleares)

    if (!this.listenerCount('error')) this.on('error', this.onerror)

    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res)
      return this.handleRequest(ctx, fn)
    }

    return handleRequest
  }
  handleRequest (ctx, fnMiddleware) {
    const res = ctx.res
    res.statusCode = 404
    const onerror = err => ctx.onerror(err)
    const handleResponse = () => respond(ctx)
    // onFinished(res, onerror)
    return fnMiddleware(ctx).then(handleResponse).catch(onerror)
  }
  createContext (req, res) {
    const context = Object.create(this.context)
    const request = context.request = Object.create(this.request)
    const response = context.response = Object.create(this.response)
    context.app = request.app = response.app = this
    context.req = request.req = response.req = req
    context.res = request.res = response.res = res
    request.ctx = response.ctx = context
    request.response = response
    response.request = request
    context.originalUrl = request.originalUrl = req.url
    context.state = {}
    return context
  }
  onerror (err) {
    const msg = err.stack || err.toString();
    console.error(`\n${msg.replace(/^/gm, '  ')}\n`);
  }
}
function respond(ctx) {
  const res = ctx.res;
  const body = ctx.body;
  if(Buffer.isBuffer(body) || typeof body === 'string') return res.end(body);
  if(body instanceof Stream) return body.pipe(res);
  body = JSON.stringify(body);
  res.end(body);
}


module.exports = Application;
