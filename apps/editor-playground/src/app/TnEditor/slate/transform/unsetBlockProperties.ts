import { Editor, MaximizeMode, Transforms, Location } from 'slate';
import { isBlockElement } from '../utils';

/** 删除 block 元素相关属性 */
export const unsetBlockProperties = (
	editor: Editor,
	properties: string[],
	options?: {
		at?: Location;
		mode?: MaximizeMode;
		hanging?: boolean;
		split?: boolean;
		voids?: boolean;
	}
) => {
	if (!properties || Object.keys(properties).length === 0) {
		return;
	}
	Transforms.unsetNodes(editor, properties, {
		match: (n) => isBlockElement(n, editor),
		at: options?.at as Location,
	});
};
