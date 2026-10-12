// // 异步执行的代码
// // 如果有多个异步函数要执行，这里的先后顺序，就按照浏览器中实际的顺序排序执行就行
//
// (function () {
//     let setTimoutEvent = ldvm.memory.asyncEvent.setTimeout;
//     if (setTimoutEvent === undefined) {
//         return;
//     }
//     for (let i = 0; i < setTimoutEvent.length; i++) {
//         let event = setTimoutEvent[i];
//
//         // 这里是为了防止clearTimeout后，事件数组中，有undefined值
//         if (event === undefined) {
//             continue;
//         }
//
//         if (event.type === 1) {
//             event.callback();
//         } else {
//             eval(event.callback);
//         }
//     }
// })();
//
//
// (function () {
//     let promiseEvent = ldvm.memory.asyncEvent.promise;
//     if (promiseEvent === undefined) {
//         return;
//     }
//     for (let i = 0; i < promiseEvent.length; i++) {
//         let event = promiseEvent[i];
//         if (event === undefined) {
//             continue;
//         }
//         event();
//     }
// })();
//
// (function () {
//     let listenerList = ldvm.memory.asyncEvent.listenerList;
//     if (listenerList === undefined) {
//         return;
//     }
//     for (let type in listenerList) {
//         let events = listenerList[type];
//         if (events === undefined) {
//             continue;
//         }
//         for (let i = 0; i < events.length; i++) {
//             let event = events[i];
//             if (event === undefined) {
//                 continue;
//             }
//             event.listener.call(event.self, event.options);
//         }
//     }
// })();
//
//

// 鼠标轨迹异步事件执行

(function () {

    let loadEvent = ldvm.memory.asyncEvent.listenerList["load"];

    for (let i = 0; i < loadEvent.length; i++) {
        let event = loadEvent[i];
        if (event === undefined) {
            continue;
        }
        let self = event.self;

        event.listener.call(self);
    }


    let setTimeoutEvent = ldvm.memory.asyncEvent.setTimeout;

    for (let i = 0; i < setTimeoutEvent.length; i++) {
        let event = setTimeoutEvent[i];
        if (event === undefined) {
            continue;
        }
        event.callback();
    }

// 从浏览器获取的鼠标轨迹数组
    let mouseEventData = [
        {
            "clientX": 1745,
            "clientY": 408,
            "timeStamp": 8226.5,
            "type": "mousemove"
        },
        {
            "clientX": 1746,
            "clientY": 403,
            "timeStamp": 8234,
            "type": "mousemove"
        },
        {
            "clientX": 1748,
            "clientY": 398,
            "timeStamp": 8242.5,
            "type": "mousemove"
        },
        {
            "clientX": 1748,
            "clientY": 396,
            "timeStamp": 8250.599999904633,
            "type": "mousemove"
        },
        {
            "clientX": 1749,
            "clientY": 394,
            "timeStamp": 8258.599999904633,
            "type": "mousemove"
        },
        {
            "clientX": 1749,
            "clientY": 392,
            "timeStamp": 8266,
            "type": "mousemove"
        },
        {
            "clientX": 1749,
            "clientY": 390,
            "timeStamp": 8274.299999713898,
            "type": "mousemove"
        },
        {
            "clientX": 1749,
            "clientY": 389,
            "timeStamp": 8289.299999713898,
            "type": "mousemove"
        },
        {
            "clientX": 1749,
            "clientY": 388,
            "timeStamp": 8406.799999713898,
            "type": "mousemove"
        },
        {
            "clientX": 1749,
            "clientY": 388,
            "timeStamp": 8913.400000095367,
            "type": "mousedown"
        },
        {
            "clientX": 1749,
            "clientY": 388,
            "timeStamp": 8919,
            "type": "mousemove"
        },
        {
            "clientX": 1749,
            "clientY": 388,
            "timeStamp": 8986.199999809265,
            "type": "mouseup"
        }
    ];

    for (let i = 0; i < mouseEventData.length; i++) {
        let eventData = mouseEventData[i];

        let type = eventData.type;
        let mouseEvent = {isTrusted: true};
        mouseEvent = ldvm.toolsFunc.createProxyObj(mouseEvent, MouseEvent, "mouseEvent");
        ldvm.toolsFunc.setProtoAtrr.call(mouseEvent, "clientX", eventData.clientX);
        ldvm.toolsFunc.setProtoAtrr.call(mouseEvent, "clientY", eventData.clientY);
        ldvm.toolsFunc.setProtoAtrr.call(mouseEvent, "timeStamp", eventData.timeStamp);
        ldvm.toolsFunc.setProtoAtrr.call(mouseEvent, "type", type);

        let listenerList = ldvm.memory.asyncEvent.listenerList[type];
        for (let i = 0; i < listenerList.length; i++) {
            let listener = listenerList[i];
            if (listener === undefined) {
                continue;
            }
            let callback = listenerList[i].listener;
            let self = listenerList[i].self;
            callback.call(self, mouseEvent);
        }
    }

})();

