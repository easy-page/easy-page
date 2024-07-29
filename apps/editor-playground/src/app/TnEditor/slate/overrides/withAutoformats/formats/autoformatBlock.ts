import { Editor, Transforms, Node } from 'slate';
import { AutoformatHandler } from '../interface';
import { getPointByMatchString } from '../../../query';
import { isBlockElement } from '../../../utils';
import { toggleLeafStyle } from '../../../../actions';

export const DefaultTriggerChar = ' ';
/**
 * - 匹配到 match 后，返回true，则允许插入，否则 false 阻止当前输入字符
 */
export const autoformatBlock = (
  editor: Editor,
  text: string,
  options: {
    rules: AutoformatHandler[];
  }
): boolean => {
  const { rules } = options;

  let stopInsert = false;

    rules.some((each) => {
      if ((each.triggerChar || DefaultTriggerChar) !== text) {
        return false;
      }
      const matchPoint = getPointByMatchString(editor, {
        matchString: each.match,
      });
      const currentNode = Editor.above(editor, { at: matchPoint?.path });
      const nodeStr = currentNode ? Node.string(currentNode[0]) : '';
      if (!matchPoint) {
        return false;
      }

      console.log('nodeStr', nodeStr, each.match);

      // if (nodeStr.length > 0) {
      //   Transforms.setNodes(
      //     editor,
      //     {
      //       children: [{ text:  '111'}],
      //     },
      //     {
      //       match: (n) => isBlockElement(n, editor),
      //     }
      //   );
      // }

      // 匹配到了，执行动作
      if (each.format) {
        each.format(editor);
        stopInsert = !each.ignoreInput;
        return true;
      }
      if (each.type) {
        Transforms.setNodes(
          editor,
          {
            type: each.type,
            ...(each.properties || {}),
            children: [{ text:  '111'}],
          },
          {
            match: (n) => isBlockElement(n, editor),
          }
        );
        console.log('editor:', editor.children);
        stopInsert = !each.ignoreInput;
        return true;
      }

      if (each.leafStyle) {
        toggleLeafStyle(editor, each.leafStyle);
        stopInsert = !each.ignoreInput;
        return true;
      }

      return false;
    });
  return stopInsert;
};
