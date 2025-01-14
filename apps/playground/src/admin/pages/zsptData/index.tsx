import {
  fullConfigsModel,
  loadFullConfigs,
} from '@/admin/common/models/fullConfigs'
import { loadZsptData, zsptDataModel } from '@/admin/common/models/zsptData'
import {
  BaseContainer,
  BIZ_TYPE_MAP,
  ConfigEnv,
  getQueryString,
} from '@/common'
import { getActConfig, getPlanConfig } from '@/common/configs'
import { observer } from 'mobx-react'
import { useEffect, useMemo } from 'react'
import { ZsptCharts } from './ZsptChart'
import { getZpstAdminPlanConfig } from './utils/getZsptPlanConfig'
import { getZsptActConfig } from './utils/getZsptActConfig'
import { sum } from 'lodash'
import { ZsptDatas } from '@/admin/common/apis/getZsptDatas'

export const ZsptData = observer(() => {
  const { data: configs } = fullConfigsModel.getList()
  const { data: zsptData, error, loading } = zsptDataModel.getData()

  const isQa = getQueryString('isQa') === 'yes'

  useEffect(() => {
    loadFullConfigs()
    loadZsptData()
  }, [])
  const { newData, newSTData } = useMemo(() => {
    const newData = { ...zsptData }
    const newSTData: ZsptDatas = {
      actsDatas: [],
      actsDatasByYears: [],
      plansData: [],
      allActsDatas: {
        totalCount: 0,
        creatorCount: 0,
      },
      allPlansDatas: {
        totalCount: 0,
        creatorCount: 0,
      },
    }
    console.log('zsptData:', zsptData)
    newData.allActsDatas = {
      ...(newData.allActsDatas || ({} as any)),
      bizLineName: newData.allActsDatas?.bizLine
        ? BIZ_TYPE_MAP[newData.allActsDatas?.bizLine]
        : '',
    }
    newData.allPlansDatas = {
      ...(newData.allPlansDatas || ({} as any)),
      bizLineName: newData.allPlansDatas?.bizLine
        ? BIZ_TYPE_MAP[newData.allPlansDatas?.bizLine]
        : '',
    }
    newData.actsDatas = (newData?.actsDatas || [])
      .map((e) => {
        const config = getZsptActConfig({ configs, templateId: e.templateId })
        const pinhaofan = e.templateId === 0 ? '拼好饭相关' : ''
        const newData = {
          ...e,
          actName: config?.name || pinhaofan,
          bizLineName: e.bizLine !== undefined ? BIZ_TYPE_MAP[e.bizLine] : '',
        }
        if (config.env === ConfigEnv.ST) {
          newSTData.actsDatas.push(newData)
          return null
        }
        return newData
      })
      .filter((x) => x !== null)

    newData.actsDatasByYears = (newData?.actsDatasByYears || [])
      .map((e) => {
        const config = getZsptActConfig({ configs, templateId: e.templateId })
        const pinhaofan = e.templateId === 0 ? '拼好饭相关' : ''
        const newData = {
          ...e,
          actName: config?.name || pinhaofan,
          bizLineName: e.bizLine !== undefined ? BIZ_TYPE_MAP[e.bizLine] : '',
        }
        if (config.env === ConfigEnv.ST) {
          newSTData.actsDatasByYears.push(newData)
          return null
        }
        return newData
      })
      .filter((x) => x !== null)

    newData.allActsDatas.totalCount = sum(
      newData.actsDatas.map((e) => e.totalCount)
    )

    newData.plansData = (newData?.plansData || []).map((e) => {
      const config = getZpstAdminPlanConfig({
        configs,
        planType: e.type,
        bizLine: e.bizLine,
      })
      console.log('11config:', e.bizLine, config)
      const newData = {
        ...e,
        bizLineName: e.bizLine !== undefined ? BIZ_TYPE_MAP[e.bizLine] : '',
        planName: config?.name,
      }
      if (config.env === ConfigEnv.ST) {
        newSTData.plansData.push(newData)
      }
      return newData
    })
    newSTData.allActsDatas = {
      totalCount: sum(newSTData.actsDatas.map((e) => e.totalCount)),
      creatorCount: 0,
    }
    newSTData.allPlansDatas = {
      totalCount: sum(newSTData.plansData.map((e) => e.totalCount)),
      creatorCount: 0,
    }
    return { newData, newSTData }
  }, [configs, zsptData])
  console.log('resultData:', error, loading, zsptData, newData)
  return (
    <BaseContainer models={[fullConfigsModel, zsptDataModel]}>
      {/* <div>11</div> */}
      <ZsptCharts data={isQa ? newSTData : newData} />
    </BaseContainer>
  )
})
