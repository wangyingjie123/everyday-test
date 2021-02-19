// 数组去重
function uniqBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()]
}
// [1,2,0,3,0,2]
function zeromove(arr) {
    const len = arr.length;
    for (let i = len; i >= 0; i--) {
        if (arr[i] === 0) {
            arr.splice(i, 1);
            arr.push(0)
        }
    }
    return arr;
}
const arr = [0, 0, 0, 1, 2, 0, 3, 0, 2];

/*
* 函数柯里化（一）
* 借助第二个参数
* @params fn.length形参个数
* */
// function currying(fn, length) {
//     length = length || fn.length; 	        // 注释 1
//     return function (...args) {			    // 注释 2
//         return args.length >= length	    // 注释 3
//             ? fn.apply(this, args)			// 注释 4
//             : currying(fn.bind(this, ...args), length - args.length) // 注释 5
//     }
// }
function currying2(fn) {       // 注释 1
     const flv = function(...args) {			    // 注释 2
        return args.length >= fn.length	    // 注释 3
            ? fn.apply(this, args)		    // 注释 4
            : (...arg) => flv(...args, ...arg) // 注释 5
    }
    return flv;
}
/*
* 函数柯里化（二）
* 只有一个参数，es6实现版
* */
const currying3 = fn => {
    const judge = (...args) =>
        args.length >= fn.length
            ? fn(...args)
            : (...arg) => judge(...args, ...arg)
    return judge;
}
// Test
const fn = currying(function(a, b, c, d) {
    return a + b + c + d
});
console.log(fn(1, 2, 3)(2));
// 大数相加
var plusOne = function (digits) {
    // 数值6145390195186705544超出Number基本类型的容纳范围，改用BigInt基本类型
    let num = BigInt(digits.join(''));
    // BigInt基本类型进行数学操作时，需要在数字字面量后加个n
    let string = String(num + 1n);
    let ary = string.split('');
    return ary.map(str => Number(str));
};
var nums = [6, 1, 4, 5, 3, 9, 0, 1, 9, 5, 1, 8, 6, 7, 0, 5, 5, 4, 3];
// 字符串每隔三位插入','
function commafy(num) {
    let numStr = num + '';
    let arr = num < 0 ? numStr.slice(1).split('.') : numStr.split('.');
    let a = arr[0].split(''); // 整数部分切割成数组
    for (let i = a.length - 3; i > 0; i = i - 3) {
        a.splice(i, 0, ',');
    }
    let res = arr[1] ? a.join('') + '.' + arr[1] : a.join('');
    return num < 0 ? '-' + res : res;
}
commafy('1000234');
// 转换rgba;
// hexToRGB('#F0F0F0');
const hexToRGB = (hex) => {
    if (!/(^\#([a-fA-F0-9]{3})$)|(^\#([a-fA-F0-9]{6})$)/g.test(hex)) return null
    let allNumberStr = '0123456789abcdef'; // 十六进制的所有数字
    let len = hex.slice(1).length;
    let str = len === 6 ? hex.slice(1) : hex.slice(1)[0].repeat(2) + hex.slice(1)[1].repeat(2) + hex.slice(1)[2].repeat(2);
    let arrStr = str.split('');
    let newArrStr = arrStr.map((item, index) => {
        return allNumberStr.indexOf((item + '').toLowerCase())
    });
    let num1 = newArrStr[0] * 16 + newArrStr[1];
    let num2 = newArrStr[2] * 16 + newArrStr[3];
    let num3 = newArrStr[4] * 16 + newArrStr[5];
    return `rgb(${num1}, ${num2}, ${num3})`
};
// 将url提取成对象
function getUrl(url) {
    let list = url.match(/([^?=&]+)(=([^&]*))/g || []);
    return list.reduce(
        // a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)
        (a, v) => a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), {})
}
getUrl('http://url.com/page?n=Adam&s=Smith');
// 阶乘
function factorial(n) {
    if (n === 1 || n === 0) {
        return n;
    }
    return n * factorial(n - 1);
}
factorial(5);