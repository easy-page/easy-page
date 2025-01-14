import { commonAuth } from './commonAuth'

/** 品牌、神价方案存在撤回方案 */
export const withdrawPlan = commonAuth(
  'withdrawPlan',
  '【撤回方案】操作授权',
  'withdraw'
)
