const Koa = require('./index.js');
const app = new Koa();

app.use(async(ctx, next) => {
  ctx.body = 'hello world'
});

app.listen(3000);