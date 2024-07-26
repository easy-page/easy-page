import { CustomElement } from '../../interface';

export const isListElement = (node: CustomElement) => {
  return ['ol', 'ul'].includes(node.type);
};
