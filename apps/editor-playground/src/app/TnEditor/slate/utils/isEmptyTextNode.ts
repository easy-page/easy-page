import { CustomElement, FormattedText } from '../../interface';

export const isEmptyTextNode = (node: CustomElement) => {
  if (!node.children || node.children.length === 0) {
    return false;
  }
  if (node.children.length > 1) {
    return false;
  }
  if ((node.children?.[0] as CustomElement)?.type !== undefined) {
    return false;
  }
  return !(node.children?.[0] as FormattedText)?.text;
};
