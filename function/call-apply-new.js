// call
Function.prototype.myCall = function (content, ...args) {
    if (typeof this !== 'function') {
        throw new Error('not a function');
    }
    let fn = Symbol('fn');
    content = content || window;
    content[fn] = this;
    let res = content[fn](...args);
    delete content[fn];
    return res;
};
// bind
Function.prototype.myBind = function (that, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    const self = this;
    // new优先级
    let fbound = function () {
        self.apply(this instanceof self ? this : that, args.concat(Array.prototype.slice.call(arguments)));
    };
    // 继承原型上的属性和方法
    fbound.prototype = Object.create(self.prototype);
    return fbound;
};
// 实现new
function mynew(con, ...args) {
    const obj = {};
    Object.setPrototypeOf(obj, con.prototype);
    // 类似于
    let result = con.apply(obj, args);
    return result instanceof Object ? result : obj;
}