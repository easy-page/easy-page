/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ClientRectObject, VirtualElement } from '@floating-ui/core';

import { getSelectionBoundingClientRect } from '../utils/index';
import {
  autoUpdate,
  ReferenceType,
  useFloating,
  UseFloatingProps,
  UseFloatingReturn,
} from '@floating-ui/react';
import { createVirtualElement } from '../utils/createVirtualElement';
import { useIsomorphicLayoutEffect } from '../../../hooks';

export interface UseVirtualFloatingOptions extends Partial<UseFloatingProps> {
  getBoundingClientRect?: () => ClientRectObject;
  open?: boolean;
}

export interface UseVirtualFloatingReturn<
  RT extends ReferenceType = ReferenceType
> extends UseFloatingReturn<RT> {
  virtualElementRef: React.MutableRefObject<VirtualElement>;
  style: React.CSSProperties;
}

/**
 * `useFloating` with a controlled virtual element. Used to follow cursor position.
 *
 * Default options:
 * - `whileElementsMounted: autoUpdate`
 *
 * Additional options:
 * - `getBoundingClientRect` to get the bounding client rect.
 * - `hidden` to hide the floating element
 *
 * Additional returns:
 * - `style` to apply to the floating element
 * - `virtualElementRef`
 *
 * @see useFloating
 * @see https://floating-ui.com/docs/react-dom#virtual-element
 */
export const useVirtualFloating = <RT extends ReferenceType = ReferenceType>({
  getBoundingClientRect = getSelectionBoundingClientRect,
  ...floatingOptions
}: UseVirtualFloatingOptions): UseVirtualFloatingReturn<RT> => {
  const virtualElementRef = React.useRef<RT>(createVirtualElement() as RT);
  const [visible, setVisible] = React.useState(true);

  const floatingResult = useFloating<RT>({
    // update on scroll and resize
    whileElementsMounted: autoUpdate,
    ...floatingOptions,
  });

  const { refs, middlewareData, strategy, x, y, update } = floatingResult;

  useIsomorphicLayoutEffect(() => {
    virtualElementRef.current.getBoundingClientRect = getBoundingClientRect;
  }, [getBoundingClientRect, update]);

  useIsomorphicLayoutEffect(() => {
    refs.setReference(virtualElementRef.current);
  }, [refs]);

  useIsomorphicLayoutEffect(() => {
    if (!middlewareData?.hide) return;

    const { referenceHidden } = middlewareData.hide;

    setVisible(!referenceHidden);
  }, [middlewareData.hide]);

  return {
    ...floatingResult,
    virtualElementRef: virtualElementRef as any,
    style: {
      position: strategy,
      top: y ?? 0,
      left: x ?? 0,
      display: floatingOptions.open === false ? 'none' : undefined,
      visibility: visible ? undefined : 'hidden',
    },
  };
};
