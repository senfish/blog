const fse = require('fs-extra');
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
      const file = ctx.request.files.file;
      fse.move(file.filepath, `${tempPath}/${hash}-${index}-${file.newFilename}`, (err) => {
        console.log('false => fse.move => err: ', err);
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