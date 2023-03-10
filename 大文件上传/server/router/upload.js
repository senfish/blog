const fs = require('fs');
const path = require('path');


/**
 *  /upload         formdata格式
 * @param {} tempPath 
 * @returns 
 */
function uploadMiddleare(tempPath) {
  return async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.url === '/upload') {
      const {
        hash,
        index,
        filehash
      } = ctx.request.body || {};
      // 
      console.log('ctx.request.body', ctx.request.body);
      const file = ctx.request.files.file;
      const filepath = path.join(tempPath, filehash) //  temp/[filehash]
      // const isExist = fs.existsSync(path.join(tempPath));
      const isExist = fs.existsSync(filepath);
      console.log('isExist: ', isExist);
      // 将chunks文件存储在temp/[fileHash]下面
      if(!isExist) {
        // const string = fs.mkdirSync(path.join(tempPath))
        fs.mkdirSync(filepath, {recursive: true})
      }
      fs.copyFileSync(file.filepath, `${filepath}/${hash}-${index}-${file.newFilename}`)
      ctx.body = {
        code: 200,
        data: {
        },
        message: 'success'
      }
    }
    await next();
  }
}


module.exports = uploadMiddleare;