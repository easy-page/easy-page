import { Editor, Path } from 'slate';
import { CurNodeInfo } from '../default/events/utils/indx';
import { MAX_DEEP_LEVEL } from '../../constants';
import { addBlockProperties } from '../../slate/transform';
export const moveToChildren = (
  editor: Editor,
  {
    curNodeInfo,
  }: {
    curNodeInfo: CurNodeInfo;
  }
) => {
  const { inLastNode, lastNode, curNode } = curNodeInfo;
  if (!lastNode || !curNode) {
    return;
  }

  const lastNodeLevel = lastNode?.node?.level || 0;
  if (!inLastNode && lastNodeLevel < MAX_DEEP_LEVEL) {
    editor.withoutNormalizing(() => {
      const lastNodeLevel = curNodeInfo.lastNode?.node?.level || 0;
      const toPath = lastNode?.path.concat(1) as Path;
      editor.moveNodes({
        at: curNode?.path,
        to: toPath,
      });

      addBlockProperties(
        editor,
        {
          level: lastNodeLevel + 1,
        },
        {
          at: toPath,
        }
      );
    });
    return;
  } else {
    console.log('添加提示属性');
    // 给提示
    addBlockProperties(editor, {
      indentTip: true,
    });
    return;
  }
};
