/**
 * - altKey = true，表明 option 被按下
 * - code : "AltLeft"，按下的 key
 * - ctrlKey = true, ctrl 被按下
 * - key: "Control" 按键的 key，不分左右
 * - keycode 被废弃了！
 * - metaKey：mac 上表示 command
 * - isTrusted 在 TypeScript 中，isTrusted 是一个只读的布尔属性。它的值为 true 时表示事件是用户生成的，例如鼠标点击、键盘输入等。值为 false 时表示事件是通过脚本生成的，例如使用 dispatchEvent 方法手动触发的事件。
 * - repeat 是一个键盘事件属性，它指示当前键是否是重复触发的。当用户按住某个键不放时，浏览器会连续触发键盘事件（如 keydown 事件），repeat 属性的值在第一次触发时为 false，之后连续触发的事件中其值为 true。
 * - type: keydown 按下还是放开？
 * - view: 可以获得 window 对象
 */

import { Editor } from 'slate';
import { TnEditorRenderPlugin } from './plugin';

export type TnEditorEventPluginBaseInfo = {
	/** 插件 ID */
	id: string;
	/** 插件名，用于日后插件市场显示 */
	name: string;

	/** 匹配到后执行的优先级，若多个事件都匹配，则弹窗让用户抉择选择，并可以记录选择结果 */
	priority: number;
};

export type EventHandler = (
	event: React.KeyboardEvent<HTMLDivElement>,
	editor: Editor,
	options: {
		elementPlugins: Record<string, TnEditorRenderPlugin>;
	}
) => void;

export type TnEditorEventPlugin = TnEditorEventPluginBaseInfo & {
	/** 匹配函数 */
	match: (event: React.KeyboardEvent<HTMLDivElement>) => boolean;

	/** 处理函数 */
	handler: EventHandler;
};
