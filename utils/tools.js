/*
* @file debounce.js
* @author wangyingjie
* @params options.leading 是否立即执行
* */
const debounce = (func, time = 100, options = {
    leading: true,
    context: null
}) => {
    let timer;
    const _debounce = function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        if (options.leading && !timer) {
            timer = setTimeout(null, time);
            func.apply(options.context, args);
        } else {
            timer = setTimeout(() => {
                func.apply(options.context, args);
                timer = null;
            }, time)
        }
    };
    _debounce.cancel = function () {
        clearTimeout(timer);
        timer = null;
    };
    return _debounce
};
/*
* @file throttle.js
* @author wangyingjie
* @params func 执行函数
* @params options.leading 是否立即执行
* @params options.trailing 结束后是否再执行一次
* */
const throttle = (
    func,
    time = 100,
    options = {
        leading: true,
        trailing: false,
        context: null
    }
) => {
    let previous = new Date(0).getTime();
    let timer;
    const _throttle = function (...args) {
        let now = new Date().getTime();
        if (!options.leading) {
            if (timer) return;
            timer = setTimeout(() => {
                timer = null;
                func.apply(options.context, args)
            }, time);
        } else if (now - previous > time) {
            func.apply(options.context, args);
            previous = now;
        } else if (options.trailing) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(options.context, args);
            }, time);
        }
    };
    _throttle.cancel = () => {
        previous = 0;
        clearTimeout(timer);
        timer = null;
    };
    return _throttle;
};
export {
    debounce,
    throttle
}