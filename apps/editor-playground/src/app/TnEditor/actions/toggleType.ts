import { Editor, Transforms, Location } from 'slate';
import { CustomElement, ElementType } from '../interface';
import { getCurNode } from '../slate/query/getCurNode';
import { addBlockProperties } from '../slate/transform';
import { DEFAULT_ELEMENT_TYPE } from '../constants';

/** 判断当前节点是不是已经激活某个 type */
export const isActiveType = (editor: Editor, type: ElementType) => {
	const [curNode, path] = getCurNode(editor);
	if (!curNode) {
		return false;
	}
	const node = curNode as CustomElement;
	return node.type === type && type !== DEFAULT_ELEMENT_TYPE;
};

export const unsetType = (
	editor: Editor,
	type: ElementType,
	options?: {
		/** 是否需要包裹一层，如：在把元素变为 li 时，期望用 ul 包裹 */
		wrapType?: ElementType;
		at?: Location;
	}
) => {
	const [curNode, path] = getCurNode(editor);
	if (!curNode || !path) {
		return;
	}
	const node = curNode as CustomElement;
	if (node.type !== type) {
		// 不相等，则无需 unset
		return;
	}
	if (options?.wrapType) {
		// 需要把之前 wrap 结构去掉，再将当前的类型改成默认的
		Transforms.unwrapNodes(editor, {
			at: options?.at || path,
		});
	}
	addBlockProperties(
		editor,
		{ type: DEFAULT_ELEMENT_TYPE },
		{ at: options?.at }
	);
};

export const setType = (
	editor: Editor,
	type: ElementType,
	options?: {
		/** 是否需要包裹一层，如：在把元素变为 li 时，期望用 ul 包裹 */
		wrapType?: ElementType;
		at?: Location;
	}
) => {
	addBlockProperties(editor, { type });

	if (options?.wrapType) {
		// TODO: 类型定义问题
		Transforms.wrapNodes(
			editor,
			{
				type: options?.wrapType as any,
				children: [],
			},
			{ at: options?.at }
		);
	}
};

export const toggleType = (
	editor: Editor,
	type: ElementType,
	options?: {
		/** 是否需要包裹一层，如：在把元素变为 li 时，期望用 ul 包裹 */
		wrapType?: ElementType;
	}
) => {
	if (isActiveType(editor, type)) {
		/** 如果属性已经被设置，则移除 */
		unsetType(editor, type, options);
		return;
	}

	setType(editor, type, options);
};
