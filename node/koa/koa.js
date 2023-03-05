const Koa = require('./mini-koa/application');
const app = new Koa();

const port = 3000;
app.use(async(ctx, next) => {
  console.log('第一个中间件', ctx.request.url, ctx.method);
  await next();

});
app.use(async(ctx, next) => {
  console.log('第二个中间件', ctx.request.url, ctx.method);
  await next();
  ctx.body = 'hello world';
});
app.listen(port, () => {
  console.log(`服务器已启动 请打开 localhost:${port}`)
});


