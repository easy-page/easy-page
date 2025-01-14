import { nodeUtil } from '@easy-page/antd-ui'
import { ChoosePlanDialog } from './components/ChoosePlanDialog'
import { useContext, useState } from 'react'

import { Button } from 'antd'
import { PlanDetailInfo } from '@/common/components/zspt/PlanDetail'
import { ISubActivity } from '@/common/apis/saveAct/interfaces/subAct'
import { appendToSubAct } from '../utils/appendToSubAct'
import { getFromSubAct } from '../utils/getFromSubAct'
import {
  getS3Url,
  GetSubsidyRule4GroupRes,
  PlanTypeEnum,
  SubsidyConditionKeyEnum,
  SubsidyLevelEnum,
} from '@/common'
import classNames from 'classnames'
import { FormItemInputContext } from 'antd/es/form/context'
import { MerchantMaxSubsidyScene } from '@/common/components/zspt/SubsidyTable/MerchantMaxSubsidy/columns'
import { CommonActCrudFormProps, CommonActCrudFormState } from '../../interface'

export const chooseSubsidyPlan = ({
  scene,
  subsidyConditionKey = SubsidyConditionKeyEnum.ScOrderPriceWithoutCoupon,
  planType,
  subsidyScene
}: {
  scene?: MerchantMaxSubsidyScene
  subsidyConditionKey?: SubsidyConditionKeyEnum
  planType?: PlanTypeEnum,
  subsidyScene?: SubsidyLevelEnum
}) => {
  return nodeUtil.createCustomField<
    GetSubsidyRule4GroupRes,
    CommonActCrudFormState,
    CommonActCrudFormProps
  >(
    'subsidyRule',
    '选择补贴方案',
    ({ value, onChange, disabled }) => {
      const [show, setShow] = useState(false)
      const btnText = value ? '重选方案' : '选择方案'

      const { status: contextStatus } = useContext(FormItemInputContext)
      const hasError = contextStatus === 'error'
      return (
        <div className={classNames('flex flex-col')}>
          <Button
            className={classNames('w-[150px] border', {
              'border-[#386BFF]': !hasError,
              'border-[#EC5B56] subsidy-rule-status-error': hasError,
            })}
            type="default"
            icon={
              <img
                src={getS3Url('choose-plan-icon.png')}
                className="w-[20px]"
              />
            }
            disabled={disabled}
            onClick={() => setShow(true)}
          >
            <span className="text-[#456AF6]">{btnText}</span>
          </Button>
          <ChoosePlanDialog
            value={value}
            onChange={onChange}
            show={show}
            setShow={setShow}
            subsidyConditionKey={subsidyConditionKey}
            scene={scene || MerchantMaxSubsidyScene.PlanView}
            planType={planType}
            subsidyScene={subsidyScene}
          />
          {value ? (
            <PlanDetailInfo
              scene={scene || MerchantMaxSubsidyScene.PlanView}
              detail={value}
              subsidyConditionKey={subsidyConditionKey}
              layout="flex-row"
              subsidyScene={subsidyScene}
            />
          ) : (
            <></>
          )}
        </div>
      )
    },

    {
      required: true,
      validate: ({ value }) => {
        if (!value || !value.groupId) {
          return { success: false, errorMsg: '必选' }
        }
        return { success: true }
      },
      preprocess({ defaultValues }) {
        const subsidyRule4Group = getFromSubAct<
          ISubActivity['subsidyRule4Group']
        >('subsidyRule4Group', defaultValues)
        return subsidyRule4Group
      },
      postprocess: ({ value, processedFormData }) => {
        const subAct: ISubActivity[] = appendToSubAct(processedFormData, {
          subsidyRule4Group: value,
        })
        return {
          subActivity: subAct,
          source: 'plan',
          planId: value?.planId,
          groupId: value?.groupId,
        }
      },
    }
  )
}
