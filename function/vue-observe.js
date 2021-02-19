/*
* @file observe
* 
* */
function observe (obj) {
    if (obj && typeof obj === 'object') {
        Object.keys(obj).forEach((key) => {
            // defineReactive方法会给目标属性装上“监听器”
            defineReactive(obj, key, obj[key]);
        })
    }
}
function defineReactive(target, key, val) {
    let dep = new Dep();
    // 重复调用observe
    observe(val);
    Object.defineProperty(target, key, {
        // 可枚举
        enumerable: true,
        // 不可配置
        configurable: false,
        get() {
            dep.addSub();
            return val;
        },
        set(value) {
            dep.notify();
        }
    })
}
class Dep {
    constructor() {
        // 初始化订阅队列
        this.sub = [];
    }
    addSub(observe) {
        this.sub.push(observe)
    }
    notify() {
        this.sub.forEach(sub => {
            sub.update();
        })
    }
}
