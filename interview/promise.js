const pro1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('6655')
  }, 200);
});
const pro2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    const num = Math.random() * 10;
    if (num > 4) {
      resolve(num);
    } else  {
      reject('err' + num);
    }
  }, 300)
}).catch(e => console.log(e));
let p3 = Promise.reject('失败').catch((e) => console.log(e));

Promise.all([pro1, pro2, p3]).then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error)
});

// 手动实现promise
function Promise(executor) {
    let self = this;
    self.status = 'pending';
    //  给promise对象指定一个存储结果的data
    self.data = undefined;
    function resovle() {

    }
    function reject() {

    }

    // 立即同步执行executor
    executor(resovle,reject)
}