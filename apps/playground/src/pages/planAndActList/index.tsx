import { ZsptTab } from '@/common/components/zspt/Tab'
import {
  BizLineEnum,
  PlanAndActParamsEnum,
  PlanAndActTabResources,
} from '@/common'

import { PlanList } from './PlanList'
import { userModel } from '@/common/models'
import { useEffect, useMemo } from 'react'
import { roleManager } from '@/common/roles/manager'
import { ActList } from './ActList'
import { useParamsInfo } from '@/common/hooks'
import { PlanAndActListParams } from '@/common/routes'
import { roleAndPlanActTabMap } from '@/common/roles/mappings'
import { ErrorPage } from '@/common/components/zspt/ErrorPage'
import { PageErrorIconEnum } from '@/common/constants/images'
import { configListModel } from '@/common/models/configList'
// import {
//   chekAllActConfigs,
//   chekAllPlanConfigs,
// } from '@/common/configs/utils/checkConfig'

const WmOperateDoc: Record<PlanAndActTabResources, string> = {
  [PlanAndActTabResources.Plan]: 'https://km.sankuai.com/collabpage/2293586483',
  [PlanAndActTabResources.Act]: 'https://km.sankuai.com/collabpage/2293586483',
}

const SgOperateDoc: Record<PlanAndActTabResources, string> = {
  [PlanAndActTabResources.Plan]: 'https://km.sankuai.com/collabpage/1846350178',
  [PlanAndActTabResources.Act]: 'https://km.sankuai.com/collabpage/1846350178',
}

const WmsgOperateDoc: Record<PlanAndActTabResources, string> = {
  [PlanAndActTabResources.Plan]: 'https://km.sankuai.com/collabpage/2524545681',
  [PlanAndActTabResources.Act]: 'https://km.sankuai.com/collabpage/2524545681',
}

const OperateDoc: Record<
  BizLineEnum,
  Record<PlanAndActTabResources, string>
> = {
  [BizLineEnum.WaiMai]: WmOperateDoc,
  [BizLineEnum.ShanGou]: SgOperateDoc,
  [BizLineEnum.WaimaSongJiu]: WmsgOperateDoc,
}

export const Main = () => {
  const { data: userInfo } = userModel.getData()
  const { params } = useParamsInfo<PlanAndActListParams>()
  const bizLine = (params.bizLine || BizLineEnum.WaiMai) as BizLineEnum
  console.log('params.bizline:', bizLine)
  const tabs = useMemo(() => {
    return roleManager.getResources(roleAndPlanActTabMap, {
      userInfo,
      bizLine: bizLine,
    })
  }, [userInfo])

  // useEffect(() => {
  //   chekAllActConfigs(configList)
  //   chekAllPlanConfigs(configList)
  // }, [configList])

  if (tabs.length === 0) {
    return (
      <ErrorPage
        tips="可联系相关同学申请权限"
        error={PageErrorIconEnum.NoAuth}
      />
    )
  }

  return (
    <div className="relative px-8 min-w-[1100px]">
      <a
        href={OperateDoc[bizLine][params.tab || PlanAndActTabResources.Plan]}
        target="_blank"
        className="absolute top-[16px] right-8 z-10"
        rel="noreferrer"
      >
        查看操作手册 &gt;
      </a>
      <ZsptTab
        tabProps={{
          size: 'large',
        }}
        tabs={[
          {
            id: PlanAndActTabResources.Plan,
            label: <div className="font-medium text-xl">招商方案</div>,
            content: <PlanList />,
          },
          {
            id: PlanAndActTabResources.Act,
            label: <div className="font-medium text-xl">提报活动</div>,
            content: <ActList />,
          },
        ].filter((e) => tabs.includes(e.id))}
        defaultTab={PlanAndActTabResources.Plan}
        id={PlanAndActParamsEnum.ListTab}
      />
    </div>
  )
}
