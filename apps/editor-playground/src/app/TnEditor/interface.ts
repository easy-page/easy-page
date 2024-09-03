// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import { BaseEditor, Location } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { PluginManager } from './plugins';
import { ElementTypeEnum } from './constants';

export interface CustomEditor extends BaseEditor, ReactEditor, HistoryEditor {
  pluginManager: PluginManager;
  select: (
    path: Location,
    options?: {
      /** 禁止清除全选属性 */
      disableClearSelected?: boolean;
    }
  ) => void;
}

export type CustomElement = {
  /** 加此属性后可以缩进一次 */
  indent?: boolean;
  /** 缩进提示，提示完成移除属性 */
  indentTip?: boolean;
  /** 组件缩进层级，默认为没有，表示：0 */
  level?: number;
  /** 元素是否被全选，添加此属性，标记选中 */
  selected?: boolean;
  /** 元素的属性量级 */
  size?: number;
  type: ElementTypeEnum;
  // 每个节点唯一 ID，用于悬浮定位
  id: string;

  /** 是否被选中，用于任务类型组件 */
  checked?: boolean;
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
