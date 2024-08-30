/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from 'slate';

import { castArray } from 'lodash';
import { CustomElement } from '../../../interface';
import { generateElementId } from '@easy-page-slate';

export const withInsertNode = (editor: Editor) => {
  const { insertNode, insertNodes } = editor;
  editor.insertNodes = (_nodes, options) => {
    const nodes = castArray<CustomElement>(_nodes as CustomElement[]);

    insertNodes(
      nodes.map((node) => {
        if (!node.id) {
          node.id = generateElementId();
        }
        return node;
      }),
      options
    );
  };

  editor.insertNode = (node: CustomElement) => {
    if (!node.id) {
      node.id = generateElementId();
    }

    insertNode(node);
  };

  return editor;
};
