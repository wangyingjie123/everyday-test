/*
 * @file 扩展object
 * 
 */
const entry = {
    'a.b.c.dd': 'abcdd',
    'a.d.xx': 'adxx',
    'a.e': 'ae'
}

// 要求转换成如下对象
const output = {
    a: {
        b: {
            c: {
                dd: 'abcdd'
            }
        },
        d: {
            xx: 'adxx'
        },
        e: 'ae'
    }
}

function transform(obj) {
    const res = {};
    for (let [keys, value] of Object.entries(obj)) {
        keys.split('.').reduce((prev, cur, idx, arr) =>
            prev[cur] = prev[cur] || (arr[idx + 1] ? {} : value), res)
    }
    return res;
}
console.log(transform(entry));