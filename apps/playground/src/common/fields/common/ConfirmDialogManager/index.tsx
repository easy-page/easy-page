/**
 * - 用于表单内弹窗管理
 */

import { nodeUtil } from '@easy-page/antd-ui';
import { ConfirmDialogManager } from './confirmDialogManager';

export type ConfirmDialogManagerState = ConfirmDialogManager;

export const confirmDialogManager = (manager: ConfirmDialogManager) =>
  nodeUtil.createCustomField(
    'confirmDialogManager',
    '',
    () => <></>,
    {
      postprocess() {
        return {};
      },
      value: manager,
    },
    {
      formItem: { noStyle: true },
    },
  );

export * from './confirmDialogManager';
