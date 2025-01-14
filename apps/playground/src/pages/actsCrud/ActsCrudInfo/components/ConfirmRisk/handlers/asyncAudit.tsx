import { Modal } from 'antd';
import { RiskHanderType } from './interface';
import { DangerouslySetInnerHTML } from '@/common';
import { CloseCircleFilled } from '@ant-design/icons';
import { commonConfirm } from './commonConfirm';

export const asyncAuditHandler: RiskHanderType = ({
  saveActRes,
  onConfirm,
  onCancel,
}) => {
  const { riskControlResult } = saveActRes;
  const { costRiskControlMsg, contentRiskControlMsg } = riskControlResult;
  commonConfirm({
    content: (
      <>
        <DangerouslySetInnerHTML>
          {contentRiskControlMsg}
        </DangerouslySetInnerHTML>
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
