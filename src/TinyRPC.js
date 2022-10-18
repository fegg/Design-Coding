import EventEmitter from 'eventemitter2';
/**
 * 简单 rpc 的架构模拟
 */

const protocol = 'bolt'; // proto

class RegistryCenter extends EventEmitter {}

class Consumer extends EventEmitter {
  constructor() {
    super();
    this.dynamicProxy = {};
    this.stub = {
      encode() {},
      decode() {},
    };
  }

  reqEncode() {}

  resDecode() {}
}

class ServiceProvider extends EventEmitter {}
