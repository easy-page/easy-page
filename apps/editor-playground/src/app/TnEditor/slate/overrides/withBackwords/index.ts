/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor, Node, Path, TextUnit, Transforms } from 'slate';
import { getCurNode } from '../../query/getCurNode';
import { CustomElement } from '../../../interface';
import { DEFAULT_ELEMENT_TYPE } from '../../../constants';
import { getPropertiesOfNode } from '../../query/getNodeProperties';
import { unsetBlockProperties } from '../../transform';

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
  console.log('【删除】进入删除');
  if (!curNode || !nodePath || nodePath.length === 0) {
    deleteBackward(unit);
    setTimeout(() => {
      /** 不然删除完，编辑器就没有聚焦了 */
      editor.select([]);
    }, 0);
    console.log('【删除】: 删除所有内容，聚焦编辑器');
    return;
  }
  const nodeText = Node.string(curNode);
  const node = curNode as CustomElement;

  if (nodeText) {
    console.log('has node text:', nodeText, 'delete text');
    console.log('【删除】: 删除文本内容');
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

  if (activeProperties.length > 0 && node.type === DEFAULT_ELEMENT_TYPE) {
    console.log('【删除】: 删除节点属性');
    // 如果节点存在属性，则删除所有属性，即：除了 type 和 children 以外的所有属性、并且将类型改为默认的：p
    unsetBlockProperties(editor, [...activeProperties], {
      at: nodePath,
    });
    return deleteBackward(unit);
  }
  if (activeProperties.length > 0 && node.type !== DEFAULT_ELEMENT_TYPE) {
    console.log('【删除】: 将节点类型改变成默认类型');
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
  }
  if (activeProperties.length === 0 && node.type === DEFAULT_ELEMENT_TYPE) {
    if (!parentNode || !parentNodePath) {
      console.log(
        '【删除】: 类型和属性都已清空，且无父元素，则不操作，走默认流程'
      );
      /** 不存在父节点，则不做操作 */
      return deleteBackward(unit);
    }

    if (parentElement.children?.length > 1) {
      console.log(
        '【删除】: 类型和属性都已清空，父节点存在多个子元素，删除当前子元素'
      );
      // 如果存在多个 child，则删除当前 children
      Transforms.removeNodes(editor, {
        at: nodePath,
      });
      return;
    } else {
      console.log('【删除】: 类型和属性都已清空，父节点只有一个');
      // 看 parent 节点是否有属性
      const parentActiveProperties = getPropertiesOfNode(parentElement);
      if (
        parentActiveProperties.length > 0 ||
        parentElement.type !== DEFAULT_ELEMENT_TYPE
      ) {
        console.log(
          '【删除】: 类型和属性都已清空，父节点只有一个，删除父元素的各种属性，置为默认类型'
        );
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

    console.log('【删除】: 继续向上删除');

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
  const { deleteBackward, apply } = editor;
  editor.deleteBackward = (unit) => {
    console.log('uuuu:', unit);
    const [curNode, curNodePath] = getCurNode(editor);
    doBackwords(curNode as CustomElement, curNodePath!, {
      deleteBackward,
      unit,
      editor,
    });
  };

  editor.apply = (nodes) => {
    // console.log('adasdassdassdasdsa:', nodes);
    apply(nodes);
  };
  return editor;
};
