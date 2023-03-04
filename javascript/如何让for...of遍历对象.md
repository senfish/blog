
![](https://files.mdnice.com/user/8652/bc77e338-90f2-41d5-9f66-a6a0558242de.png)

前一段时间面试的时候被问过这个问题，所以记录一下。

## for...of为什么可以遍历数组，却不能对象


当一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有`iterator` 接口，就可以用`for...of`循环遍历它的成员。也就是说，`for...of`循环内部调用的是数据结构的`Symbol.iterator`方法。


先看看数组的`Symbol.iterator`：
```js
const a = [1,2,3];

const iterator = a[Symbol.iterator]();

iterator.next(); // { value: 1, done: false }
iterator.next(); // { value: 2, done: false }
iterator.next(); // { value: 3, done: false }
iterator.next(); // { value: undefined, done: true }

```
当我每次调用`next`方法时，都会返回一个对象，表示当前数据成员的信息。这个对象具有`value`和`done`两个属性，`value`属性返回当前位置的成员，`done`属性是一个布尔值，表示遍历是否结束，即是否还有必要再一次调用`next`方法。

`Iterator` 的遍历过程是这样的：

- 创建一个指针对象（`Symbol.iterator()`返回的对象），指向当前数据结构的起始位置。
- 第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。

- 第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。

- 不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。
## 重写Object的Symbol.iterator方法

要想让`for...of`能遍历对象也很简单，只需要像数组一样，提供一个`iterator`的接口即可。

```js
const obj = {
    name: 'tom',
    age: 12
};

obj[Symbol.iterator] = function () {
  let values = Object.values(this);
  let length = values.length;
  let index = 0;
  return {
    next: function () {
      if(index <= length - 1) {
        return {
          value: values[index++],
          done: false
        }
      } else {
        return {
          value: undefined,
          done: true
        }
      }
    }
  }
}
const objIterator = obj[Symbol.iterator]();
objIterator.next();// {value: 'tom', done: false}
objIterator.next();// {value: 12, done: false}
objIterator.next();// {value: undefined, done: true}

for(let value of obj) {
  console.log('value:',value);
}
// value:  'tom'
// value:  12
```
## 原生具有iterator接口的数据结构
- Set
- Map
- String
- Array
- Nodelist
- TypeArray
- 函数的arguments对象
## 总结

`for...of`之所以能遍历数组是因为数组的原型上有`Symbol.iterator`方法，相当于给`for...of`提供一个可遍历的接口，所以想要`for...of`遍历对象，重写`Object`原型上的`Symbol.iterator`方法即可。