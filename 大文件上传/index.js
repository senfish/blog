const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors'); // 处理跨域

app.use(cors());

app.use(async(ctx, next) => {
  console.log('ctx', ctx.request);
  ctx.body = 'hello world'
});

app.listen(3001)
