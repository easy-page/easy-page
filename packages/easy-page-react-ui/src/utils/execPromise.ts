/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * - 确保副作用的执行顺序
 * - 以最后一次执行的副作用为准，若上一个副作用还在执行中，下一个来了，则优先执行下一个
 * - 一般会在刚加载组件时，初始化执行副作用，执行中时，存在页面状态变更带来的副作用，优先后者。
 */
export class EffectsManager {
  private controller: AbortController;

  private signal: AbortSignal;

  private effectPromise: Promise<any> | null = null;

  private nodeId: string;

  constructor(nodeId: string) {
    this.controller = new AbortController();
    this.signal = this.controller.signal;
    this.nodeId = nodeId;
    // console.log('初始化副作用管理器：', this.nodeId)
  }

  private doExecutePromise<T>(promise: Promise<T>): Promise<T> {
    this.effectPromise = promise;
    return promise.then((result) => {
      this.effectPromise = null;
      return result;
    });
  }

  cancelCurrentPromise() {
    if (this.effectPromise) {
      this.controller.abort();
    }
  }

  executePromise(todo: Promise<any>): Promise<any> {
    // 取消当前正在执行的 Promise
    this.cancelCurrentPromise();
    // 创建一个新的 Promise
    const promise = new Promise<any>((resolve, reject) => {
      // 在 Promise 中检查取消信号
      this.signal.addEventListener('abort', () => {
        reject(new Error('Promise was cancelled'));
      });

      // 执行异步操作
      todo.then((res) => {
        return resolve(res);
      });
    });

    // 执行 Promise
    return this.doExecutePromise(promise);
  }
}
