// Event对象
Event = function Event() {
	return ldvm.toolsFunc.throwError("TypeError", "Failed to construct 'Event': 1 argument required, but only 0 present.");
}
ldvm.toolsFunc.safeProto(Event, "Event");
ldvm.toolsFunc.defineProperty(Event,"NONE",{configurable:false,enumerable:true,writable:false,value:0}
);
ldvm.toolsFunc.defineProperty(Event,"CAPTURING_PHASE",{configurable:false,enumerable:true,writable:false,value:1}
);
ldvm.toolsFunc.defineProperty(Event,"AT_TARGET",{configurable:false,enumerable:true,writable:false,value:2}
);
ldvm.toolsFunc.defineProperty(Event,"BUBBLING_PHASE",{configurable:false,enumerable:true,writable:false,value:3}
);
ldvm.toolsFunc.defineProperty(Event.prototype,"type",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,Event.prototype,"Event","type_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(Event.prototype,"target",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,Event.prototype,"Event","target_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(Event.prototype,"currentTarget",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,Event.prototype,"Event","currentTarget_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(Event.prototype,"eventPhase",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,Event.prototype,"Event","eventPhase_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(Event.prototype,"bubbles",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,Event.prototype,"Event","bubbles_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(Event.prototype,"cancelable",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,Event.prototype,"Event","cancelable_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(Event.prototype,"defaultPrevented",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,Event.prototype,"Event","defaultPrevented_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(Event.prototype,"composed",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,Event.prototype,"Event","composed_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(Event.prototype,"timeStamp",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,Event.prototype,"Event","timeStamp_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(Event.prototype,"srcElement",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,Event.prototype,"Event","srcElement_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(Event.prototype,"returnValue",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,Event.prototype,"Event","returnValue_get",arguments);
    },set: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,Event.prototype,"Event","returnValue_set",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(Event.prototype,"cancelBubble",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,Event.prototype,"Event","cancelBubble_get",arguments);
    },set: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,Event.prototype,"Event","cancelBubble_set",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(Event.prototype,"NONE",{configurable:false,enumerable:true,writable:false,value:0}
);
ldvm.toolsFunc.defineProperty(Event.prototype,"CAPTURING_PHASE",{configurable:false,enumerable:true,writable:false,value:1}
);
ldvm.toolsFunc.defineProperty(Event.prototype,"AT_TARGET",{configurable:false,enumerable:true,writable:false,value:2}
);
ldvm.toolsFunc.defineProperty(Event.prototype,"BUBBLING_PHASE",{configurable:false,enumerable:true,writable:false,value:3}
);
ldvm.toolsFunc.defineProperty(Event.prototype,"composedPath",{configurable:true,enumerable:true,writable:true,value: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,Event.prototype,"Event","composedPath",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(Event.prototype,"initEvent",{configurable:true,enumerable:true,writable:true,value: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,Event.prototype,"Event","initEvent",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(Event.prototype,"preventDefault",{configurable:true,enumerable:true,writable:true,value: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,Event.prototype,"Event","preventDefault",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(Event.prototype,"stopImmediatePropagation",{configurable:true,enumerable:true,writable:true,value: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,Event.prototype,"Event","stopImmediatePropagation",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(Event.prototype,"stopPropagation",{configurable:true,enumerable:true,writable:true,value: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,Event.prototype,"Event","stopPropagation",arguments);
    }}
);


// UIEvent对象
UIEvent = function UIEvent() {
	return ldvm.toolsFunc.throwError("TypeError", "Failed to construct 'UIEvent': 1 argument required, but only 0 present.");
}
ldvm.toolsFunc.safeProto(UIEvent, "UIEvent");
Object.setPrototypeOf(UIEvent.prototype, Event.prototype);
ldvm.toolsFunc.defineProperty(UIEvent.prototype,"view",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,UIEvent.prototype,"UIEvent","view_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(UIEvent.prototype,"detail",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,UIEvent.prototype,"UIEvent","detail_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(UIEvent.prototype,"sourceCapabilities",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,UIEvent.prototype,"UIEvent","sourceCapabilities_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(UIEvent.prototype,"which",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,UIEvent.prototype,"UIEvent","which_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(UIEvent.prototype,"initUIEvent",{configurable:true,enumerable:true,writable:true,value: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,UIEvent.prototype,"UIEvent","initUIEvent",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(UIEvent.prototype,"pseudoTarget",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,UIEvent.prototype,"UIEvent","pseudoTarget_get",arguments);
    },set:undefined}
);




// MouseEvent对象
MouseEvent = function MouseEvent() {
	return ldvm.toolsFunc.throwError("TypeError", "Failed to construct 'MouseEvent': 1 argument required, but only 0 present.");
}
ldvm.toolsFunc.safeProto(MouseEvent, "MouseEvent");
Object.setPrototypeOf(MouseEvent.prototype, UIEvent.prototype);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"screenX",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","screenX_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"screenY",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","screenY_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"clientX",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","clientX_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"clientY",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","clientY_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"ctrlKey",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","ctrlKey_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"shiftKey",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","shiftKey_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"altKey",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","altKey_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"metaKey",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","metaKey_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"button",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","button_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"buttons",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","buttons_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"relatedTarget",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","relatedTarget_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"pageX",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","pageX_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"pageY",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","pageY_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"x",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","x_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"y",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","y_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"offsetX",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","offsetX_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"offsetY",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","offsetY_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"movementX",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","movementX_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"movementY",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","movementY_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"fromElement",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","fromElement_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"toElement",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","toElement_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"layerX",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","layerX_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"layerY",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","layerY_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"getModifierState",{configurable:true,enumerable:true,writable:true,value: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","getModifierState",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(MouseEvent.prototype,"initMouseEvent",{configurable:true,enumerable:true,writable:true,value: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MouseEvent.prototype,"MouseEvent","initMouseEvent",arguments);
    }}
);
