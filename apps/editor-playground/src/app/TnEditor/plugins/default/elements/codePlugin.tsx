import { TnEditorRenderPlugin } from '../../interfaces/plugin';

export const CODE_ELEMENT = 'code';

export const codePlugin: TnEditorRenderPlugin = {
	elementType: CODE_ELEMENT,
	render: ({ element, attributes, children }) => {
		console.log('attributes:', element);
		return (
			<code className="ml-4 " {...attributes}>
				{children}
			</code>
		);
	},
	id: 'ol_plugin',
	name: '有序列表-UL插件',
};
