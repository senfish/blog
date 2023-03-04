const delegate = require('delegates');
const proto = {}
let target = {
  foo: () => {
    return 'foo1'
  }
}

proto.target = target;
Object.defineProperty(proto, 'foo', {
  get(){
    return target['foo'];
  }
})
console.log(proto.foo()); // 'foo'
// delegate(proto, 'target').method('foo');
// console.log(proto.foo()); // 'foo'

// Object.defineProperty
Object.defineProperty(proto, 'foo', {
  get(){
    return target['foo'];
  }
})
console.log(proto.foo()); // 'foo'
// const proto = {
//   name: 'tom',
//   age: 28,
//   sex: '男',
//   getAge: () => {
//     return 28;
//   }
// }
// const target = {
//   name: 'susan',
//   age: 18,
//   sex: '女',
//   getAge: () => {
//     return 18;
//   }
// }
// proto.target = target;

// delegate(proto, 'target').access('name');
// console.log(proto.name); // 代理到target.name上，输出susan
// proto.name = '99'; // 代理到target.name 设置为99
// console.log(target.name); // 输出99

// Object.defineProperty(proto, 'name', {
//   // get(){
//   //   return target.name;
//   // },
//   set(key, value) {
//     return target[key] = value;
//   }
// })


// setter ===========
// delegate(proto, 'target').setter('name');
// proto.name = '55';
// console.log(target.name);
// method ===========
// delegate(proto, 'target').method('getAge');
// 使用这个库的前期就是 proto.target = target 因为其内部需要this[target]，this就是proto
// method：代理方法，当调用proto[name]，其实是调用了target[name]
// access ===========
// delegate(proto, 'target').access('name');
// console.log(proto.name);
// proto.name = 'hahaha';
// console.log('proto.name', proto.name)
// console.log('target.name', target.name)
