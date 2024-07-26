import { Editor, Path, withoutNormalizing, Node, Transforms } from 'slate';

export const removeNodeChildren = (editor: Editor, path: Path) => {
	withoutNormalizing(editor, () => {
		const nodeChildren = Node.children(editor, path, { reverse: true });
		for (const [, childPath] of nodeChildren) {
			Transforms.removeNodes(editor, { at: childPath });
		}
	});
};
