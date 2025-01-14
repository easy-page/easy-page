import { adminPostReq } from '@/common'
import { FieldConfig } from '@/common/constants/fieldMaps/interface'

export const getFieldsConfig = async (
  fields: string[]
): Promise<{ data: FieldConfig[]; total: number }> => {
  try {
    const res = await adminPostReq('/zspt-admin-api/cli/fieldconfig/search', {
      name: '',
      fieldIds: fields,
      pageSize: 100,
      pageNo: 1,
    })

    return res as any
  } catch (err) {
    console.log(err)
    return {
      data: [],
      total: 0,
    }
  }
}
