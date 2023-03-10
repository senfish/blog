# 大文件切片上传

## 文件目录
```js
├─.gitignore
├─readStream.js
├─readme.md
├─writeStream.js
├─vite-client // 客户端
├─server // 服务端
```

vite-client
```js
├─.gitignore
├─index.html
├─package.json
├─vite.config.js
├─src
   ├─App.jsx
   ├─app.less
   ├─main.jsx
```
server
```js

├─.gitignore
├─1.txt
├─2.txt
├─index.js
├─package.json
├─target // 切片文件暂存目录
├─static // 合并之后的文件目录
├─router
    ├─mergefile.js // 合并文件路由
    └─upload.js // 上传文件路由
```

## 如何运行
启动客户端
```git
cd vite-client
cnpm install
npm start
```

启动服务端
```git
cd server
cnpm install
npm start
```

## 注意 
为了测试方便，切片请上传`chunk.txt`文件，测试进度条请上传`progress.txt`文件。
- chunk.txt不宜过大


## 如何显示进度条

利用对应的请求方法函数，比如`xhr.upload.onprogress`或者`axios`的`onUploadProgress`方法。

## 如何做断点续传

### 断点 (暂停功能)

- 利用对应的请求方法，比如xhr.abort、axios的CancelToken；
- 遍历切片数组的时候，在发送的请求的时候，用一个abortQueue数组收集每一个请求的实例，当这个请求结束之后删除对应的实例
- 点击暂停的时候，遍历abortQueue，调用对应的abort方法，最后清空abortQueue数组即可。

### 续传（恢复上传）
在服务器上，假设暂时存储上传文件的目录为：
```js
├─temp
   ├─[hahs] 大文件名的hash
        ├─[chunkhash-1] 每一个chunk的hash
        ├─[chunkhash-2] 
```

- 恢复上传的时候，拿大文件名hash去请求后端接口，看看`temp/[hash]`是否存在
- 存在的话，返回`temp/[hash]`每一个chunkHash组成的数组(chunkHashList)，否则返回一个空数组
- 前端拿到请求回来的chunkHashList，跟大文件切片的chunkhash数组比较一下，删除重复的即可，剩下的就是未上传的
- 上传未上传的chunkhash数组


### 秒传（todo）

客户端上传之前应该先发送一个校验的接口，把大文件的hash传给服务端，服务端拿到hash之后，去static目录下面找，如果存在的时候，说明已经有了，就不传；