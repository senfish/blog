const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors'); // 处理跨域

// app.use(cors());

app.use(async(ctx, next) => {
  console.log('ctx', ctx.request.search);
  await next();
  ctx.body = '1111'
});
app.use(async(ctx, next) => {
  ctx.body = '222'
});
app.listen(3000)
