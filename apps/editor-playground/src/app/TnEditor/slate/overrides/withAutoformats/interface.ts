/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from 'slate';
import { CustomElement } from '../../../interface';

/** 自动格式化处理函数 */
export type AutoformatHandler = {
  /** 需要匹配的字符串 */
  match: string;

  /**
   * - 触发匹配的字符，默认是：空格
   * - 即符合条件才出发匹配是否要替换，比如：当输入空格的时候，才匹配是否替换为无序列表
   *  */
  triggerChar?: string;

  /** 匹配到后，是否阻止当前输入元素插入，默认为：false */
  ignoreInput?: boolean;

  /**
   * - 匹配到 match 字符串时，给叶子结点设置这些属性
   * - type 、format 函数、properties设置后，这个就无效
   */
  leafStyle?: React.CSSProperties;

  /**
   * - 匹配到 match 字符串时，给 block 节点增加属性
   * - type 、format 函数设置后，这个就无效
   */
  properties?: Record<string, any>;
  /**
   * - 匹配到 match 字符串时，将当前节点替换成如下类型的 block 节点
   * - format 函数设置后，这个就无效
   */
  type?: CustomElement['type']; // li

  /**
   * - 设置后，当前节点在改变 type 后，会被这个 wrapType 的节点包裹
   * - 比如：文本变为：li 后，会被 ul 包裹
   */
  wrapType?: CustomElement['type']; // ul

  /** 匹配到 match 字符串时，执行这个函数 */
  format?: (editor: Editor) => void;
};
