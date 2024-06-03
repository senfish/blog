
# 前置工作
> 当你看到这里，默认已成功安装mysql

## 启动mysql服务端

```bash
sudo /usr/local/mysql/support-files/mysql.server start
```

## 运行mysql客户端

```bash
mysql -u root -p
```
然后输入密码即可。

## 断开mysql客户端
> 注意：这里不用加分号

```bash
quit
exit
\q
```

# 数据库的基本操作

## 展示数据库

```bash
SHOW DATABASES;
```

## 创建数据库

创建一个用户的数据库
```bash
  CREATE DATABASE user
```
  ### IF NOT EXISTS
## 切换数据库
```bash
USE user
```
## 删除数据库
```bash
  DROP DATABASE user
```
  ### IF EXISTS 

# 表的基本操作
