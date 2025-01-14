export interface EditorBaseProps {
  /**
   * 编辑器模式
   * @default 'default'
   * @version 0.3.3
   */
  mode?: 'simple' | 'default';
  /**
   * 编辑器是否只读
   * @default false
   * @version 0.3.3
   */
  readOnly?: boolean;
  /**
   * 编辑器字数限制
   * @version 0.3.3
   */
  maxLength?: number;
  /**
   * 编辑器是否可滚动
   * @default true
   * @version 0.3.3
   */
  scroll?: boolean;
  /**
   * 编辑器是否默认focus
   * @default false
   * @version 0.3.3
   */
  autoFocus?: boolean;
  /**
   * 编辑器的输入值
   * @version 0.3.3
   */
  value?: string;
  /**
   * 编辑器 placeholder
   * @version 0.3.3
   */
  placeholder?: string;
  /**
   * 编辑器根节点 class
   * @version 0.3.3
   */
  className?: string;
  /**
   * 编辑器根节点内联样式
   * @version 0.3.3
   */
  style?: React.CSSProperties;
  /**
   * 编辑器 onChange 事件
   * @version 0.3.3
   */
  onChange?: (value: string, editor: object) => void;
  /**
   * 编辑器字数超长回调事件
   * @version 0.3.3
   */
  onMaxLength?: (editor: object) => void;
  /**
   * 编辑器销毁回调
   * @version 0.3.3
   */
  onDestroyed?: (editor: object) => void;
  /**
   * 编辑器创建回调
   * @version 0.3.3
   */
  onCreated?: (editor: object) => void;
  /**
   * 编辑器 Focus 事件
   * @version 0.3.3
   */
  onFocus?: (editor: object) => void;
  /**
   * 编辑器 Blur 事件
   * @version 0.3.3
   */
  onBlur?: (editor: object) => void;

  disabled?: boolean
}