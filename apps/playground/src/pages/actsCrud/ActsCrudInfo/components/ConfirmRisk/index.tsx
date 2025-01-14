import { IContentRiskControlResult, isCopy, isCreate, isEdit } from '@/common';
import { ConfirmRiskOptions, RiskHanderType } from './handlers/interface';
import { asyncAuditHandler } from './handlers/asyncAudit';
import { realTimeAuditHandler } from './handlers/realTimeAudit';
import { noInterceptHandler } from './handlers/noIntercept';
import './index.less';

export const getSuccessTips = () => {
  if (isCreate() || isCopy()) {
    return '活动创建成功';
  }
  if (isEdit()) {
    return '活动编辑成功';
  }
};

export const RiskHandlerMap: Record<IContentRiskControlResult, RiskHanderType> =
  {
    [IContentRiskControlResult.NoIntercept]: noInterceptHandler,
    [IContentRiskControlResult.AsyncAudit]: asyncAuditHandler,
    [IContentRiskControlResult.RealTimeAudit]: realTimeAuditHandler,
  };

export const confirmRisk = (options: ConfirmRiskOptions) => {
  const { saveActRes, onConfirm } = options;
  const { riskControlResult } = saveActRes;
  if (!riskControlResult) {
    onConfirm();
    return;
  }
  const hander = RiskHandlerMap[riskControlResult.contentRiskControlResult];
  if (!hander) {
    onConfirm();
    return;
  }
  return hander(options);
};
