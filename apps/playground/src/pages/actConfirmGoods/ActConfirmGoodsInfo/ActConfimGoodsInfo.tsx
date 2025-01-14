import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ActFullInfo,
  ActivityInfo,
  FormatStyle,
  ResourceInfo,
  ZsptTab,
  formateDate,
  toNumber,
} from '@/common'
import {
  ActTitle,
  Field,
} from '@/pages/actApplyResult/ActApplyResultInfo/common'
import { ResourcePositionInfo } from './ResourcePositionInfo'
import { Modal, Tabs } from 'antd'

export type ActInfoProps = {
  actDetail: ActFullInfo
}

export const ActConfimGoodsInfo = ({ actDetail }: ActInfoProps) => {
  const refs = useRef({})

  const activityInfo = actDetail?.activity || ({} as ActivityInfo)
  const { status, resourceInfo, name, id } = activityInfo
  const [resInfo, setResInfo] = useState<ResourceInfo[]>(resourceInfo || [])
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const computedTabs = useMemo(() => {
    let resourceInfoMap = []
    if (resInfo && resInfo.length > 0) {
      resourceInfoMap = resInfo.map((item, index) => {
        return {
          id: item?.resourceId?.toString(),
          label: item?.resourceName || `资源位${index + 1}`,
          closable: false,
          ...item,
        }
      })
    }
    return resourceInfoMap
  }, [resInfo])

  const handleChangeTab = async (newIndex: number) => {
    const hasChangInTab = refs.current[activeIndex]?.isChangeSkuCodeInTab()

    if (hasChangInTab) {
      const awaitCheckModal = () => {
        return new Promise((resolve) => {
          Modal.confirm({
            title: '提示',
            centered: true,
            content: '当前数据未保存，离开后修改的数据会丢失',
            okText: '确认离开',
            cancelText: '留在此页',
            onOk: async () => {
              resolve(true)
            },
            onCancel: () => {
              resolve(false)
            },
          })
        })
      }

      const isConfirmLeave = await awaitCheckModal()
      if (isConfirmLeave) {
        setActiveIndex(newIndex)
      }
    } else {
      setActiveIndex(newIndex)
    }
  }

  return (
    <div className="flex flex-col">
      <ActTitle title={name} status={status} />
      <div className="flex">
        <Field label={'提报活动 ID'} value={id} />
        <Field
          className="ml-20"
          label={'提报活动时间'}
          value={`${formateDate(
            activityInfo?.promotionTime?.startTime,
            FormatStyle.YYYYMMDDHHmmss
          )} 至 ${formateDate(
            activityInfo?.promotionTime?.endTime,
            FormatStyle.YYYYMMDDHHmmss
          )}`}
        />
      </div>
      <Field
        className="mt-4"
        label={'促销类型'}
        value={`${actDetail?.templateName}`}
      />
      <h3 className="mt-8">确认信息</h3>
      <Field
        className="mt-2"
        label={'确认截止时间'}
        value={`${formateDate(
          activityInfo?.confirmTime?.skuAdmin?.endTime,
          FormatStyle.YYYYMMDDHHmmss
        )}`}
      />
      {computedTabs?.length > 0 && (
        <div className="mt-4 confirm-sku-tabs-container">
          <div className="tab-list">
            {computedTabs.map((item, index) => (
              <div
                key={index}
                onClick={() => handleChangeTab(index)}
                className={`tab-list-item ${
                  index === activeIndex ? 'active' : ''
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>

          <div className="tab-content">
            {computedTabs.map((item, index) => (
              <ResourcePositionInfo
                isShow={activeIndex === index}
                ref={(ref) => (refs.current[index] = ref)}
                item={item}
                index={index}
                resInfo={resInfo}
                setResInfo={setResInfo}
              />
            ))}
          </div>
        </div>
      )}
      <h3 className="mt-8">活动邀请</h3>
      <Field label={'供应商ID'} value={`${actDetail?.invitation?.inputData}`} />
    </div>
  )
}
