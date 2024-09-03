import { Editor } from 'slate';

import { isEmptyTextNode } from '../../utils/isEmptyTextNode';
import { getCurNodeInfo } from '../../../plugins/default/events/utils/getCurNodeInfo';
import { replaceWithNormalNode } from '../../transform/replaceWithNormalNode';
import { DEFAULT_ELEMENT_TYPE } from '../../../constants';
import { insertCurNode, insertWithNormalNode } from '../../transform';

export const withInsertBreak = (editor: Editor) => {
  const { insertBreak } = editor;
  editor.insertBreak = () => {
    const { curNode } = getCurNodeInfo(editor);
    if (!curNode) {
      console.log('【回车】无当前元素');
      insertBreak();
      return;
    }

    const plugins = editor.pluginManager.elementPlugins[curNode.node.type];
    if (plugins.replaceWithDefault) {
      insertWithNormalNode(editor, { curNode });
      return;
    }

    /**
     * - 当前若不是默认类型，并且是空的，则按回车用默认元素代替
     */
    if (
      curNode.node?.type !== DEFAULT_ELEMENT_TYPE &&
      isEmptyTextNode(curNode.node)
    ) {
      console.log('【回车】替换当前元素');
      replaceWithNormalNode(editor, { curNode });
      return;
    }

    if (plugins.replaceWithDefaultProperties) {
      const config = plugins.replaceWithDefaultProperties;
      insertCurNode(editor, {
        curNode,
        excludeProperties: config.exclude,
        includeProperties: config.include,
      });
      return;
    }

    insertBreak();
  };

  return editor;
};
