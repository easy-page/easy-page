import { Editor, Transforms, Element as SlateElement } from 'slate';

/** 可以给某个节点添加属性 */
export const toggleBlock = (editor: Editor, format: any) => {
	// Transforms.unwrapNodes(editor, {
	// 	match: (n) =>
	// 		!Editor.isEditor(n) &&
	// 		SlateElement.isElement(n) &&
	// 		['ul', 'ol'].includes(n.type),
	// 	split: true,
	// });
	const newProperties: Partial<SlateElement> = {
		type: 'li',
	};
	/** 被选中的行，type 会变成 li */
	Transforms.setNodes<SlateElement>(editor, newProperties);
	/** 被选中的行会被包裹一个父亲节点，类型为：format */
	Transforms.wrapNodes(editor, { type: format, children: [] });
};
