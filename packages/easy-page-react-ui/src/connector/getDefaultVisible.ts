/* eslint-disable @typescript-eslint/no-explicit-any */
import { SchemaNodeInfo } from "@easy-page/core";
import { DefaultPageProps } from "../types";

export const getDefaultVisible = (nodeInfo: SchemaNodeInfo<Record<string, any>, DefaultPageProps<Record<string, any>>>) => {
  if (!nodeInfo.when) {
    return true;
  }
  if (nodeInfo.when && nodeInfo.when.disableInitRun) {
    return true;
  }
  return false;
}