import { PageUtil } from '@easy-page/antd-ui';
import {
  bdSubsidyReq,
  cmSubsidyReq,
  merchantSubsidyReq,
  userGroup,
} from '../fields';

const pu = new PageUtil({ pageId: 'userGroupLinePageInfo' });
pu.addFields([userGroup, merchantSubsidyReq, bdSubsidyReq, cmSubsidyReq]);
export const userGroupLinePageInfo = pu.getPageInfo();
console.log('userGroupLinePageInfo:', userGroupLinePageInfo);
