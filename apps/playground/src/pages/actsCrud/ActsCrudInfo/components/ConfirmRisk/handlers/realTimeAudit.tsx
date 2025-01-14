import { Modal } from 'antd';
import { RiskHanderType } from './interface';
import { DangerouslySetInnerHTML } from '@/common';
import { CloseCircleFilled } from '@ant-design/icons';
import { commonConfirm } from './commonConfirm';

export const realTimeAuditHandler: RiskHanderType = ({
  saveActRes,
  onConfirm,
  onCancel,
}) => {
  const { riskControlResult } = saveActRes;
  const { contentRiskControlMsg } = riskControlResult;

  commonConfirm({
    onCancel,
    content: (
      <>
        <div style={{ maxHeight: 460, overflowY: 'auto' }}>
          <DangerouslySetInnerHTML>
            {contentRiskControlMsg}
          </DangerouslySetInnerHTML>
        </div>
      </>
    ),
    onConfirm,
    icon: <CloseCircleFilled className="text-red-400" />,
    cancelText: '返回修改',
    disableConfirm: true,
  });
};
