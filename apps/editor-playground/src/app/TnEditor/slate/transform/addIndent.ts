import { Editor, Path } from 'slate';
import { getCurNode } from '../query/getCurNode';
import { getActiveProperties } from '../../actions/toggleProperties';
import { addBlockProperties } from './addBlockProperties';
import { isTextElement } from '../utils';
import { CustomElement } from '../../interface';

export const addIndent = (editor: Editor) => {
  const node = getCurNode(editor);
  // const { handleIndent } = options;
  if (!node) {
    return;
  }

  const [curNode, curNodePath] = node;
  if (!curNode || !curNodePath) {
    return;
  }
  const lastNode = Editor.before(editor, curNodePath);
  const activeProperties = getActiveProperties(editor);

  if (!lastNode) {
    // 没有上一个节点，就什么都不做，但是要提示一下
    addBlockProperties(editor, {
      indentTip: true,
    });
    return;
  }

  /**
   * - 都是将当前这个节点，添加到上一个元素的 children 中
   */

  const [lastNodeElement, lastNodePath] =
    Editor.above(editor, { at: lastNode.path }) || [];

  if (!lastNodeElement || !lastNodePath) {
    return;
  }

  /** 如果是文本元素：第一次处理缩进 */
  if (
    isTextElement(lastNodeElement as CustomElement) &&
    !activeProperties.includes('indent')
  ) {
    addBlockProperties(editor, {
      indent: true,
    });
    return;
  }

  console.log(
    'lastNodeElement:',
    curNode.children,
    lastNodePath,
    lastNodeElement
  );

  editor.moveNodes({
    at: curNodePath,
    to: lastNodePath.concat(1) as Path,
  });
};
