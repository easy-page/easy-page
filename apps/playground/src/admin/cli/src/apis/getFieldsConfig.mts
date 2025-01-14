import { featchPostJson } from './request.mts'

export type FieldConfig<Config = Record<string, any>> = {
  id: string
  fullId: string
  belong: string
  fieldType: string
  config?: Config
  children?: FieldConfig[]
}
export type FieldsConfig = {
  fields: FieldConfig[]
  templates: string[]
}

export const getFieldsConfig = async (
  fields: string[]
): Promise<{ data: FieldsConfig[]; total: number }> => {
  try {
    const res = await featchPostJson<{ data: FieldsConfig[]; total: number }>(
      'https://uoc.tsp.test.sankuai.com/zspt-admin-api/cli/fieldconfig/search',
      {
        name: '',
        fieldIds: fields,
        pageSize: 100,
        pageNo: 1,
      }
    )

    return res
  } catch (err) {
    console.log(err)
    return {
      data: [],
      total: 0,
    }
  }
}
