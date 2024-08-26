import { PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { flip, offset } from '@floating-ui/core';
import {
  useElementFloatingToolbar,
  useElementFloatingToolbarState,
} from './hooks/useElementFloatingToolbarState';
import { autoUpdate, useFloating } from '@floating-ui/react';
import { useState } from 'react';

export type ElementToolbarProps = {
  className?: string;
};
export const ElementToolbar = ({ className }: ElementToolbarProps) => {
  // const floatingToolbarState = useElementFloatingToolbarState({
  //   floatingOptions: {
  //     placement: 'left-start',
  //     middleware: [
  //       offset(12),
  //       flip({
  //         padding: 12,
  //         fallbackPlacements: ['left-end'],
  //       }),
  //     ],
  //   },
  // });
  // const {
  //   ref: floatingRef,
  //   props: rootProps,
  //   hidden,
  // } = useElementFloatingToolbar(floatingToolbarState);
  // console.log('rootPropsrootProps:', rootProps);
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
  });

  return (
    <>
      <button ref={refs.setReference}>Button</button>
      <div
        ref={refs.setFloating}
        style={{ ...floatingStyles }}
        className={classNames(className, {})}
      >
        <div className=" left-[-40px] top-0">
          <div
            style={{
              opacity: 1,
            }}
            className={classNames(
              'flex items-center p-1 rounded cursor-pointer border'
            )}
          >
            <PlusOutlined />
          </div>
        </div>
      </div>
    </>
  );
};
