/**
 * 请在 sum函数中调用此函数，完成数值计算
 * @param {*} a 要相加的第一个值
 * @param {*} b 要相加的第二个值
 * @param {*} callback 相加之后的回调函数
 */
function asyncAdd(a,b,callback) {
    setTimeout(function(){
        callback(null, a + b);
    },1000);
}

/**
 * 请在此方法中调用asyncAdd方法，完成数值计算
 * @param  {...any} rest 传入的参数
 */
async function sum(...rest) {
    let result = 0;
    // 隐氏类型转换， 对象 + 数字，会先调用对象的toString 方法
    const obj = {};
    obj.toString = function() {
        return result
    };
    const promises = [];
    for(let num of rest) {
        promises.push(new Promise((resolve) => {
            asyncAdd(obj, num, (_, res) => {
                resolve(res)
            })
        }).then(res => {
            // 在这里将 result的值改变之后，obj.toString 的返回值就变了，这时候下一个setTimeout调用时就使用了新值
            result = res
        }))
    }
    await Promise.all(promises);
    return result
}

let start = window.performance.now();
// 执行成功，执行时长大于1秒小于2秒
sum(1, 2, 3, 4, 5,6).then(res => {
    console.log(`计算结果为:${res}`);
    console.log(`程序执行共耗时: ${window.performance.now() - start}`)
});