import { Editor } from 'slate';
import { CustomElement, PropertiesKeys } from '../interface';
import { getPropertiesOfNode } from '../slate/query/getNodeProperties';
import { addBlockProperties, unsetBlockProperties } from '../slate/transform';
import { getCurNode } from '../slate/query/getCurNode';

/* 获取当前鼠标所在位置已经激活的属性 key */
export const getActiveProperties = (editor: Editor) => {
	/**
	 * - 获取当前鼠标悬浮或者聚焦的节点元素
	 * - Ancestor 本质等于 CustomElement
	 *  */
	const [curNode, path] = getCurNode(editor);

	console.log('curNode:', curNode);

	if (!curNode) {
		return [];
	}

	return getPropertiesOfNode(curNode as CustomElement);
};

const getPropertiesToAdd = (
	activeProperties: string[],
	properties: Omit<CustomElement, 'children' | 'type'>
) => {
	const propertiesToAddKeys = Object.keys(properties).filter(
		(e) => !activeProperties.includes(e)
	);
	const result: Omit<CustomElement, 'children' | 'type'> = {};

	propertiesToAddKeys.forEach((e) => {
		result[e as PropertiesKeys] = properties[e as PropertiesKeys];
	});
	return result;
};

/** 修改节点属性， 除了 type 以外 */
export const toggleProperties = (
	editor: Editor,
	properties: Omit<CustomElement, 'children' | 'type' | 'id'>
) => {
	if (!editor.selection) {
		return;
	}

	const activeProperties = getActiveProperties(editor);

	unsetBlockProperties(editor, activeProperties);

	/** 不存在的属性要添加 */
	const propertiesToAdd: Partial<Omit<CustomElement, 'children' | 'type'>> =
		getPropertiesToAdd(activeProperties, properties);

	console.log('propertiesToAdd:', properties, propertiesToAdd);
	addBlockProperties(editor, propertiesToAdd);
};
