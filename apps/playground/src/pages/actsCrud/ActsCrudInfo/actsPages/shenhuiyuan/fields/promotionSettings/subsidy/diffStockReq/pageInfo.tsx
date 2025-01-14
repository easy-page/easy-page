import { nodeUtil, PageUtil } from '@easy-page/antd-ui';
import { bdStockReq, cmSubsidyReq, merchantStockDaily } from './fields';

const pu = new PageUtil({ pageId: 'budget-form' });
pu.addFields([merchantStockDaily, bdStockReq, cmSubsidyReq]);

export const stockReqTablePageInfo = pu.getPageInfo();
