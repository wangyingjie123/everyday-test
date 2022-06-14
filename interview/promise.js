// const pro1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('6655')
//   }, 200);
// });
// const pro2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     const num = Math.random() * 10;
//     if (num > 4) {
//       resolve(num);
//     } else  {
//       reject('err' + num);
//     }
//   }, 300)
// }).catch(e => console.log(e));
// let p3 = Promise.reject('失败').catch((e) => console.log(e));

// Promise.all([pro1, pro2, p3]).then((result) => {
//   console.log(result);
// }).catch((error) => {
//   console.log(error)
// });

// 手动实现promise
// https://zhuanlan.zhihu.com/p/102018239
class Promise {
  callbacks = [];
  state = 'pending'; // 增加状态
  value = null; // 保存结果
  constructor(fn) {
    fn(this._resolve.bind(this), this._reject.bind(this));
  }
  then(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      this._handle({
        onFulfilled: onFulfilled || null,
        onRejected: onRejected || null,
        resolve,
        reject,
      });
    });
  }

  _handle(callback) {
    if (this.state === 'pending') {
      this.callbacks.push(callback);
      return;
    }
    let cb = this.state === 'fulfilled' ? callback.onFulfilled : callback.onRejected;
    //如果then中没有传递任何东西
    if (!callback.onFulfilled) {
      cb = this.state === 'fulfilled' ? callback.resolve : callback.reject;
      cb(this.value);
      return;
    }
    let ret;

    try {
      ret = cb(this.value);
      cb = this.state === 'fulfilled' ? callback.resolve : callback.reject;
    } catch (error) {
      ret = error;
      cb = callback.reject
    } finally {
      cb(ret);
    }
  }
  catch(onError) {
    return this.then(null, onError);
  }
  finally(onDone) {
    if (typeof onDone !== 'function') return this.then();
    let Promise = this.constructor;
    return this.then(
      value => Promise.resolve(onDone()).then(() => value),
      reason => Promise.resolve(onDone()).then(() => { throw reason })
    );
  }
  static resolve(value) {
    if (value && value instanceof Promise) {
      return value;
    } else if (value && typeof value === 'object' && typeof value.then === 'function') {
      let then = value.then;
      return new Promise(resolve => {
        then(resolve);
      });

    } else if (value) {
      return new Promise(resolve => resolve(value));
    } else {
      return new Promise(resolve => resolve());
    }
  }

  static reject(value) {
    if (value && typeof value === 'object' && typeof value.then === 'function') {
      let then = value.then;
      return new Promise((resolve, reject) => {
        then(reject);
      });
    } else {
      return new Promise((resolve, reject) => reject(value));
    }
  }

  static all(promises) {
    return new Promise((resolve, reject) => {
      let fulfilledCount = 0
      const itemNum = promises.length
      const rets = Array.from({ length: itemNum })
      promises.forEach((promise, index) => {
        Promise.resolve(promise).then(result => {
          fulfilledCount++;
          rets[index] = result;
          if (fulfilledCount === itemNum) {
            resolve(rets);
          }
        }, reason => reject(reason));
      })

    })
  }

  static race(promises) {
    return new Promise(function (resolve, reject) {
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(function (value) {
          return resolve(value)
        }, function (reason) {
          return reject(reason)
        })
      }
    })
  }
}
const mockAjax = (url, s, callback) => {
  setTimeout(() => {
      callback(url + '异步请求耗时' + s + '秒');
  }, 1000 * s)
}

//Demo1
new Promise(resolve => {
  mockAjax('getUserId', 1, function (result) {
    resolve(result);
  })
}).then(result => {
  console.log(result);
})