import { Editor, Transforms, Location } from 'slate';
import { isBlockElement } from '../utils';
import { CustomElement } from '../../interface';

/** 删除 block 元素相关属性 */
export const addBlockProperties = (
  editor: Editor,
  properties: Omit<CustomElement, 'children' | 'type' | 'id'>,
  options?: {
    at?: Location;
  }
) => {
  if (!properties || Object.keys(properties).length === 0) {
    return;
  }
  Transforms.setNodes(
    editor,
    properties,
    options?.at
      ? {
          at: options?.at,
        }
      : {
          match: (n) => {
            return isBlockElement(n, editor);
          },
        }
  );
};
