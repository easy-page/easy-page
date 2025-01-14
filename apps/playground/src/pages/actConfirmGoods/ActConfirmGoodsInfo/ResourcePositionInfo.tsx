import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { Radio, RadioChangeEvent, message, Button, Input } from 'antd'
import classNames from 'classnames'
import dayjs from 'dayjs'
import {
  formateDate,
  FormatStyle,
  ActivityStatusEnum,
  actDetailModel,
  ActApplyResultParams,
  toNumber,
  NeedSkuEnum,
  userModel,
  getSKUIdCount,
  toJson,
  ActivityInfo,
  ResourceInfo,
} from '@/common'
import { useParamsInfo } from '@/common/hooks'
import {
  CheckSkuValidEnum,
  checkSku,
} from '@/common/apis/waiMaResource/checkSku'
import { Field } from '@/pages/actApplyResult/ActApplyResultInfo/common'
import { applySku } from '@/common/apis/waiMaResource'

const { TextArea } = Input
const MAX_SKUIDS = 100

export type ResourcePositionInfoProps = {
  item: ResourceInfo
  index: number
  resInfo: ResourceInfo[]
  setResInfo: (arg0: ResourceInfo[]) => void
  isShow?: boolean
}

export const ResourcePositionInfo = forwardRef(
  (
    { item, index, resInfo, setResInfo, isShow }: ResourcePositionInfoProps,
    ref
  ) => {
    const { params } = useParamsInfo<ActApplyResultParams>()
    const actId = toNumber(params.activityId)

    const { data: actDetail } = actDetailModel.getData()
    const activityInfo = actDetail?.activity || ({} as ActivityInfo)
    const { status, confirmTime, skuAdmin } = activityInfo
    const [idCount, setIdCount] = useState<number>(0)
    const [skuCode, setSkuCode] = useState<string>(item?.skuCodes || null)

    useEffect(() => {
      setSkuCode(item?.skuCodes)
    }, [isShow])

    const {
      data: userInfo,
      loading: userLoading,
      error: userError,
    } = userModel.getData()

    const disabledTextArea = useMemo(() => {
      const flag = [
        ActivityStatusEnum.Applying,
        ActivityStatusEnum.TobeActive,
        ActivityStatusEnum.Active,
      ].includes(status)

      return !flag
    }, [status])

    const isInfoRang = useMemo(() => {
      const startTime = dayjs(confirmTime?.skuAdmin?.startTime * 1000)
      const endTime = dayjs(confirmTime?.skuAdmin?.endTime * 1000)
      const currentTime = dayjs()

      if (currentTime.isAfter(startTime) && currentTime.isBefore(endTime)) {
        return true
      } else {
        return false
      }
    }, [confirmTime])

    // 当前MIS号未被邀请的品类运营，未被邀请，不可输入
    const beInvited = useMemo(() => {
      const misIds = skuAdmin.split(',').map((item) => item.trim())
      return misIds.includes(userInfo?.mis || '')
    }, [skuAdmin, userInfo])

    const canNotInput = useMemo(() => {
      return disabledTextArea || !isInfoRang || !beInvited
    }, [beInvited, disabledTextArea, isInfoRang])

    const getCityInfo = (value: string) => {
      const cityArray = toJson(value)

      let str = ''
      cityArray.forEach((item) => {
        str += `${item?.label},`
      })
      return str.slice(0, -1)
    }

    const getTargetBrandInfo = (value: string) => {
      const brandArray = toJson(value)

      let str = ''
      brandArray.forEach((item) => {
        str += `${item?.brandName},`
      })
      return str.slice(0, -1)
    }

    useEffect(() => {
      setIdCount(getSKUIdCount(item?.skuCodes))
    }, [])

    useImperativeHandle(ref, () => {
      return {
        isChangeSkuCodeInTab,
      }
    })

    const isChangeSkuCodeInTab = () => {
      return item.skuCodes !== skuCode
    }

    if (!isShow) {
      return <></>
    }

    return (
      <div>
        <Field label={'资源位名称'} value={item?.resourceName} />
        <Field
          label={'投放城市'}
          value={getCityInfo(item?.cityInfo)}
          className="mt-4"
        />
        <Field
          label={'投放时间'}
          value={`${formateDate(
            item?.startTime,
            FormatStyle.YYYYMMDDHHmmss
          )} 至 ${formateDate(item?.endTime, FormatStyle.YYYYMMDDHHmmss)}`}
          className="mt-4"
        />
        <Field
          label={'目标品牌'}
          value={getTargetBrandInfo(item?.targetBrand)}
          className="mt-4"
        />
        <Field
          className="mt-4"
          valueClassName="grow"
          label={'是否需要商品提报'}
          value={
            <>
              <div className="mb-2">
                <Radio.Group
                  disabled
                  onChange={(e: RadioChangeEvent) => {
                    const tmp = JSON.parse(JSON.stringify(resInfo))
                    tmp[index].needSku = e.target.value
                    setResInfo(tmp)
                  }}
                  value={item?.needSku}
                >
                  <Radio value={NeedSkuEnum.Need}>是</Radio>
                  <Radio value={NeedSkuEnum.NoNeed}>否</Radio>
                </Radio.Group>
              </div>
              {item?.needSku === NeedSkuEnum.Need && (
                <>
                  <TextArea
                    className={classNames('min-h-[200px]', 'w-3/5')}
                    disabled={disabledTextArea || !isInfoRang || !beInvited}
                    onChange={(e) => {
                      // const tmp = JSON.parse(JSON.stringify(resInfo))
                      const inputValue = e.target.value
                        .split(',')
                        .map((i) => i.trim())
                        .join(',')
                      const count = getSKUIdCount(inputValue)
                      if (count <= MAX_SKUIDS) {
                        setIdCount(count)
                        setSkuCode(inputValue)
                      }
                    }}
                    value={skuCode}
                    rows={4}
                    placeholder="请输入SKUID，多个用英文逗号隔开，最多支持100个"
                  />
                  <>
                    {!canNotInput && (
                      <div className="flex flex-row  font-sm">
                        <div className="text-sec">
                          已输入{idCount}个SKUID {idCount}/{MAX_SKUIDS}
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col  font-sm">
                      {disabledTextArea && (
                        <div className="text-sec">当前活动状态，不可输入</div>
                      )}
                      {!isInfoRang && (
                        <div className="text-sec">
                          当前不在确认周期内，不可输入
                        </div>
                      )}
                      {!beInvited && (
                        <div className="text-sec">未被邀请，不可输入</div>
                      )}
                    </div>
                  </>
                </>
              )}
            </>
          }
        />
        <div className="flex justify-end">
          <Button
            disabled={
              ![
                ActivityStatusEnum.Applying,
                ActivityStatusEnum.TobeActive,
                ActivityStatusEnum.Active,
              ].includes(status) || canNotInput
            }
            type="primary"
            onClick={async () => {
              const result = await checkSku({
                skuCodes: item?.needSku === NeedSkuEnum.Need ? skuCode : '',
              })
              if (result.success) {
                if (result.data.valid === CheckSkuValidEnum.NOT_ALL_PASS) {
                  message.error('校验SKUID失败')
                  return
                }
                message.success('校验SKUID成功')
                const res = await applySku({
                  activityId: actId,
                  resourceId: item?.resourceId,
                  skuCodes: item?.needSku === NeedSkuEnum.Need ? skuCode : '',
                })
                if (res.success) {
                  message.success('已提交成功（已自动去重）')
                  const newItem = {
                    ...item,
                    skuCodes: skuCode,
                  }
                  const newTabsArr = resInfo.map((item, idx) => {
                    if (idx !== index) {
                      return item
                    }
                    return newItem
                  })
                  setResInfo(newTabsArr)
                } else {
                  message.error(res.msg || '提交失败')
                }
              } else {
                message.error(result.msg || '校验SKUID失败')
              }
            }}
          >
            提交
          </Button>
        </div>
      </div>
    )
  }
)
