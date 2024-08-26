import { CustomElement } from '../../interface';

export const isListElement = (node: CustomElement) => {
  return ['ol', 'ul'].includes(node.type);
};

export const isHeadingElement = (node: CustomElement) => {
  return ['heading'].includes(node.type);
};