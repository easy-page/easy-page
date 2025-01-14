import { adminPostReq, RequestHandler } from '@/common'
import { FieldConfig } from '@/common/constants/fieldMaps/interface'

export const getFieldDetail: RequestHandler<{ id: number }, FieldConfig> = (
  params
) => {
  return adminPostReq(`/zspt-admin-api/fieldconfig/get/${params.id}`, params)
}
