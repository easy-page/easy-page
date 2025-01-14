import { ConfigListInfo } from '@/common/apis/getConfigList'
import { ActTypeEnum, BizLineEnum, EnvEnum } from '@/common/constants'
import { test, expect, vi } from 'vitest'
import { getActConfig } from './getActConfigs'
import * as libs from '../../libs'

// 引入上面定义的模拟依赖项
// ...（如果有的话，这里只是示例）

test('getActConfig returns correct config when actType matches', () => {
  const data: ConfigListInfo[] = [
    {
      config: {
        actType: ActTypeEnum.COLLECT_STORE,
        templateInfo: { test: 1, prod: 2, name: 'xxxx' },
      } as any,
      bizLine: BizLineEnum.ShanGou,
      // 假设 ConfigListInfo 还需要其他 ConfigInfo 的属性
      // ...
    } as any,
  ]

  const spy = vi.spyOn(libs, 'getEnv')
  spy.mockReturnValueOnce(EnvEnum.Test)

  const result = getActConfig({
    actType: ActTypeEnum.COLLECT_STORE,
    templateId: undefined,
    configs: data,
  })

  expect(spy).toHaveBeenCalledTimes(1)

  expect(result).toEqual({
    actType: ActTypeEnum.COLLECT_STORE, // 假设这是 ConfigInfo 的一部分
    templateInfo: { test: 1, prod: 2, name: 'xxxx' }, // 假设这是 ConfigInfo 的一部分
    bizLine: BizLineEnum.ShanGou,
    // 其他 ConfigInfo 属性...
  })
})

test('getActConfig returns correct config when templateId matches', () => {
  const data: ConfigListInfo[] = [
    {
      config: {
        actType: ActTypeEnum.COLLECT_STORE,
        templateInfo: { test: 1, prod: 2, name: 'xxxx' },
      } as any,
      bizLine: BizLineEnum.ShanGou,
      // 假设 ConfigListInfo 还需要其他 ConfigInfo 的属性
      // ...
    } as any,
  ]

  const spy = vi.spyOn(libs, 'getEnv')
  spy.mockReturnValueOnce(EnvEnum.Test)

  const result = getActConfig({
    actType: undefined,
    templateId: 1,
    configs: data,
  })
  expect(spy).toHaveBeenCalledTimes(1)
  expect(result).toEqual({
    actType: ActTypeEnum.COLLECT_STORE,
    templateInfo: { test: 1, prod: 2, name: 'xxxx' },
    bizLine: BizLineEnum.ShanGou,
    // ...
  })
})

test('getActConfig returns no config when templateId matches but env is not correct', () => {
  const data: ConfigListInfo[] = [
    {
      config: {
        actType: ActTypeEnum.COLLECT_STORE,
        templateInfo: { test: 1, prod: 2, name: 'xxxx' },
      } as any,
      bizLine: BizLineEnum.ShanGou,
      // 假设 ConfigListInfo 还需要其他 ConfigInfo 的属性
      // ...
    } as any,
  ]

  const spy = vi.spyOn(libs, 'getEnv')
  spy.mockReturnValueOnce(EnvEnum.Online)

  const res = getActConfig({
    actType: ActTypeEnum.COLLECT_STORE,
    templateId: undefined,
    configs: data,
  })
  expect(res.bizLine).toEqual(BizLineEnum.ShanGou)
  expect(res.actType).toEqual(ActTypeEnum.COLLECT_STORE)
})

test('getActConfig throws error when no matching config found', () => {
  const data: ConfigListInfo[] = []

  expect(
    getActConfig({
      actType: ActTypeEnum.COLLECT_STORE,
      templateId: undefined,
      configs: data,
    })
  ).toEqual({})
})
