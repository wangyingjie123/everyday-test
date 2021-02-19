/*
* @url https://juejin.cn/post/6844903856489365518#heading-28
*/
class EventEmitter {
    constructor() {
        this.sub = {}
    }
    on(event, cb) {
        (this.sub[event] || (this.sub[event] = [])).push(cb);
    }
    emit(event, ...args) {
        this.sub[event] && this.sub[event].forEach(cb => cb(...args));
    }
    once(event, oneCb) {
        const cb = (...args) => {
            oneCb(...args);
            this.off(event, oneCb);
        }
        this.on(event, cb);
    }
    off(event, offCb) {
        if (this.sub[event]) {
            let index = this.sub[event].findIndex(cb => cb === offCb);
            this.sub[event].splice(index, 1);
            if (!this.sub[event].length) delete this.sub[event]
        }
    }
}