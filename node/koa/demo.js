// const Koa = require('./index.js');
// const Koa = require('kao');
const app = new Koa();

app.use(async (ctx, next) => {
  ctx.body = 'hello world';
});
;

app.listen(3000);

// 打印 1 3 5 6 4 2