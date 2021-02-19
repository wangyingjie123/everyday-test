function promiseall(list) {
    let res = [];
    return new Promise((resolve, reject) => {
        for (const v of list) {
            v.then((result) => {
                res.push(result);
                if (res.length === list.length) {
                    resolve(res)
                }
            }, reject);
        }
    })
}

let p1 = Promise.resolve(3);
// 取消fetch请求
const contro = new AbortController();
const { signal } = contro;

// 防抖
function debonce(fun, wait) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fun.apply(this, args);
        }, wait);
    }
}

// 节流
function throttle(fn, wait) {
    let timer = null;
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args);
                timer = null;
            }, wait);
        }
    }
}

// 废弃那波
function climbStairs(n) {
    let dp = [];
    dp[0] = 1;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp;
}

// indexOf  2020.08.18
function myIndexOf(str1, str2) {
    let m = str1.length;
    let n = str2.length;
    for (let i = 0; i < m - n; i++) {
        let temp = str1.substr(i, n);
        if (temp === str2) {
            return i;
        }
    }
    return -1;
}
console.log(myIndexOf('baidu haha', 'ah'));