const Koa = require('./koa.js');

const app = new Koa();

app.use(async (ctx, next) => {
  console.log('1');
  next();
  console.log('2');
});
app.use(async (ctx, next) => {
  console.log('3');
  next();
  console.log('4');
});
app.use(async (ctx, next) => {
  console.log('5');
  next();
  console.log('6');
});

app.listen(3000);

// 打印 1 3 5 6 4 2