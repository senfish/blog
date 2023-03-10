const fs = require('fs');
const path = require('path');

/**
 * 
 * @param {string} tempPath   临时文件存储路径
 * @returns 
 */
function mergeFileMiddleare(tempPath) {
  return async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.url === '/mergefile') {
      const {
        maxSize,
        originFilename,
        filehash
      } = ctx.request.body;
       // 获取切片目录列表
      let files = fs.readdirSync(path.join(tempPath, filehash));
      console.log('files: ', files);
      const extname = path.extname(originFilename);
      // 文件是无序的，合并的时候必须按照先后顺序合并，创建map映射表
      const map = new Map();
      files.forEach((filename) => {
        const [, index, ] = filename.split('-')
        map.set(parseInt(index), filename);
      });
      // 准备合并
      let pos = 0;
      while (pos < files.length) {
        const filename = map.get(pos);
        const abs = path.join(tempPath, filehash, filename)
        console.log('abs: ', abs);
        // const abs = path.resolve(__dirname, '../temp', filename); // 获取切片的绝对路径
        const rs = fs.createReadStream(abs);
        const ws = fs.createWriteStream(path.join(__dirname, `../static/${filehash}${extname}`), {
          start: pos * maxSize // 开始写入的字节的位置
        });
        rs.pipe(ws);
        rs.on('end', () => {
          fs.unlinkSync(abs); // 合并之后删除文件
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