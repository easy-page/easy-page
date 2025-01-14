import { PageUtil } from '@easy-page/antd-ui';
import {
  allDay,
  bdSubsidyReq,
  cmSubsidyReq,
  merchantSubsidyReq,
} from '../fields';

const pu = new PageUtil({ pageId: 'allDayLinePageInfo' });
pu.addFields([allDay, merchantSubsidyReq, bdSubsidyReq, cmSubsidyReq]);
export const allDayLinePageInfo = pu.getPageInfo();
