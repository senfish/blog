const fs = require('fs');
const path = require('path');

function mergeFileMiddleare(targetPath) {
  return async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.url === '/mergefile') {
      console.log('merge请求的body', ctx.request.body);
      const {
        maxSize,
        extname
      } = ctx.request.body;
       // 获取切片目录列表
      const files = fs.readdirSync(targetPath);

      // 文件是无序的，合并的时候必须按照先后顺序合并
      const map = new Map();
      files.forEach((filename) => {
        const [, index, ] = filename.split('-')
        map.set(parseInt(index), filename);
      });

      // 准备合并
      let pos = 0;
      while (pos < files.length) {
        const filename = map.get(pos);
        const abs = path.resolve(__dirname, '../target', filename); // 得到绝对路径
        const rs = fs.createReadStream(abs);
        const ws = fs.createWriteStream(path.resolve(__dirname, `../static/combine${extname}`), {
          start: pos * maxSize // 开始写入的字节的位置
        });
        rs.pipe(ws);
        rs.on('end', () => {
          fs.unlinkSync(abs)
        });
        pos++;
      }
    }
    ctx.body = {
      code: 200,

    }
    await next();
  }
}

module.exports = mergeFileMiddleare;