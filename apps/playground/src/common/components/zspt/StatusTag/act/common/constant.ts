import { ActivityConfirmStatusEnum, ActivityStatusEnum } from "@/common/constants";
import { ShowStatusBoxProps } from "../../common/interface";

export enum CommonActStatusColor {
  Green = 'green',
  Red = 'red',
  Gray = 'gray'
}

export const CommonActStatusProps: Record<CommonActStatusColor, ShowStatusBoxProps> = {
  [CommonActStatusColor.Green]: {
    fontColor: '#00BF7F',
    bgColor: 'rgba(0,191,127,0.10)',
  },
  [CommonActStatusColor.Red]: {
    fontColor: '#FF3C26',
    bgColor: 'rgba(255,60,38,0.10)',
  },
  [CommonActStatusColor.Gray]: {
    fontColor: '#222426',
    bgColor: '#F5F5F6',
  },
}

export const ActStatusColors: Record<ActivityStatusEnum, ShowStatusBoxProps> = {
  [ActivityStatusEnum.Creating]: {
    fontColor: '#386BFF',
    bgColor: 'rgba(56,107,255,0.10)'
  },
  [ActivityStatusEnum.Created]: {
    fontColor: '#FF3C26',
    bgColor: 'rgba(255,60,38,0.10)'
  },
  [ActivityStatusEnum.Inviting]: {
    fontColor: '#386BFF',
    bgColor: 'rgba(56,107,255,0.10)'
  },
  [ActivityStatusEnum.Applying]: {
    fontColor: '#00BF7F',
    bgColor: 'rgba(0,191,127,0.10)'
  },
  [ActivityStatusEnum.TobeActive]: {
    fontColor: '#00BF7F',
    bgColor: 'rgba(0,191,127,0.10)'
  },
  [ActivityStatusEnum.Active]: {
    fontColor: '#00BF7F',
    bgColor: 'rgba(0,191,127,0.10)'
  },
  [ActivityStatusEnum.Pause]: {
    fontColor: '#FF3C26',
    bgColor: 'rgba(255,60,38,0.10)'
  },
  [ActivityStatusEnum.Terminated]: {
    fontColor: '#222426',
    bgColor: '#F5F5F6'
  },
}


export const ActConfirmStatusColors: Record<ActivityConfirmStatusEnum, ShowStatusBoxProps> = {
  [ActivityConfirmStatusEnum.NotStart]: {
    fontColor: '#808080',
    bgColor: '#F5F5F6'
  },
  [ActivityConfirmStatusEnum.WaitConfirm]: {
    fontColor: '#FF3C26',
    bgColor: 'rgba(255,60,38,0.10)'

  },
  [ActivityConfirmStatusEnum.Confirmed]: {
    fontColor: '#00BF7F',
    bgColor: 'rgba(0,191,127,0.10)'
  },
  [ActivityConfirmStatusEnum.Finished]: {
    fontColor: '#808080',
    bgColor: '#F5F5F6'
  }
}

