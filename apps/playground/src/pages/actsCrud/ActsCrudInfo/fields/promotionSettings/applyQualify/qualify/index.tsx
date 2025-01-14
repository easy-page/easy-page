import { ActTypeEnum, factorModel, isCreate } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { Button } from 'antd'
import { useMemo, useState } from 'react'
import '@roo/roo/dist/theme/default.css'
import { ChoosedFactorInfo, QualifyDialog } from './components'
import { Qualify } from '@/common/apis/saveAct/interfaces'
import { filterDisabledFactors } from '@/common/apis'
import { configListModel } from '@/common/models/configList'
import { getActConfig } from '@/common/configs'
import {
  CommonSubActPageState,
  CommonSubActPageProps,
} from '../../../interface'
import { QualifyDefaultConfig } from './config/defaultValue'

export type GetQualifyOptions = {
  actType: ActTypeEnum
  label?: string
}

export const getQualify = <
  PageState extends CommonSubActPageState = CommonSubActPageState,
  PageProps extends CommonSubActPageProps = CommonSubActPageProps
>({
  actType,
  label = '筛选商家/商品'
}: GetQualifyOptions) => {
  return nodeUtil.createCustomField<
    Qualify,
    CommonSubActPageState,
    CommonSubActPageProps
  >(
    'qualify',
    '',
    ({ value, onChange, disabled, frameworkProps: { store } }) => {
      const subActName = store.getState('name') as string
      const openGuide = store.getState('openGuide') as boolean
      console.log('valueval1uevalue:', openGuide)

      const { searchOptions, firstCategoryList, factors } = useMemo(() => {
        const { data: factors } = factorModel.getData()
        return {
          ...filterDisabledFactors({
            oriFirstCategoryList: factors?.firstCategoryList,
            choosedFactor: value,
            openGuide,
          }),
          factors,
        }
      }, [value, openGuide])

      const config = useMemo(() => {
        const { data: configs } = configListModel.getList()
        return getActConfig({ configs, actType })
      }, [])

      console.log('config', config)

      const [showQualifyDialog, setShowQualifyDialog] = useState(false)

      /**
       * - 用于在点击取消后刷新弹窗，即可不保存取消时候选中的内容
       */
      const [qualifyDialogKey, setQualifyDialogKey] = useState(
        new Date().getTime()
      )

      return (
        <div className="flex flex-col">
          <Button
            type="primary"
            className="w-[150px]"
            onClick={() => setShowQualifyDialog(true)}
          >
            {label}
          </Button>

          <div className="mt-2">
            <ChoosedFactorInfo
              searchOptions={searchOptions}
              categoryCodes={config.actFactorInfo?.categories || []}
              value={value}
            />
          </div>

          <QualifyDialog
            visible={showQualifyDialog}
            value={value}
            key={qualifyDialogKey}
            disabled={disabled}
            firstCategoryList={firstCategoryList}
            searchOptions={searchOptions}
            subActName={subActName}
            handleChange={(val) => {
              onChange(val)
            }}
            factors={factors}
            onClose={() => {
              setShowQualifyDialog(false)
              setQualifyDialogKey(new Date().getTime())
            }}
          />
        </div>
      )
    },

    {
      effectedKeys: ['name', 'openGuide'],
      // 注入默认值
      actions: [
        {
          /** 初始化执行 */
          initRun: true,
          /** 初始化查询选中数据 */
          action: async ({ value, initRun }) => {
            // 回填默认值
            if (isCreate() && initRun) {
              const { data: configs } = configListModel.getList()
              const config =
                getActConfig({ configs, actType })?.actFactorInfo
                  ?.factorConfigs || {}

              const defaultValues = Object.keys(config)
                .filter((item) => {
                  return config[item]?.defaultChoosed === true
                })
                .map((item) => ({
                  [item]: config[item]?.defaultValue,
                }))
                .reduce((pre, next) => Object.assign(pre, next), {})
              if (defaultValues?.length === 0) {
                return {}
              }
              return {
                fieldValue: {
                  ...value,
                  dataCollector: {
                    ...value?.dataCollector,
                    ...defaultValues,
                  },
                },
                validate: false,
              }
            }
            return {}
          },
        },
      ],
    },
    {
      layout: {
        disableLayout: true,
      },
    }
  )
}

export * from './common'
export * from './components'
