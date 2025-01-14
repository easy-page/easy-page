import { StockRequestEnum } from '@/common/apis/saveAct/interfaces/stockReq';
import { ChildFormState, getChildrenFormData } from '@easy-page/antd-ui';
import { StockReqFormState } from '../../stockReq/interface';
import { RangeState } from '@/common/fields';

export const getStockExpandLevel = (
  stockRule: ChildFormState<StockReqFormState>,
) => {
  const formData = getChildrenFormData(stockRule?.formUtils);
  const stockInfo = formData?.[0] || {};
  return stockInfo[StockRequestEnum.Stock4Expand];
};
