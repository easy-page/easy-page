import { commonAuth } from './commonAuth';

export const withdrawPlanAuth = commonAuth(
  'withdrawPlanAuth',
  '【撤回方案】操作授权',
  'withdraw',
);
