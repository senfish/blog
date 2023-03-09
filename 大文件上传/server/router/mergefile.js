const fs = require('fs');
const path = require('path');

function mergeFileMiddleare(tempPath) {
  return async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.url === '/mergefile') {
      const {
        maxSize,
        extname
      } = ctx.request.body;
       // 获取切片目录列表
      let files = fs.readdirSync(tempPath);

      // 文件是无序的，合并的时候必须按照先后顺序合并
      const map = new Map();
      files = files.filter(file => file !== 'test.txt'); // hack操作，为了让temp上传上去
      files.forEach((filename) => {
        const [, index, ] = filename.split('-')
        map.set(parseInt(index), filename);
      });
      // 准备合并
      let pos = 0;
      while (pos < files.length) {
        const filename = map.get(pos);
        const abs = path.resolve(__dirname, '../temp', filename); // 得到绝对路径
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