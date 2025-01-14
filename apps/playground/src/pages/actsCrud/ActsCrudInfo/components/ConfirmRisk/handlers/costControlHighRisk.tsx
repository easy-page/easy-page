import { DangerouslySetInnerHTML, IContentRiskControlResult } from '@/common';
import { CloseCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { RiskHanderType } from './interface';
import { commonConfirm } from './commonConfirm';

export const costControlHighRiskHandler: RiskHanderType = ({
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
  console.log('costRiskControlMsg:', costRiskControlMsg);
  const isAsync =
    contentRiskControlResult === IContentRiskControlResult.AsyncAudit;
  commonConfirm({
    content: isAsync ? (
      <>
        <DangerouslySetInnerHTML>
          {contentRiskControlMsg}
        </DangerouslySetInnerHTML>
        <DangerouslySetInnerHTML>{costRiskControlMsg}</DangerouslySetInnerHTML>
      </>
    ) : (
      <>
        <DangerouslySetInnerHTML>{costRiskControlMsg}</DangerouslySetInnerHTML>
      </>
    ),
    onConfirm,
    onCancel,
    icon: <CloseCircleFilled className="text-red-400" />,
    cancelText: '返回修改',
    okText: '确认并继续',
  });
};
