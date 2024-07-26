import { TnEditorRenderPlugin } from '../../interfaces/plugin';

export const OL_ELEMENT = 'ol';

export const olPlugin: TnEditorRenderPlugin = {
	elementType: OL_ELEMENT,
	render: ({ element, attributes, children }) => {
		console.log('attributes:', element);
		return (
			<ol className="ml-4 " {...attributes}>
				{children}
			</ol>
		);
	},
	id: 'ol_plugin',
	name: '有序列表-UL插件',
};
