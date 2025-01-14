import { PageUtil } from '@easy-page/antd-ui';
import {
  bdSubsidyReq,
  cmSubsidyReq,
  merchantSubsidyReq,
  period,
} from '../fields';

const pu = new PageUtil({ pageId: 'firstLinePeriodInfo' });
pu.addFields([period, merchantSubsidyReq, bdSubsidyReq, cmSubsidyReq]);
export const firstLinePeriodInfo = pu.getPageInfo();
