// 异步执行的代码
// 如果有多个异步函数要执行，这里的先后顺序，就按照浏览器中实际的顺序排序执行就行

(function () {
    let setTimoutEvent = ldvm.memory.asyncEvent.setTimeout;
    if (setTimoutEvent === undefined) {
        return;
    }
    for (let i = 0; i < setTimoutEvent.length; i++) {
        let event = setTimoutEvent[i];

        // 这里是为了防止clearTimeout后，事件数组中，有undefined值
        if (event === undefined) {
            continue;
        }

        if (event.type === 1) {
            event.callback();
        } else {
            eval(event.callback);
        }
    }
})();


(function () {
    let promiseEvent = ldvm.memory.asyncEvent.promise;
    if (promiseEvent === undefined) {
        return;
    }
    for (let i = 0; i < promiseEvent.length; i++) {
        let event = promiseEvent[i];
        if (event === undefined) {
            continue;
        }
        event();
    }
})();

(function () {
    let listener = ldvm.memory.asyncEvent.listener;
    if (listener === undefined) {
        return;
    }
    for (let type in listener) {
        let events = listener[type];
        if (events === undefined) {
            continue;
        }
        for (let i = 0; i < events.length; i++) {
            let event = events[i];
            if (event === undefined) {
                continue;
            }
            event.listener.call(event.self, event.options);
        }
    }
})();
