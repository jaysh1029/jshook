// 异步执行的代码

let setTimoutEvent = ldvm.memory.asyncEvent.setTimeout;
for(let i = 0; i < setTimoutEvent.length; i++){
    let event = setTimoutEvent[i];

    // 这里是为了防止clearTimeout后，事件数组中，有undefined值
    if(event === undefined){
        continue;
    }

    if(event.type === 1){
        event.callback();
    }else {
        eval(event.callback);
    }
}
