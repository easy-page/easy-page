import { DangerouslySetInnerHTML } from '@/common';

import { RiskHanderType } from './interface';
import { commonConfirm } from './commonConfirm';

export const callRiskControlFail: RiskHanderType = ({
  saveActRes,
  onConfirm,
  onCancel,
}) => {
  const { riskControlResult } = saveActRes;
  const { costRiskControlMsg } = riskControlResult;

  commonConfirm({
    title: '调用风控失败',
    content: (
      <DangerouslySetInnerHTML>{costRiskControlMsg}</DangerouslySetInnerHTML>
    ),
    onConfirm,
    onCancel,
    disableConfirm: true,
    cancelText: '关闭',
  });
};
