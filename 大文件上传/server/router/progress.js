const fse = require('fs-extra');
const path = require('path');

function progressUpload(savePath) {
  console.log('savePath: ', savePath);
  return async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.url === '/progress') {
      const file = ctx.request.files.file;
      // 将文件存入到progress下面文件名
      // fse.move(file.filepath, `${savePath}/${file.originalFilename}`, (err) => {
      //   console.log('fse.move => err: ', err);
      // });
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


module.exports = progressUpload;