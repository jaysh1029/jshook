// WebGLObject对象
WebGLObject = function WebGLObject() {
	return ldvm.toolsFunc.throwError("TypeError", "Failed to construct 'WebGLObject': Illegal constructor");
}
ldvm.toolsFunc.safeProto(WebGLObject, "WebGLObject");


// WebGLBuffer对象
WebGLBuffer = function WebGLBuffer() {
	return ldvm.toolsFunc.throwError("TypeError", "Failed to construct 'WebGLBuffer': Illegal constructor");
}
ldvm.toolsFunc.safeProto(WebGLBuffer, "WebGLBuffer");
Object.setPrototypeOf(WebGLBuffer.prototype, WebGLObject.prototype);
