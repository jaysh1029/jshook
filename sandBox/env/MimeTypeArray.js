// MimeTypeArray对象
MimeTypeArray = function MimeTypeArray() {
	return ldvm.toolsFunc.throwError("TypeError", "Failed to construct 'MimeTypeArray': Illegal constructor");
}
ldvm.toolsFunc.safeProto(MimeTypeArray, "MimeTypeArray");
ldvm.toolsFunc.defineProperty(MimeTypeArray.prototype,"length",{configurable:true,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MimeTypeArray.prototype,"MimeTypeArray","length_get",arguments);
    },set:undefined}
);
ldvm.toolsFunc.defineProperty(MimeTypeArray.prototype,"item",{configurable:true,enumerable:true,writable:true,value: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MimeTypeArray.prototype,"MimeTypeArray","item",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(MimeTypeArray.prototype,"namedItem",{configurable:true,enumerable:true,writable:true,value: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,MimeTypeArray.prototype,"MimeTypeArray","namedItem",arguments);
    }}
);
