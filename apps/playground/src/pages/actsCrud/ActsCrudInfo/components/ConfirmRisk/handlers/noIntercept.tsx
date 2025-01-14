import { ConfirmRiskOptions, RiskHanderType } from './interface';
import { costControlHighRiskHandler } from './costControlHighRisk';
import { ICostRiskControlResult } from '@/common/constants';
import { costControlSuspectedHandler } from './costControlSuspected';
import { callRiskControlFail } from './callRiskControlFail';

const CostRiskHandlersMap: Record<ICostRiskControlResult, RiskHanderType> = {
  [ICostRiskControlResult.NoCostControl]: function ({
    onConfirm,
  }: ConfirmRiskOptions): void {
    onConfirm();
  },
  [ICostRiskControlResult.CostControlHighRisk]: costControlHighRiskHandler,
  [ICostRiskControlResult.CostControlSuspected]: costControlSuspectedHandler,
  [ICostRiskControlResult.CallRiskControlFail]: callRiskControlFail,
};

export const noInterceptHandler: RiskHanderType = (options) => {
  const { costRiskControlResult } = options.saveActRes?.riskControlResult || {};
  const handler = CostRiskHandlersMap[costRiskControlResult];
  if (!handler) {
    options.onConfirm();
  }
  return handler(options);
};
