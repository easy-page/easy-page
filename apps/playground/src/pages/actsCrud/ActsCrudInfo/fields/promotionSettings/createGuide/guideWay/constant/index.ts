import { CreateProductTypeEnum } from '@/common'

export const CreateProductTypeOptions = [
  {
    label: '通过UPC引导',
    value: CreateProductTypeEnum.ByUpc,
  },
  {
    label: '通过标品编码引导',
    value: CreateProductTypeEnum.ByStandard,
  },
]
