// HTMLCollection对象
HTMLCollection = function HTMLCollection() {
	return ldvm.toolsFunc.throwError("TypeError", "Failed to construct 'HTMLCollection': Illegal constructor");
}
ldvm.toolsFunc.safeProto(HTMLCollection, "HTMLCollection");
ldvm.toolsFunc.defineProperty(HTMLCollection.prototype,"length",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,HTMLCollection.prototype,"HTMLCollection","length_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(HTMLCollection.prototype,"item",{configurable:true,enumerable:true,writable:true,value: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,HTMLCollection.prototype,"HTMLCollection","item",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(HTMLCollection.prototype,"namedItem",{configurable:true,enumerable:true,writable:true,value: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,HTMLCollection.prototype,"HTMLCollection","namedItem",arguments);
    }}
);
