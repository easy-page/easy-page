import { TnEditorRenderPlugin } from '../../interfaces/plugin';

export const LI_ELEMENT = 'li';

export const liPlugin: TnEditorRenderPlugin = {
	elementType: LI_ELEMENT,
	render: ({ element, attributes, children }) => {
		console.log('attributes:', element);
		return (
			<>
				<div contentEditable="false" className="bullet">
					<div className="bullet-dot-style">•</div>
				</div>
				<div {...attributes} className="list-content">
					{children}
				</div>
			</>
		);
	},
	id: 'li_plugin',
	name: '无需列表-Li插件',
	eventHandler(event, editor) {
		/**
		 * - 缩进则表示：把当前元素当作上一个元素的子元素
		 * - 缩进 2 层后提示缩进已是最大缩进：存在一个缩进动画，然后提示我文案
		 *
		 *
		 */
	},
};
