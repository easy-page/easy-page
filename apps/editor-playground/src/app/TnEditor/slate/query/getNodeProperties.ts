import { CustomElement } from '../../interface';

/** 获取节点除了：children 的其他属性 */
export const getPropertiesOfNode = (node: CustomElement) => {
	return getFullPropertiesOfNode(node).filter(
		(e) => !['type', 'children'].includes(e)
	);
};

/** 获取所有属性 */
export const getFullPropertiesOfNode = (node: CustomElement) => {
	return Object.keys(node);
};
