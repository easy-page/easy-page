import { adminPostReq, FieldBelongFirstLevel, RequestHandler } from '@/common'
import { FieldConfig } from '@/common/constants/fieldMaps/interface'

export type UpdateFieldConfig = {
  id: number
  fieldName?: string
  fieldId?: string
  owner?: string
  updator?: string
  belong?: FieldBelongFirstLevel
}

export const updateField: RequestHandler<UpdateFieldConfig, FieldConfig> = (
  params
) => {
  return adminPostReq(`/zspt-admin-api/fieldconfig/update/${params.id}`, params)
}
