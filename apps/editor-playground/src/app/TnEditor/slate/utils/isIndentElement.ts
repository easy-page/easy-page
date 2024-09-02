import { ElementTypeEnum } from '../../constants';
import { CustomElement } from '../../interface';

/** TODO: 这个应该根据对应类型的插件里的配置来判断 */
export const isIndentElement = (node: CustomElement) => {
  return [ElementTypeEnum.TODO, ElementTypeEnum.Ul].includes(node.type);
};
