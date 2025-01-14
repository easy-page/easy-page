import {
  RequestHandler,
  postReq,
  getReq,
  RequestResult,
  toJson,
} from '@/common/libs'

export type SearchFactorGoodsParams = {
  showDataUrlParamFromFe: string // { bizType: string } ，路由参数：bizLine
  showDataUrlParamFromBe: string // 爆品售卖渠道 会用到该参数，是个 json 字符串
  searchUrl: string
  method: string
  leafLevel: number
}

export type SearchFactorInfo = {
  id: number
  leaf: number
  level: number
  name: string
  parentId: number
  disabled?: boolean
  children: SearchFactorInfo[]
}

export type SearchFactorGoodsRes = SearchFactorInfo[]

const handleUncheckable = (data: SearchFactorInfo[], leafLevel: number) => {
  if (!leafLevel) {
    return data
  }
  const checkElement = (arr: SearchFactorInfo[]) => {
    return (
      arr?.map((el) => {
        if (el.level < leafLevel) {
          if (!el.children) {
            el.disabled = true
            return false
          } else {
            const tmpArr = checkElement(el.children)
            if (!tmpArr.find((el) => el)) {
              el.disabled = true
            }
          }
        }
        return true
      }) || []
    )
  }
  checkElement(data)
  return data
}

export const searchFactorGoods: RequestHandler<
  SearchFactorGoodsParams,
  SearchFactorGoodsRes
> = async ({ searchUrl, method, leafLevel, ...restParams }) => {
  const reqMethod = method === 'jsonPost' ? postReq : getReq
  const res: RequestResult<string> = await reqMethod(searchUrl, restParams)
  return {
    ...res,
    data: handleUncheckable(
      typeof res.data === 'string'
        ? toJson(res.data, { defaultValue: [] })
        : res.data,
      leafLevel
    ),
  }
}
