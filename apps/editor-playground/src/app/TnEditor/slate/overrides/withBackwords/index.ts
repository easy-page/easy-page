/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor, Node, Path, TextUnit, Transforms } from 'slate';
import { getCurNode } from '../../query/getCurNode';
import { CustomElement } from '../../../interface';
import { DEFAULT_ELEMENT_TYPE } from '../../../constants';
import { getPropertiesOfNode } from '../../query/getNodeProperties';
import { replaceNode, unsetBlockProperties } from '../../transform';
import { ReactEditor } from 'slate-react';

const doBackwords = (
  curNode: CustomElement,
  nodePath: Path,
  {
    deleteBackward,
    unit,
    editor,
  }: {
    editor: Editor;
    unit: TextUnit;
    deleteBackward: (unit: TextUnit) => void;
  }
) => {
  if (!curNode || !nodePath || nodePath.length === 0) {
    deleteBackward(unit);
    setTimeout(() => {
      /** 不然删除完，编辑器就没有聚焦了 */
      editor.select([]);
    }, 0);
    return;
  }
  const nodeText = Node.string(curNode);
  const node = curNode as CustomElement;

  if (nodeText) {
    console.log('has node text:', nodeText, 'delete text');
    console.log('走 2222222');
    return deleteBackward(unit);
  }

  /**
   * - 节点没有文本内容后
   *  - 如果节点存在属性，则删除所有属性，即：除了 type 和 children 以外的所有属性、并且将类型改为默认的：p
   *  - 如果节点不存在属性了，默认类型也是 p 了，则看其父节点元素，如果存在，则从 children 删除当前节点，如果不存在了，则不做任何事情。
   */
  const activeProperties = getPropertiesOfNode(node);
  // 如果节点不存在属性了，默认类型也是 p 了，则看其父节点元素，如果存在，则从 children 删除当前节点，如果不存在了，则不做任何事情。
  const [parentNode, parentNodePath] =
    Editor.parent(editor as any, nodePath) || [];
  const parentElement = parentNode as CustomElement;
  if (activeProperties.length > 0 || node.type !== DEFAULT_ELEMENT_TYPE) {
    console.log('node has properties， rest properties');
    console.log('走 33333333:', activeProperties);
    // 如果节点存在属性，则删除所有属性，即：除了 type 和 children 以外的所有属性、并且将类型改为默认的：p
    unsetBlockProperties(editor, [...activeProperties], {
      at: nodePath,
    });
    editor.setNodes(
      {
        type: DEFAULT_ELEMENT_TYPE,
      },
      { at: nodePath }
    );

    return;
  } else if (
    activeProperties.length === 0 &&
    node.type === DEFAULT_ELEMENT_TYPE
  ) {
    if (!parentNode || !parentNodePath) {
      console.log('no parent node');
      console.log('走 666666666');
      /** 不存在父节点，则不做操作 */
      return deleteBackward(unit);
    }

    if (parentElement.children?.length > 1) {
      console.log('parent has multi children, remove current');
      console.log('走 777777777');
      // 如果存在多个 child，则删除当前 children
      Transforms.removeNodes(editor, {
        at: nodePath,
      });
      return;
    } else {
      console.log('走 88888888888888888888');
      // 看 parent 节点是否有属性
      const parentActiveProperties = getPropertiesOfNode(parentElement);
      if (
        parentActiveProperties.length > 0 ||
        parentElement.type !== DEFAULT_ELEMENT_TYPE
      ) {
        console.log('parent is other type, remove type');
        console.log('走 9999999999999999');
        unsetBlockProperties(editor, parentActiveProperties, {
          at: parentNodePath,
        });
        Transforms.setNodes(
          editor,
          {
            type: DEFAULT_ELEMENT_TYPE,
          },
          {
            at: parentNodePath,
          }
        );
        return deleteBackward(unit);
      }
    }

    console.log('continue next');
    console.log('走 1000000');

    doBackwords(parentElement, parentNodePath, {
      editor,
      unit,
      deleteBackward,
    });

    deleteBackward(unit);
    return;
  }
};

export const withBackwords = (editor: Editor) => {
  const { deleteBackward } = editor;
  editor.deleteBackward = (unit) => {
    console.log('uuuu:', unit);
    const [curNode, curNodePath] = getCurNode(editor);
    doBackwords(curNode as CustomElement, curNodePath!, {
      deleteBackward,
      unit,
      editor,
    });
  };
  return editor;
};
