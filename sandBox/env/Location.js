// Location对象
Location = function Location() {
	return ldvm.toolsFunc.throwError("TypeError", "Failed to construct 'Location': Illegal constructor");
}
ldvm.toolsFunc.safeProto(Location, "Location");


// location对象
let location = {};
Object.setPrototypeOf(location, Location.prototype);
ldvm.toolsFunc.defineProperty(location,"valueOf",{configurable:false,enumerable:false,writable:false,value: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","valueOf",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(location,"ancestorOrigins",{configurable:false,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","ancestorOrigins_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(location,"href",{configurable:false,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","href_get",arguments,"chrome-extension://aikflfpejipbpjdlfabpgclhblkpaafo/index.html");
    },set: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","href_set",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(location,"origin",{configurable:false,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","origin_get",arguments,"chrome-extension://aikflfpejipbpjdlfabpgclhblkpaafo");
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(location,"protocol",{configurable:false,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","protocol_get",arguments,"chrome-extension:");
    },set: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","protocol_set",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(location,"host",{configurable:false,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","host_get",arguments,"aikflfpejipbpjdlfabpgclhblkpaafo");
    },set: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","host_set",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(location,"hostname",{configurable:false,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","hostname_get",arguments,"aikflfpejipbpjdlfabpgclhblkpaafo");
    },set: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","hostname_set",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(location,"port",{configurable:false,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","port_get",arguments,"");
    },set: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","port_set",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(location,"pathname",{configurable:false,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","pathname_get",arguments,"/index.html");
    },set: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","pathname_set",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(location,"search",{configurable:false,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","search_get",arguments,"");
    },set: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","search_set",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(location,"hash",{configurable:false,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","hash_get",arguments,"");
    },set: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","hash_set",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(location,"assign",{configurable:false,enumerable:true,writable:false,value: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","assign",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(location,"reload",{configurable:false,enumerable:true,writable:false,value: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","reload",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(location,"replace",{configurable:false,enumerable:true,writable:false,value: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","replace",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(location,"toString",{configurable:false,enumerable:true,writable:false,value: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,location,"location","toString",arguments);
    }}
);
