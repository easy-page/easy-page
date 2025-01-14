import { SubsidyOptEnum } from "@/common/constants";

export type SubsidyRatePoi2Agent = {
  key: 'subsidyRatePoi2Agent'; // 补贴条件的键
  opt: SubsidyOptEnum; // 补贴条件的操作符
  minValue: string; // 补贴条件的最小值
  maxValue: string; // 补贴条件的最大值
}