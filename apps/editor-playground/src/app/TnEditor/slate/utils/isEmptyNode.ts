import { CustomElement, FormattedText } from '../../interface';

export const isEmptyNode = (node: CustomElement) => {
  const textChildNodes = (node.children || []).filter((x) => {
    return (x as CustomElement)?.type === undefined;
  });
  return textChildNodes.every((x) => !(x as FormattedText)?.text);
};
