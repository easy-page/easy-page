// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { PluginManager } from './plugins';
import { ElementTypeEnum } from './constants';

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    pluginManager: PluginManager;
  };

export type CustomElement = {
  /** 加此属性后可以缩进一次 */
  indent?: boolean;
  /** 缩进提示，提示完成移除属性 */
  indentTip?: boolean;
  /** 组件缩进层级，默认为没有，表示：0 */
  level?: number;
  /** 元素是否被全选，添加此属性，标记选中 */
  selected?: boolean;
  type: ElementTypeEnum;
  children: (CustomElement | FormattedText)[];
};

export type PropertiesKeys = keyof Omit<CustomElement, 'children' | 'type'>;

/** 文本组件的样式 */
export type FormattedText = React.CSSProperties & {
  text: string;
};

export type CustomText = FormattedText;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
