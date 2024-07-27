// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { PluginManager } from './plugins';

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    pluginManager: PluginManager;
  };

export type CommonProperties = {
  /** 加此属性后可以缩进一次 */
  indent?: boolean;
  /** 缩进提示，提示完成移除属性 */
  indentTip?: boolean;
  /** 组件缩进层级 */
  level?: number;
};

export type ParagraphElement = CommonProperties & {
  type: 'paragraph';
  children: CustomText[];
};

export type HeadingElement = CommonProperties & {
  type: 'heading';
  size?: number;
  children: CustomText[];
};

export type TextElement = CommonProperties & {
  type: 'p';

  children: (CustomText | CustomElement)[];
};
export type UlElement = CommonProperties & {
  type: 'ul';
  children: (CustomElement | CustomText)[];
};

export type OlElement = CommonProperties & {
  type: 'ol';
  children: (CustomElement | CustomText)[];
};
export type LiElement = {
  type: 'li';
  children: CustomText[];
};

export type CodeElement = CommonProperties & {
  type: 'code';
  children: CustomText[];
};

export type PropertiesKeys = keyof Omit<CustomElement, 'children' | 'type'>;
export type ElementType = CustomElement['type'];

export type CustomElement =
  | OlElement
  | ParagraphElement
  | HeadingElement
  | TextElement
  | UlElement
  | LiElement
  | CodeElement;

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
