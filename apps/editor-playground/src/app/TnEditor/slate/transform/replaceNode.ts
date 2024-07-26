import { Editor, Location, Transforms, Node } from 'slate';
import { withoutNormalizing } from './withoutNormalizing';

export const replaceNode = (
	editor: Editor,
	{
		at,
		nodes,
	}: {
		at: Location;
		nodes: Node | Node[];
	}
) => {
	withoutNormalizing(editor, () => {
		Transforms.removeNodes(editor, { at });
		Transforms.insertNodes(editor, nodes, { at });
	});
};
