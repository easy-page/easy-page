import { PageUtil } from '@easy-page/antd-ui';
import { period } from '../fields';
import { periodTip } from '../fields/periodTip';

const pu = new PageUtil({ pageId: 'otherLinePeriodInfo' });
export const getOtherLinePageInfo = () => {
  pu.addFields([period, periodTip]);
  return pu.getPageInfo();
};
