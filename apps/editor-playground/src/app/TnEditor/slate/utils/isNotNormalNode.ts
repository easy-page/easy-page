import { ElementTypeEnum } from '../../constants';
import { CustomElement } from '../../interface';

/**
 * - 非 P 类型，不带任何属性的节点
 * @param node
 */
export const isNotNormalNode = (node: CustomElement) => {
  if (node.type !== ElementTypeEnum.P) {
    return true;
  }
  const properties = Object.keys(node);
  // 出了 type、children 外还有其他属性，则返回 true
  if (properties.length !== 2) {
    return true;
  }
  if (properties.includes('children') && properties.includes('type')) {
    return false;
  }
  return true;
};
