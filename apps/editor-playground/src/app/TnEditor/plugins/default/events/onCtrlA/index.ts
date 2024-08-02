/* eslint-disable @typescript-eslint/no-explicit-any */
import { Transforms, Node } from 'slate';

import { addBlockProperties } from '../../../../slate/transform';
import { TNEditorEventPlugin } from '../../../interfaces';
import { EventId } from '../../constant';
import { getCurNodeInfo } from '../utils/getCurNodeInfo';
import { stopEventAfterCallback } from '../utils/stopEventAfterCall';
import { hasSelectAllCurNode } from './utils';
import { CustomElement } from '../../../../interface';
import { ReactEditor } from 'slate-react';
import { EventType } from '../../../../constants';

const getSelection = (root: Document | ShadowRoot): Selection | null => {
  if ((root as any).getSelection != null) {
    return (root as any).getSelection();
  }
  return document.getSelection();
};

/**
 * 非常重要 TODO: 当我有非常大量的节点的时候，进行全选，会不会有问题！！！
 */
export const onCtrlA: TNEditorEventPlugin = {
  id: EventId.OnCtrlA,
  name: '全选',
  eventType: EventType.OnKeyDown,
  match(event) {
    return event.metaKey && event.code === 'KeyA';
  },
  priority: 1,
  handler(event, editor) {
    const { curNode } = getCurNodeInfo(editor);
    console.log(
      'stop selection:',
      curNode,
      hasSelectAllCurNode(editor, curNode)
    );
    const nodeStr = curNode?.node ? Node.string(curNode?.node) : '';
    /**
     * - 第一次按全选
     * - 如果当前 str 不存在，则直接进行下一步的全选
     *  */
    if (curNode && nodeStr && !hasSelectAllCurNode(editor, curNode)) {
      stopEventAfterCallback(
        event,
        () => editor.select(curNode?.path)
        // editor.select(curNode?.path, { disableClearSelected: true })
      );
      console.log('11111111');
      return;
    }

    if (!curNode) {
      console.log('22222222');
      return;
    }

    const firstLevelNodePath = curNode.path.slice(0, 1);
    const isFirstLevelNode = curNode.path.length === 1;
    const firstLevelParentNodeInfo = editor.node(firstLevelNodePath);
    if (!firstLevelParentNodeInfo) {
      console.log('3333333333');
      return;
    }
    const firstLevelParentNode = firstLevelParentNodeInfo[0] as CustomElement;
    console.log('firstLevelParentNode:', isFirstLevelNode);
    /**
     * - 第二次选择，第一层级元素添加选中
     * - 当前如已经是第一层，则跳过这一个步骤
     * */
    if (
      !firstLevelParentNode.selected &&
      firstLevelNodePath &&
      !isFirstLevelNode
    ) {
      stopEventAfterCallback(event, () => {
        // editor.select(firstLevelNodePath, { disableClearSelected: true });

        editor.select(firstLevelNodePath, { disableClearSelected: true });
        addBlockProperties(
          editor,
          { selected: true },
          {
            at: firstLevelNodePath,
          }
        );
        // editor.withoutNormalizing(() => {

        // });
      });
      console.log('4444444');
      return;
    }
    /** 第三次选择， 选择全文 */
    stopEventAfterCallback(event, () => {
      const root = ReactEditor.findDocumentOrShadowRoot(editor);
      const domSelection = getSelection(root);
      const range = ReactEditor.toSlateRange(editor, domSelection!, {
        exactMatch: false,
        suppressThrow: true,
      });
      if (range) {
        editor.select(range, { disableClearSelected: true });
      }

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
    });
    console.log('55555555');
    // Transforms.setNodes(
    //   editor,
    //   { selected: true },
    //   {
    //     at: [],
    //     match(node, path) {
    //       console.log('nodenode:', node, path);
    //       return path.length === 1;
    //     },
    //   }
    // );
  },
};
