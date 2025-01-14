import { describe, expect, test, beforeEach, vi } from 'vitest';
import { execAuth } from './base';
import { message } from 'antd';
import { AuthHandler, AuthHandlerRes, OperaitonContext } from '@/common/auths';

// 使用 esbuild 打包测试代码时，需要 mock antd
vi.mock('antd', () => ({
  message: {
    error: vi.fn(),
  },
}));

describe('execAuth', () => {
  const mockContext: OperaitonContext<any> = {} as any; // 根据你的实际 OperaitonContext 类型进行初始化

  beforeEach(() => {
    vi.clearAllMocks(); // 重置所有模拟
  });

  const createAuthHandler = (
    allow: boolean,
    continueNextResult: 'allow' | 'deny' = 'deny',
    msg?: string,
  ): AuthHandler => {
    return vi
      .fn()
      .mockResolvedValue({ allow, continueNextResult, msg } as AuthHandlerRes);
  };

  test('should return { allow: true } if no auth handlers are provided', async () => {
    const result = await execAuth(mockContext, []);
    expect(result).toEqual({ allow: true });
  });

  test('should stop and show error message if auth handler returns allow: false and continueNextResult is not deny', async () => {
    const authHandler = createAuthHandler(false, 'allow', 'No permission');
    const result = await execAuth(mockContext, [authHandler]);

    expect(result).toEqual({ allow: false, msg: 'No permission' });
    expect(authHandler).toHaveBeenCalledWith(mockContext);
    expect(message.error).toHaveBeenCalledWith('No permission');
  });

  test('should continue to next auth handler if auth handler returns allow: true and continueNextResult is allow', async () => {
    const authHandler1 = createAuthHandler(true, 'allow');
    const authHandler2 = createAuthHandler(
      false,
      'deny',
      'Second handler failed',
    );

    const result = await execAuth(mockContext, [authHandler1, authHandler2]);

    expect(result).toEqual({ allow: false, msg: 'Second handler failed' });
    expect(authHandler1).toHaveBeenCalledWith(mockContext);
    expect(authHandler2).toHaveBeenCalledWith(mockContext);
    expect(message.error).toHaveBeenCalledWith('Second handler failed');
  });

  test('should stop and not show error message if auth handler returns allow: true and continueNextResult is not allow', async () => {
    const authHandler = createAuthHandler(true, 'deny');
    const result = await execAuth(mockContext, [authHandler]);

    expect(result).toEqual({ allow: true });
    expect(authHandler).toHaveBeenCalledWith(mockContext);
    expect(message.error).not.toHaveBeenCalled();
  });

  test('should allow if all auth handlers return allow: true', async () => {
    const authHandler1 = createAuthHandler(true, 'allow');
    const authHandler2 = createAuthHandler(true, 'allow');

    const result = await execAuth(mockContext, [authHandler1, authHandler2]);

    expect(result).toEqual({ allow: true });
    expect(authHandler1).toHaveBeenCalledWith(mockContext);
    expect(authHandler2).toHaveBeenCalledWith(mockContext);
    expect(message.error).not.toHaveBeenCalled();
  });

  test('should stop and return result if auth handler returns allow: true and continueNextResult is deny', async () => {
    const authHandler1 = createAuthHandler(true, 'deny');
    const authHandler2 = createAuthHandler(
      false,
      'allow',
      'Second handler should not be called',
    );

    const result = await execAuth(mockContext, [authHandler1, authHandler2]);

    expect(result).toEqual({ allow: true });
    expect(authHandler1).toHaveBeenCalledWith(mockContext);
    expect(authHandler2).not.toHaveBeenCalled();
    expect(message.error).not.toHaveBeenCalled();
  });

  test('should stop and return result if auth handler returns allow: true and continueNextResult is deny with funcAuth', async () => {
    const authHandler1 = createAuthHandler(true, 'deny');
    const authHandler2 = createAuthHandler(
      false,
      'allow',
      'Second handler should not be called',
    );

    const result = await execAuth(mockContext, () => [
      authHandler1,
      authHandler2,
    ]);

    expect(result).toEqual({ allow: true });
    expect(authHandler1).toHaveBeenCalledWith(mockContext);
    expect(authHandler2).not.toHaveBeenCalled();
    expect(message.error).not.toHaveBeenCalled();
  });
});
