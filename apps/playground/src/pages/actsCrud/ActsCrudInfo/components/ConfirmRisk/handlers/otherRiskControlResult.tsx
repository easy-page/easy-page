import { DangerouslySetInnerHTML } from '@/common';
import { Modal } from 'antd';
import { RiskHanderType } from './interface';
import { commonConfirm } from './commonConfirm';

export const otherRiskControlResultHandler: RiskHanderType = ({
  saveActRes,
  onCancel,
  onConfirm,
}) => {
  const { riskControlResult } = saveActRes;
  const { contentRiskControlMsg } = riskControlResult;
  commonConfirm({
    content: (
      <DangerouslySetInnerHTML>{contentRiskControlMsg}</DangerouslySetInnerHTML>
    ),
    onConfirm,
    onCancel,
    cancelText: '返回修改',
    okText: '确认并继续',
  });
};
