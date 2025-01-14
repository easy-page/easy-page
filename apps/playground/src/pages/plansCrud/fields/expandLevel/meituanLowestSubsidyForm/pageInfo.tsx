import { PageUtil, nodeUtil } from '@easy-page/antd-ui';
import { merchantRequestPrice } from './fields/merchantRequestPrice';
import { meituanSubsidyPrice } from './fields/meituanSubsidyPrice';

const pu = new PageUtil({ pageId: 'expandLevelForm' });

pu.addFields([merchantRequestPrice, meituanSubsidyPrice]);

export const meituanLowestSubsidyFormInfo = pu.getPageInfo();

console.log('meituanLowestSubsidyFormInfo:', meituanLowestSubsidyFormInfo);
