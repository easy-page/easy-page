import React from 'react';

import { useFocused } from 'slate-react';

import { mergeProps } from '../utils/mergeProps';
import {
  useVirtualFloating,
  UseVirtualFloatingOptions,
} from './useVirtualFloating';
import { getSelectionBoundingClientRect } from '../utils';
import { useEditorSelector } from '../../../../hooks';
import { isSelectionExpanded, getSelectionText } from '../../../../slate';
import { useTnStore } from '../../../../store';

export type FloatingToolbarState = {
  floatingOptions?: UseVirtualFloatingOptions;
  ignoreReadOnly?: boolean;
  hideToolbar?: boolean;
};

export const useFloatingToolbarState = ({
  floatingOptions,
  hideToolbar,
  ignoreReadOnly,
}: FloatingToolbarState) => {
  const editorId = useTnStore().get.id();
  const selectionExpanded = useEditorSelector(isSelectionExpanded, []);
  const selectionText = useEditorSelector(getSelectionText, []);
  const focused = useFocused();

  /** 是否展开悬浮 */
  const [open, setOpen] = React.useState(false);

  const [waitForCollapsedSelection, setWaitForCollapsedSelection] =
    React.useState(false);

  const floating = useVirtualFloating(
    mergeProps(
      {
        getBoundingClientRect: getSelectionBoundingClientRect,
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
    selectionExpanded,
    selectionText,
    focused,
    ignoreReadOnly,
    hideToolbar,
    floating,
  };
};

export const useFloatingToolbar = ({
  editorId,
  selectionExpanded,
  selectionText,
  waitForCollapsedSelection,
  setWaitForCollapsedSelection,
  open,
  setOpen,
  focused,
  floating,
  ignoreReadOnly,
  hideToolbar,
}: ReturnType<typeof useFloatingToolbarState>) => {
  // On refocus, the editor keeps the previous selection,
  // so we need to wait it's collapsed at the new position before displaying the floating toolbar.
  React.useEffect(() => {
    if (!focused || ignoreReadOnly) {
      setWaitForCollapsedSelection(true);
    }

    if (!selectionExpanded) {
      setWaitForCollapsedSelection(false);
    }
  }, [
    focused,
    ignoreReadOnly,
    selectionExpanded,
    setWaitForCollapsedSelection,
  ]);

  React.useEffect(() => {
    if (
      !selectionExpanded ||
      // !selectionText ||
      (!ignoreReadOnly && hideToolbar)
    ) {
      setOpen(false);
    } else if (
      // selectionText &&
      selectionExpanded &&
      !waitForCollapsedSelection
    ) {
      setOpen(true);
    }
  }, [
    setOpen,
    editorId,
    hideToolbar,
    ignoreReadOnly,
    selectionExpanded,
    selectionText,
    waitForCollapsedSelection,
  ]);

  const { update } = floating;

  const selectionTextLength = selectionText?.length ?? 0;

  React.useEffect(() => {
    if (selectionTextLength > 0) {
      update?.();
    }
  }, [selectionTextLength, update]);

  return {
    ref: floating.refs.setFloating,
    props: {
      style: floating.style,
    },
    hidden: !open,
  };
};
