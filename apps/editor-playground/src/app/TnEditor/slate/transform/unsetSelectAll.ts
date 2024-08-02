import { Editor, Transforms } from 'slate';
import { CustomElement } from '../../interface';
import { isBlockElement } from '../utils';

/**
 * - 清理掉所有选中属性
 */
export const unsetSelectAll = (editor: Editor) => {
  const selectedNodes = editor
    .nodes({
      match: (n) => {
        console.log('nnnnnnnnasdad:', n);
        return (
          Boolean((n as CustomElement).selected) && isBlockElement(n, editor)
        );
      },
    })
    .return();

  console.log('selectedNodes:', selectedNodes);

  // const hasSelectedProperties = selecte;
  if (selectedNodes.value) {
    Transforms.unsetNodes(editor, ['selected'], {
      at: [],
      match: (n) =>
        isBlockElement(n, editor) && Boolean((n as CustomElement)?.selected),
    });
  }
};
