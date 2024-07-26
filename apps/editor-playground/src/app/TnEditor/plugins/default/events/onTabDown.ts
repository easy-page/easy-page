import { Editor } from 'slate';
import { CustomElement } from '../../../interface';
import { getCurNode } from '../../../slate/query/getCurNode';
import { TnEditorEventPlugin } from '../../interfaces';
import { EventId } from '../constant';

export const onTabDown: TnEditorEventPlugin = {
	id: EventId.OnTabDown,
	name: '缩进 | 取消缩进',
	match(event) {
		console.log('eventHandlers:', event.key);
		return event.key === 'Tab';
	},
	priority: 1,
	handler(event, editor, { elementPlugins }) {
		console.log('1321231321312');
		const [curNode, curNodePath] = getCurNode(editor);
		if (!curNode || !curNodePath) {
			return;
		}

		const node = curNode as CustomElement;
		const plugin = elementPlugins?.[node.type];
		if (!plugin || !plugin.eventHandlers) {
			return;
		}
		const lastNode = Editor.before(editor, curNodePath);
		console.log('lastNode:', lastNode);

		plugin.eventHandlers[EventId.OnTabDown]?.(editor, {
			lastNode,
			curNode: [curNode, curNodePath],
			event: event,
		});
		console.log('阻止事件冒泡');
		event.preventDefault();
		event.stopPropagation();
	},
};
