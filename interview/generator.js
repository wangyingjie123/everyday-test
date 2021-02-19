function generator(cb) {
    return (function() {
        const object = {
            next: 0,
            stop: function() {}
        };
        return {
            next: function() {
                let res = cb(object);
                if (!res) {
                    return {
                        value: undefined,
                        done: true
                    }
                }
                return {
                    value: res,
                    done: true
                }
            }
        }
    })();
}
// use
let b = generator();
b.next();
// 如果你使用 babel 编译后可以发现 test 函数变成了这样
function test() {
    var a;
    return generator(function(_context) {
        while (1) {
            switch ((_context.prev = _context.next)) {
                // 可以发现通过 yield 将代码分割成几块
                // 每次执行 next 函数就执行一块代码
                // 并且表明下次需要执行哪块代码
                case 0:
                    a = 1 + 2;
                    _context.next = 4;
                    return 2;
                case 4:
                    _context.next = 6;
                    return 3;
                // 执行完毕
                case 6:
                case "end":
                    return _context.stop();
            }
        }
    });
}