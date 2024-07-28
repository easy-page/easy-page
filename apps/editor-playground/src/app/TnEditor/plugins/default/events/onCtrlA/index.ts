import { Transforms } from 'slate';
import { addBlockProperties } from '../../../../slate/transform';
import { TnEditorEventPlugin } from '../../../interfaces';
import { EventId } from '../../constant';
import { getCurNodeInfo } from '../utils/getCurNodeInfo';
import { stopEventAfterCallback } from '../utils/stopEventAfterCall';
import { hasSelectAllCurNode } from './utils';
import { CustomElement } from '../../../../interface';

/**
 * 非常重要 TODO: 当我有非常大量的节点的时候，进行全选，会不会有问题！！！
 */
export const onCtrlA: TnEditorEventPlugin = {
  id: EventId.OnCtrlA,
  name: '全选',
  match(event) {
    return event.metaKey && event.code === 'KeyA';
  },
  priority: 1,
  handler(event, editor, { elementPlugins }) {
    const selection = editor.selection;

    const { curNode } = getCurNodeInfo(editor);
    console.log(
      'stop selection:',
      curNode,
      hasSelectAllCurNode(editor, curNode)
    );
    /** 第一次按全选 */
    if (curNode && !hasSelectAllCurNode(editor, curNode)) {
      stopEventAfterCallback(event, () => editor.select(curNode?.path));
      return;
    }

    if (!curNode) {
      return;
    }

    const firstLevelNodePath = curNode.path.slice(0, 1);
    const firstLevelParentNodeInfo = editor.node(firstLevelNodePath);
    if (!firstLevelParentNodeInfo) {
      return;
    }
    const firstLevelParentNode = firstLevelParentNodeInfo[0] as CustomElement;
    console.log('firstLevelParentNode:', firstLevelParentNode);
    /** 第二次选择，第一层级元素添加选中 */
    if (!firstLevelParentNode.selected && firstLevelNodePath) {
      stopEventAfterCallback(event, () => {
        editor.select(firstLevelNodePath);
        addBlockProperties(
          editor,
          { selected: true },
          {
            at: firstLevelNodePath,
          }
        );
      });
      return;
    }
    /** 第三次选择， 选择全文 */
    Transforms.setNodes(
      editor,
      { selected: true },
      {
        at: [],
        match(node, path) {
          console.log('nodenode:', node, path);
          return path.length === 1;
        },
      }
    );
  },
};
