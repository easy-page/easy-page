import { TableUtil } from "@/common/components";
import { PreviewColumnInfo } from "./interface";

export enum PreviewListScene {
  Preview = 'preview', // 主页的活动列表
}

export const previewColumns = new TableUtil<PreviewColumnInfo>();