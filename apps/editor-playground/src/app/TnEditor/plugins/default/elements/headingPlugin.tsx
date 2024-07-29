import React from 'react';
import { getActiveProperties, toggleProperties } from '../../../actions/toggleProperties';
import { Draggable } from '../../../components/Draggable';
import { TnEditorRenderPlugin } from '../../interfaces/plugin';
import { splitChildren } from '../../utils/splitChildren';
import { HeadingElement } from '../../../interface';

export const HEADING_ELEMENT = 'heading';

export const headingPlugin: TnEditorRenderPlugin = {
  elementType: HEADING_ELEMENT,
  render: ({ element, attributes, children }) => {
    console.log('attributes:', element, children);
    const { elementChildren, textChildren } = splitChildren(children);
    const { size = 0 } = element as HeadingElement;
    return (
      <Draggable>
        <div className='text-block-wrapper' {...attributes}>
          <div className='text-block' style={{ fontSize: 20 - size * 2, fontWeight: 700 }}>
            {textChildren}
          </div>
          <div className='text-children ml-4'>{elementChildren}</div>
        </div>
      </Draggable>
    );
  },
  id: 'text_plugin',
  name: '文本插件',
  eventHandler(event, editor) {
    /**
     * - 如果其上一个同级元素是文本，则第一次缩进只是当前元素添加缩进，第二次缩进则作为上一个元素的子元素
     *  	- 如果当前 p 有 indent 数字，则表明被第一次缩进过。
     * - 缩进如果将缩进内容作为上一个元素的子元素，则在选中的时候具有较好体验
     * - 只允许缩进两次，是一种最佳实践体现
     */
    const activeProperties = getActiveProperties(editor);
    /** 第一次处理缩进 */
    if (!activeProperties.includes('indent')) {
      toggleProperties(editor, {
        indent: 1,
      });
      return;
    }
    /**
     * - 第二次进行缩进
     * - 上一个元素是列表： list-wrapper、list(list-children)
     * 	- 本身结构是：block、list-wrapper、list
     * - 上一个元素是普通 block:
     *    - 本身结构：block、text-block-wrapper、text-block(text-children)
     * */
  },
};
