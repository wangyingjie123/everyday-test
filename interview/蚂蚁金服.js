const createFlow = (() => {
    const id = Symbol('flow');
    return (takQueue) => {
        const run = (cb = () => {}) => {
            timer = Date.now();
            const _run = (task) => {
                if (typeof task === 'function') {
                    return delay(0).then(() => task());
                }
                if (Array.isArray(task)) {
                    return createFlow(task).run();
                }
                if (task[id]) {
                    return task.run();
                }
                return task;
            };
            return takQueue.reduce((pre, task) => pre.then(() => _run(task)), Promise.resolve()).then(cb);
        };
        return {
            [id]: true,
            run
        };
    }
})();
function log(...args) {
    console.log('timer:', Date.now() - timer, ...args);
}
const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));
const subFlow = createFlow([() => delay(1000).then(() => log("c"))]);
createFlow([
    () => log("a"),
    () => log("b"),
    subFlow,
    [() => delay().then(() => log("d")), () => log("e")],
]).run(() => (log('done')));