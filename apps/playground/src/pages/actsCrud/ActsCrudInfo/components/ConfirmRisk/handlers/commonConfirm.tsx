import { Modal } from 'antd';

export type CommonConfirmOptions = {
  title?: string;
  content: React.ReactNode;
  cancelText?: string;
  okText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  disableConfirm?: boolean;
  icon?: React.ReactNode;
};
export const commonConfirm = ({
  title,
  content,
  cancelText,
  okText,
  onCancel,
  onConfirm,
  disableConfirm,
  icon,
}: CommonConfirmOptions) => {
  Modal.confirm({
    centered: true,
    title: title || '重大风险',
    className: 'confirm-risk-info',
    content: content,
    cancelText: cancelText || '返回修改',
    okText: okText || '确定',
    icon,
    maskClosable: false,
    okButtonProps: {
      hidden: disableConfirm,
    },

    onOk() {
      onConfirm();
    },
    onCancel() {
      onCancel();
    },
    styles: {
      content: {
        height: '250px',
        width: '100%',
        overflow: 'hidden',
        padding: 0,
      },
      body: { height: '100%', overflow: 'hidden' },
    },
  });
};
