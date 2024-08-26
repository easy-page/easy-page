import React from 'react';

import { useFocused } from 'slate-react';

import { useTnStore } from '../../../../store';
import {
  useVirtualFloating,
  UseVirtualFloatingOptions,
} from '../../FloatingToolbar/hooks';
import { mergeProps } from '../../FloatingToolbar/utils/mergeProps';

export type FloatingToolbarState = {
  floatingOptions?: UseVirtualFloatingOptions;
  ignoreReadOnly?: boolean;
  hideToolbar?: boolean;
};

export const useElementFloatingToolbarState = ({
  floatingOptions,
  hideToolbar,
  ignoreReadOnly,
}: FloatingToolbarState) => {
  const editorId = useTnStore().get.id();
  const focused = useFocused();

  /** 是否展开悬浮 */
  const [open, setOpen] = React.useState(false);

  const [waitForCollapsedSelection, setWaitForCollapsedSelection] =
    React.useState(false);

  const floating = useVirtualFloating(
    mergeProps(
      {
        // getBoundingClientRect: () => {

        // },
        open,
        onOpenChange: setOpen,
      },
      floatingOptions
    )
  );

  return {
    editorId,
    open,
    setOpen,
    waitForCollapsedSelection,
    setWaitForCollapsedSelection,
    focused,
    ignoreReadOnly,
    hideToolbar,
    floating,
  };
};

export const useElementFloatingToolbar = ({
  editorId,
  waitForCollapsedSelection,
  setWaitForCollapsedSelection,
  open,
  setOpen,
  focused,
  floating,
  ignoreReadOnly,
  hideToolbar,
}: ReturnType<typeof useElementFloatingToolbarState>) => {
  // On refocus, the editor keeps the previous selection,
  // so we need to wait it's collapsed at the new position before displaying the floating toolbar.
  React.useEffect(() => {
    if (!focused || ignoreReadOnly) {
      setWaitForCollapsedSelection(true);
    }
  }, [focused, ignoreReadOnly, setWaitForCollapsedSelection]);

  React.useEffect(() => {
    if (
      // !selectionText ||
      !ignoreReadOnly &&
      hideToolbar
    ) {
      setOpen(false);
    } else if (!waitForCollapsedSelection) {
      setOpen(true);
    }
  }, [
    setOpen,
    editorId,
    hideToolbar,
    ignoreReadOnly,
    waitForCollapsedSelection,
  ]);

  // const { update } = floating;

  return {
    ref: floating.refs.setFloating,
    props: {
      style: floating.style,
    },
    hidden: !open,
  };
};
