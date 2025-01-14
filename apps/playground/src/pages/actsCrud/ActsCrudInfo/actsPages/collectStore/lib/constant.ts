import { CategoryCode } from "@/common/apis"

/** 折扣使用的因子 */
export const DISCOUNT_FACTOR_CODES = [
  "city",
  "sku_name_contains_words",
  "sensitive_words",
  "sg_sku_tag",
  "sku_origin_price",
  "sku_weight",
  "sku_quality_score",
  "sku_quality_pic",
  "sku_quality_title",
  "sku_quality_upc",
  "upc_code"
]

export const DISCOUNT_CATEGORIES = [CategoryCode.Poi, CategoryCode.Sku]