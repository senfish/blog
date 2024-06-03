
## 前置工作
> 当你看到这里，默认已成功安装mysql

### mysql服务端
**启动mysql服务端**
```bash
sudo /usr/local/mysql/support-files/mysql.server start
```
<img width="575" alt="image" src="https://github.com/senfish/blog/assets/49187663/c67bec7a-fe3d-4501-b1be-8e40398db120">


**查看mysql服务端运行状态**
```bash
sudo /usr/local/mysql/support-files/mysql.server status
```
<img width="566" alt="image" src="https://github.com/senfish/blog/assets/49187663/c4884c7c-b4a7-46e7-b5fd-afff4b0bf5f3">

**断开mysql服务端**
```bash
sudo /usr/local/mysql/support-files/mysql.server stop
```
<img width="544" alt="image" src="https://github.com/senfish/blog/assets/49187663/ea3e3f86-eea8-4aec-a72b-53e15f08674b">


### mysql客户端
**运行mysql客户端**

```bash
mysql -u root -p
```
然后输入密码即可。

<img width="733" alt="image" src="https://github.com/senfish/blog/assets/49187663/ff9ec19b-8ee8-430a-b1b1-a9ebc9a95b09">

**断开mysql客户端**
> 注意：这里不用加分号
- quit
- exit
- \q

这三个任选其一都可以
```bash
quit
```
<img width="215" alt="image" src="https://github.com/senfish/blog/assets/49187663/3328dd3a-5ab8-444f-aa88-c99b7cdc47e6">

## 数据库的基本操作

### 展示数据库

```bash
SHOW DATABASES;
```
<img width="288" alt="image" src="https://github.com/senfish/blog/assets/49187663/aa859084-5afe-4d2c-bad7-b15ec26453b7">

可以看到，mysql内置了四个数据库，这些数据库都是给`mysql`自己内部使用的，如果我们想用`mysql`数据库存储数据，首先要创建一个数据库
### 创建数据库
```bash
CREATE DATABASE 数据库名称;
```
创建一个数据库名字为user的数据库，
```bash
CREATE DATABASE user;
```
<img width="342" alt="image" src="https://github.com/senfish/blog/assets/49187663/0f89dfba-1512-4ca1-90e1-df885c9f8247">

**IF NOT EXISTS**

如果创建一个已经存在的数据库，就会抛出一个错误，例如，我们继续创建一个名字为`user`的数据库
<img width="607" alt="image" src="https://github.com/senfish/blog/assets/49187663/05dcf644-7c96-4838-99e8-6a4883bbb57c">

错误信息告诉我们不能创建user数据库，该数据库已经存在。当我们创建一个数据库，我们也不能确定它到底存不存在的时候，就可以用下面的语句来创建数据库
```bash
CREATE DATABASE IF NOT EXISTS 数据库名;
```
这个意思是如果指定的数据库不存在的话就创建它，否则的话什么都不做。我们试一试：

<img width="446" alt="image" src="https://github.com/senfish/blog/assets/49187663/ead519f4-0f4e-4f60-83a0-57dbc96656bd">

可以看到，当我们再次创建名为`user`数据库的时候，不再像之前一样抛出了一个error，而是有一个waring提示，并不影响语句的执行


### 切换数据库
```bash
USE 数据库名称;
```
让我们切换到`user`数据库
```bash
USE user;
```

<img width="204" alt="image" src="https://github.com/senfish/blog/assets/49187663/5e3ed9ae-4f51-4929-b216-bb65ef7fab94">

### 删除数据库
> 删除数据库是一个极其危险的操作，删除数据库，意味着里面的数据都没有了，在真实的工作环境中，使用时需要极其谨慎。


```bash
DROP DATABASE 数据库名称;
```
让我们删除user数据库试试：
```bash
DROP DATABASE user;
```
<img width="384" alt="image" src="https://github.com/senfish/blog/assets/49187663/4762ebcc-a924-40ed-ac73-0a7273b6c2f8">

再看看现在还剩下那些数据库：
<img width="265" alt="image" src="https://github.com/senfish/blog/assets/49187663/8fbaf324-9986-4396-ae86-2e34d9538fbd">

**IF EXISTS**
如果某个数据库不存在，我们仍旧调用`DROP DATABASE`语句去删除它，不过会报错的：
<img width="727" alt="image" src="https://github.com/senfish/blog/assets/49187663/0a9ffde1-bdf1-4dea-a202-bd9d828708c9">

如果想避免这种报错，可以使用这种形式的语句来删除数据库：

```bash
DROP DATABASE IF EXISTS 数据库名称;
```
<img width="455" alt="image" src="https://github.com/senfish/blog/assets/49187663/b13a2aa3-eb78-4d9a-9386-f11982ed18e0">

这样就不会报错了。（别忘了把user数据库重新创建一下，并切换到这个数据库）

## 表的基本操作
