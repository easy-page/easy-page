import React from 'react';
import { unmount as reactUnmount, renderImperatively } from '@/common/libs';
import { RejectDialog, RejectDialogProps } from './dialog';

export type ShowHandler = {
  close: () => void;
};

export const closeFnSet = new Set<() => void>();

function doShow(props: RejectDialogProps) {
  const container = document.createElement('div');
  container.className = '';
  const handler: ShowHandler = renderImperatively(
    <RejectDialog
      onClose={() => {
        const unmountResult = reactUnmount(container);
        if (unmountResult && container.parentNode) {
          container.parentNode.removeChild(container);
        }
      }}
      {...props}
    />,
    container,
  );
  closeFnSet.add(handler.close);
  return handler;
}

export function show<T>(props: RejectDialogProps) {
  return new Promise<T>((resolve) => {
    const dispose = doShow({
      ...props,
      onConfirm(value) {
        dispose.close();
        resolve(value);
      },
      onCancel() {
        dispose.close();
        resolve(undefined);
      },
    });
  });
}
