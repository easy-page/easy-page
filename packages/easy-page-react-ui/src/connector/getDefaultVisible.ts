/* eslint-disable @typescript-eslint/no-explicit-any */
import { SchemaNodeInfo } from "@easy-page/core";
import { DefaultPageProps } from "../types";

/**
 * - 对于节点而言
 *  - 非 formItem 包裹的，会自己执行副作用，允许根据自己是否有 when 来决定默认是否显示
 *  - formItem 包裹的，是否展示取决于：formItem，本身默认必展示。
 * 
 * @param nodeInfo 
 * @param uiType 
 * @returns 
 */
export const getDefaultVisible = (
  nodeInfo: SchemaNodeInfo<Record<string, any>, DefaultPageProps<Record<string, any>>>,
  options: {
    uiType: string,
    isForm: boolean
  }
) => {
  const { uiType, isForm } = options;
  const isFormItem = uiType === 'formItemUI';
  if (isForm && !isFormItem && nodeInfo.isFormField) {
    return true;
  }
  if (!nodeInfo.when) {
    return true;
  }
  if (nodeInfo.when && nodeInfo.when.disableInitRun) {
    return true;
  }
  return false;
}