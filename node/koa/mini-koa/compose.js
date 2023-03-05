// - compose返回的fn是一个函数，这个函数接收context作为参数
// - fn的执行结果是一个promise

function compose(middleares) {
  return function fn (context) {
    let index = -1;
    function dispatch(i) {
      if(i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i;
      let middleare = middleares[i];
     // 别忘记fn函数的返回值是一个promise
      if(!middleare) return Promise.resolve(); 
      try {
        return Promise.resolve(middleare(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return dispatch(0);
  }
}
module.exports = compose;