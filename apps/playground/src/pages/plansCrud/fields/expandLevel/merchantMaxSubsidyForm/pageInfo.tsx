import { PageUtil, nodeUtil } from '@easy-page/antd-ui';
import { deleteRow, merchantRequestPrice, quanqianPrice } from './fields';
import { stepNumber } from './fields/stepNumber';

const pu = new PageUtil({ pageId: 'expandLevelForm' });

pu.addFields([
  stepNumber,
  quanqianPrice({}),
  merchantRequestPrice(),
  // meituanSubsidyPrice,
  deleteRow,
]);

export const merchantMaxSubsidyFormInfo = pu.getPageInfo();
