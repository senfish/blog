const Koa = require('koa');
const app = new Koa();
const path = require('path');
const cors = require('@koa/cors');
const {koaBody} = require('koa-body');
const upload = require('./router/upload.js');
const mergefile = require('./router/mergefile.js');
const progressUpload = require('./router/progress.js');

const port = 3000;
const tempPath = path.join(__dirname, 'temp'); // 切片文件暂存目录

app.use(cors());  // 处理跨域
app.use(koaBody({ // 解析上传文件
  multipart: true,
  formidable: {
    // uploadDir: tempPath,
    keepExtensions: true,
    onFileBegin: (name, file) => {
    }
  },
}));

// router
app.use(upload(tempPath)); 
app.use(mergefile(tempPath));
app.use(progressUpload(path.resolve(__dirname, './progress')));

app.listen(port, () => {
  console.log(`服务器已启动 ${port}`)
});
