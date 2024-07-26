import { Editor } from 'slate';
import { getCurNode } from '../query/getCurNode';
import { getActiveProperties } from '../../actions/toggleProperties';
import { unsetBlockProperties } from './unsetBlockProperties';

export const removeIndent = (editor: Editor) => {
	const [curNode, curNodePath] = getCurNode(editor);
	if (!curNode || !curNodePath) {
		return;
	}

	const activeProperties = getActiveProperties(editor);
	/** 第一次处理缩进 */
	if (!activeProperties.includes('indent')) {
		return;
	}

	unsetBlockProperties(editor, ['indent']);
};
