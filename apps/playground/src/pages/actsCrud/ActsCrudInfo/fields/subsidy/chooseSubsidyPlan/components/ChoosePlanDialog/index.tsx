import {
  BaseContainer,
  DotText,
  GetSubsidyRule4GroupRes,
  GetSubsidyRuleList4PlanResult,
  GroupInfo,
  PlanTypeEnum,
  SubsidyConditionKeyEnum,
  SubsidyLevelEnum,
  TableHeader,
  anchorPointToWrongPosition,
  collectListModel,
  getBizLine,
  getSubsidyList4Plan,
  getSubsidyRule4Group,
  subsidyList4PlanModel,
} from '@/common'
import { PlanDetailInfo } from '@/common/components/zspt/PlanDetail'
import { SearchOutlined } from '@ant-design/icons'
import { Input, Modal, message, Collapse, Radio } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import './index.less'
import classNames from 'classnames'
import { searchPlans } from './utils'
import { observer } from 'mobx-react'
import { SubsidyRuleState } from '@/pages/actsCrud/ActsCrudInfo/actsPages/shenhuiyuan/interface'
import { MerchantMaxSubsidyScene } from '@/common/components/zspt/SubsidyTable/MerchantMaxSubsidy/columns'

export type ChoosePlanDialogProps = {
  show: boolean
  setShow: (show: boolean) => void
  value?: SubsidyRuleState
  onChange: (value: SubsidyRuleState) => void
  scene?: MerchantMaxSubsidyScene
  subsidyConditionKey?: SubsidyConditionKeyEnum
  planType?: PlanTypeEnum,
  subsidyScene?: SubsidyLevelEnum
}

const getPlanId = (
  filteredPlans: GetSubsidyRuleList4PlanResult,
  choosedGroupId: number
) => {
  return filteredPlans.find((e) => {
    const ids = (e.group || []).map((x) => x.id)
    return ids.includes(choosedGroupId)
  })?.id
}

export const ChoosePlanDialog = observer(
  ({
    show,
    setShow,
    value,
    onChange,
    scene,
    subsidyConditionKey = SubsidyConditionKeyEnum.ScOrderPriceWithoutCoupon,
    planType = PlanTypeEnum.ShenHuiYuan,
    subsidyScene
  }: ChoosePlanDialogProps) => {
    const [plans, setPlans] = useState<GetSubsidyRuleList4PlanResult>([])
    const [keyword, setKeyword] = useState('')
    const { loading: planListLoading } = subsidyList4PlanModel.getList()
    const [choosedGroupId, setChoosedGroupId] = useState<number>(value?.groupId)

    const [choosedPlanId, setChoosedPlanId] = useState<number>(value?.planId)
    const [detail, setDetail] = useState<GetSubsidyRule4GroupRes>()
    const [loading, setLoading] = useState(false)

    const filteredPlans = useMemo(
      () => searchPlans({ keyword, plans }),
      [plans, keyword]
    )

    // console.log('choosed:', choosed);

    useEffect(() => {
      setChoosedPlanId(
        getPlanId(filteredPlans, choosedGroupId || value?.groupId)
      )
    }, [choosedGroupId, value?.groupId, filteredPlans])

    useEffect(() => {
      const loadDetail = async () => {
        if (!choosedGroupId) {
          return
        }
        setLoading(true)
        const res = await getSubsidyRule4Group({ groupId: choosedGroupId })
        if (res.success) {
          setDetail(res.data)
        } else {
          message.error(res.msg)
        }
        setLoading(false)
      }
      loadDetail()
    }, [choosedGroupId])

    useEffect(() => {
      const init = async () => {
        const res = await subsidyList4PlanModel.loadList(() =>
          getSubsidyList4Plan({ bizLine: getBizLine(), planType: planType })
        )
        setPlans(res.data || [])
      }
      if (show) {
        init()
      }
    }, [show])

    return (
      <Modal
        title="选择方案"
        open={show}
        okButtonProps={{
          disabled: !detail || loading,
        }}
        loading={planListLoading}
        className="min-w-[1100px] h-[700px]  overflow-hidden"
        styles={{
          content: { height: '100%', display: 'flex', flexDirection: 'column' },
          body: { flex: 1, overflow: 'hidden' },
        }}
        onOk={() => {
          onChange(detail)
          setShow(false)
        }}
        destroyOnClose={true}
        onCancel={() => setShow(false)}
      >
        <div className="flex flex-col h-[500px] overflow-hidden">
          <Input
            prefix={<SearchOutlined />}
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            className="w-[300px]"
            placeholder="请输入方案ID或方案名称"
          />
          <div className="grid grid-cols-2 gap-0  mt-4 border border-[#F5F5F6] flex-1">
            <div className="col-span-1 plan-col flex flex-col h-full overflow-hidden">
              <TableHeader name="方案" className="bg-[#F5F5F6] p-2" />
              <div className="h-[400px] overflow-auto">
                <Radio.Group
                  value={choosedGroupId}
                  className="w-full"
                  onChange={(e) => {
                    setChoosedGroupId(e.target.value)
                  }}
                >
                  <Collapse
                    accordion={false}
                    className="border-none plans-info w-full"
                    size="small"
                    activeKey={choosedPlanId}
                    onChange={(e) => setChoosedPlanId(e as any)}
                    items={filteredPlans.map((each) => ({
                      key: each.id,
                      label: (
                        <DotText
                          line={1}
                          className={classNames('min-w-[300px]', {
                            'text-[#386BFF]': Boolean(
                              each.group.find((x) => x.id === choosedGroupId)
                            ),
                          })}
                        >
                          {each.name}
                        </DotText>
                      ),
                      children: (
                        <div className="flex flex-col">
                          {(each.group || []).map((e) => (
                            <Radio
                              key={e.id}
                              value={e.id}
                              className={classNames(
                                'mb-2 p-2 hover:bg-[#f1f1f2]',
                                {
                                  'bg-[#EDF1FE]': e.id === choosedGroupId,
                                }
                              )}
                            >
                              <DotText line={1} className="w-[250px]">
                                {e.name}
                              </DotText>
                            </Radio>
                          ))}
                        </div>
                      ),
                    }))}
                  />
                </Radio.Group>
              </div>
            </div>
            <div className="col-span-1  h-full overflow-hidden">
              <TableHeader name="预览" className="bg-[#F5F5F6] p-2" />
              <div className="w-full h-[400px] py-2 px-4  overflow-auto ">
                <PlanDetailInfo
                  className=""
                  loading={loading}
                  subsidyConditionKey={subsidyConditionKey}
                  detail={detail}
                  scene={scene}
                  subsidyScene={subsidyScene}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
)
