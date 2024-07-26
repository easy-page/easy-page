import { Editor, Location, Path, Transforms, withoutNormalizing } from 'slate';
import { removeNodeChildren } from './removeNodeChildren';
import { CustomElement } from '../../interface';

export const replaceNodeChildren = (
	editor: Editor,
	{
		at,
		nodes,
	}: {
		at: Location;
		nodes: CustomElement[];
	}
) => {
	withoutNormalizing(editor, () => {
		// removeNodeChildren(editor, at as Path);
		console.log('nodes:', nodes);
		Transforms.insertNodes(
			editor,
			[{ type: 'p', children: [{ text: '111' }] }, { text: 'aa' }],
			{ at: (at as Path).concat(0) }
		);
	});
};
