import { DangerouslySetInnerHTML, IContentRiskControlResult } from '@/common';

import { RiskHanderType } from './interface';
import { commonConfirm } from './commonConfirm';

export const costControlSuspectedHandler: RiskHanderType = ({
  saveActRes,
  onConfirm,
  onCancel,
}) => {
  const { riskControlResult } = saveActRes;
  const {
    costRiskControlMsg,
    contentRiskControlResult,
    contentRiskControlMsg,
  } = riskControlResult;

  const isAsync =
    contentRiskControlResult === IContentRiskControlResult.AsyncAudit;

  commonConfirm({
    title: '风险提示',
    content: isAsync ? (
      <>
        <DangerouslySetInnerHTML>
          {contentRiskControlMsg}
        </DangerouslySetInnerHTML>
        <DangerouslySetInnerHTML>{costRiskControlMsg}</DangerouslySetInnerHTML>
      </>
    ) : (
      <DangerouslySetInnerHTML>{costRiskControlMsg}</DangerouslySetInnerHTML>
    ),
    onConfirm,
    onCancel,
    cancelText: '返回修改',
    okText: '确认并继续',
  });
};
