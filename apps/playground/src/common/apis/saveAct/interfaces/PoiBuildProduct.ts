export enum CreateProductTypeEnum {
  // 通过upc建品
  ByUpc = 1,
  // 通过标准品建品
  ByStandard = 2,
  // 表示不打开
  UnOpen = 0,
}

export type PoiBuildProduct = {
  type: CreateProductTypeEnum
  value: string
}
