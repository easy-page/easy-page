import { PageUtil } from '@easy-page/antd-ui';
import { godPricePlanType } from './fields';

const pu = new PageUtil({ pageId: 'shenhuiyuan' });

pu.addFields([godPricePlanType]);

export const godPricePlanInfo = pu.getPageInfo();
