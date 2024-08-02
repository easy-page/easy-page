import { Editor, Transforms, Location } from 'slate';
import { CustomElement } from '../../interface';
import { isBlockElement } from '../utils';

/**
 * - 清理掉所有选中属性
 */
export const unsetSelectAll = (editor: Editor) => {
  const selectedNodes = editor.nodes({
    match: (n) => {
      return (
        Boolean((n as CustomElement).selected) && isBlockElement(n, editor)
      );
    },
  });

  const curNodes = selectedNodes.next();

  console.log('执行匹配到被选择元素', curNodes);

  // const hasSelectedProperties = selecte;
  if (curNodes.value) {
    editor.withoutNormalizing(() => {
      Transforms.unsetNodes(editor, ['selected'], {
        at: [],
        match: (n) =>
          isBlockElement(n, editor) && Boolean((n as CustomElement)?.selected),
      });
      const path = curNodes.value?.[1] || [];
      // editor.select();
    });
  }
};
