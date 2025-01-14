import { message } from "antd";

// 自定义校验链接
export function customCheckLinkFn(text: string, url: string): string | boolean | undefined {   // TS 语法
  // function customCheckLinkFn(text, url) {                                              // JS 语法
  if (!url) {
    return
  }
  if (url.indexOf('http') !== 0) {
    message.error('链接必须以 http/https 开头')
    return undefined;
  }
  return true

  // 返回值有三种选择：
  // 1. 返回 true ，说明检查通过，编辑器将正常插入链接
  // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
  // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
}
