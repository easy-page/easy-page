import { nodeUtil } from '@easy-page/antd-ui';
import { planType } from '../../../fields';

export const godPricePlanType = nodeUtil.extends(planType, {
  value: '神价方案',
});
