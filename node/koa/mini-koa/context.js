
const delegate = require('delegates');
const statuses = require('statuses');

const proto = module.exports = {
  inspect() {

  },
  onerror(err) {
    if (null == err) return;
    this.app.emit('error', err, this);
    const { res } = this;

    let statusCode = err.status || err.statusCode;
    if ('ENOENT' === err.code) statusCode = 404;
    if ('number' !== typeof statusCode || !statuses[statusCode]) statusCode = 500;
    let code = '';
    if(statusCode === 404) {
      code = 'Not Found';
    } else {
      code = 'Internal Server Error'
    }
    const msg = err.expose ? err.message : code;
    res.end(msg);
  }
}

delegate(proto, 'response')
.method('attachment')
.access('body')

delegate(proto, 'request')
.method('get')
.access('method')
.getter('href')