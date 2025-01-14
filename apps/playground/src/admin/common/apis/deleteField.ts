import { adminPostReq, RequestHandler } from '@/common'
import { FieldConfig } from '@/common/constants/fieldMaps/interface'

export const deleteField: RequestHandler<{ id: number }, FieldConfig> = (
  params
) => {
  return adminPostReq(`/zspt-admin-api/fieldconfig/delete/${params.id}`, params)
}
