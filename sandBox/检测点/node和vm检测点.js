// node环境 globalThis 检测点

delete global;
delete Buffer;
delete process;

// vm2环境 globalThis 检测点
delete global;
delete Buffer;
delete process;
delete GLOBAL;
delete root;
delete VMError;

// delete VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL; // 这个删除可能报错




