import { Editor, Location } from 'slate';

/**
 * 获得某个节点的 range 坐标
 */
export const getRange = (editor: Editor, at: Location, to?: Location) =>
	Editor.range(editor, at, to);
