const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');


/**
 *  /upload         formdata格式
 * @param {} targetPath 
 * @returns 
 */
function uploadMiddleare(targetPath) {

  return async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.url === '/upload') {
      const {
        hash,
        index
      } = ctx.request.body || {};
      const file = ctx.request.files.file;
      // 修改文件名
      fse.move(file.filepath, `${targetPath}/${hash}-${index}-${file.newFilename}`, (err) => {
        console.log('fse.move => err: ', err);
      });
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