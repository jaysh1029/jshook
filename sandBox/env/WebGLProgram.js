// WebGLProgram对象
WebGLProgram = function WebGLProgram() {
	return ldvm.toolsFunc.throwError("TypeError", "Failed to construct 'WebGLProgram': Illegal constructor");
}
ldvm.toolsFunc.safeProto(WebGLProgram, "WebGLProgram");
Object.setPrototypeOf(WebGLProgram.prototype, WebGLObject.prototype);
