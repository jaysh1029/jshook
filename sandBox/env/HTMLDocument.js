// HTMLDocument对象
let HTMLDocument = function HTMLDocument() {
	return ldvm.toolsFunc.throwError("TypeError", "Failed to construct 'HTMLDocument': Illegal constructor");
}
ldvm.toolsFunc.safeProto(HTMLDocument, "HTMLDocument");
Object.setPrototypeOf(HTMLDocument.prototype, Document.prototype);




// document对象
let document = {};
Object.setPrototypeOf(document, HTMLDocument.prototype);
ldvm.toolsFunc.defineProperty(document,"location",{configurable:false,enumerable:true,get: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,document,"document","location_get",arguments);
    },set: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,document,"document","location_set",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(document,"createTouch",{configurable:true,enumerable:true,writable:true,value: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,document,"document","createTouch",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(document,"createTouchList",{configurable:true,enumerable:true,writable:true,value: function () {
        // 分发器
        return ldvm.toolsFunc.dispatch(this,document,"document","createTouchList",arguments);
    }}
);
ldvm.toolsFunc.defineProperty(document,"webL10n",{configurable:true,enumerable:true,writable:true,value:{}}
);
