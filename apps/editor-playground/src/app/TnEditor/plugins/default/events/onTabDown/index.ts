import { Ancestor, BasePoint, Editor, Path } from 'slate';
import { TnEditorEventPlugin } from '../../../interfaces';
import { EventId } from '../../constant';
import { getCurNode } from '../../../../slate/query/getCurNode';
import {
  indentWithMoveNodes,
  indentWithProperties,
  indentWithPropertiesAndMoveNodes,
  indentWithTips,
} from './utils';
import { isListElement, isTextElement } from '../../../../slate';
import { CustomElement } from '../../../../interface';
import { indentWithAllList } from './utils/indentWithAllList';

export type IndentOptions = {
  curNode: Ancestor;
  curNodePath: Path;
  editor: Editor;
  lastNode: BasePoint | undefined;
};

export const onTabDown: TnEditorEventPlugin = {
  id: EventId.OnTabDown,
  name: '缩进 | 取消缩进',
  match(event) {
    console.log('eventHandlers:', event.key);
    return event.key === 'Tab';
  },
  priority: 1,
  handler(event, editor, { elementPlugins }) {
    const [curNode, curNodePath] = getCurNode(editor);
    if (!curNode || !curNodePath) {
      console.log('缩进 1111');
      return;
    }

    const lastNode = Editor.before(editor, curNodePath);

    const stopEventAfterCallback = (callback: () => void) => {
      callback();
      console.log('阻止事件冒泡');
      event.preventDefault();
      event.stopPropagation();
    };

    // TODO 0.当前元素是辅助提示块，不缩进，直接提示不允许。

    // 1. 前一个元素不存在
    if (!lastNode) {
      stopEventAfterCallback(() =>
        indentWithProperties({ editor, curNode, curNodePath })
      );
      console.log('缩进 1112221');
      return;
    }
    const [lastNodeInfo, lastNodePath] =
      Editor.above(editor, { at: lastNode.path }) || [];

    console.log('laassssss:', lastNode, lastNodeInfo);

    // 1. 前一个元素不存在
    if (!lastNodeInfo || !lastNodePath) {
      stopEventAfterCallback(() =>
        indentWithProperties({ editor, curNode, curNodePath })
      );
      console.log('缩进 11123333333221');
      return;
    }

    const curNodeElement = curNode as CustomElement;
    const lastNodeElement = lastNodeInfo as CustomElement;
    if (isTextElement(curNodeElement) && isTextElement(lastNodeElement)) {
      // 2. 上一个节点是文本，当前节点是文本
      /**
       * - 第一次缩进，当前节点添加 indent:true 属性
       * - 第二次缩进，当前节点加入到上一个节点 children 中，并提示：无法继续缩进。
       */
      stopEventAfterCallback(() =>
        indentWithPropertiesAndMoveNodes({
          editor,
          curNode,
          curNodePath,
          lastNode,
        })
      );
      console.log('缩进 44444444');
      return;
    }

    if (isTextElement(lastNodeElement) && isListElement(curNodeElement)) {
      // 3.上一个元素是文本，当前元素是列表
      stopEventAfterCallback(() =>
        indentWithMoveNodes({ editor, curNode, curNodePath, lastNode })
      );
      console.log('缩进 5555555555');
      return;
    }

    if (!isListElement(curNodeElement) && !isListElement(lastNodeElement)) {
      // 4. 上一个不是列表，当前元素也不是列表
      stopEventAfterCallback(() =>
        indentWithProperties({ editor, curNode, curNodePath })
      );
      console.log('缩进 66666666');
      return;
    }
    if (isListElement(lastNodeElement) && isTextElement(curNodeElement)) {
      // 上一个元素是列表，当前元素是文本
      stopEventAfterCallback(() =>
        indentWithPropertiesAndMoveNodes({
          editor,
          curNode,
          curNodePath,
          lastNode,
        })
      );
      console.log('缩进 7777777');
      return;
    }
    if (isListElement(lastNodeElement) && isListElement(curNodeElement)) {
      console.log('laaaaaaaaa:', lastNodeElement, curNodeElement);
      // 上一个元素是列表，当前元素是文本
      stopEventAfterCallback(() =>
        indentWithAllList({
          editor,
          curNode,
          curNodePath,
          lastNode,
        })
      );
      console.log('缩进 8888888888');
      return;
    }
    if (
      !isListElement(lastNodeElement) &&
      !isTextElement(lastNodeElement) &&
      isListElement(curNodeElement)
    ) {
      /**
       * - 上一个元素非列表且非文本(超链接算文本)
       * - 当前元素是列表
       */
      stopEventAfterCallback(() =>
        indentWithTips({ editor, curNode, curNodePath })
      );
      console.log('缩进 999999999');
      return;
    }
    console.log('未匹配到相关缩进场景');
    stopEventAfterCallback(() => {});
  },
};
