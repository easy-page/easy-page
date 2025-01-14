import { ShowStatusBoxProps } from "../../common/interface";

export enum CommonPlanStatusColor {
  Green = 'green',
  Red = 'red',
  Gray = 'gray'
}
export const CommonPlanStatusProps: Record<CommonPlanStatusColor, ShowStatusBoxProps> = {
  [CommonPlanStatusColor.Green]: {
    fontColor: '#00BF7F',
    bgColor: 'rgba(0,191,127,0.10)',
  },
  [CommonPlanStatusColor.Red]: {
    fontColor: '#FF3C26',
    bgColor: 'rgba(255,60,38,0.10)',
  },
  [CommonPlanStatusColor.Gray]: {
    fontColor: '#222426',
    bgColor: '#F5F5F6',
  },
}

