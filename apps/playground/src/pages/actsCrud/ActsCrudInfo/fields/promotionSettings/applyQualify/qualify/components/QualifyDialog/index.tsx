import {
  CategoryCode,
  FactorInfo,
  FactorListFirstCategory,
  FactorListSecondCategory,
  mccModel,
  OperationFactorItem,
  ZsptButton,
} from '@/common'
import { Button, Modal, Select, Tabs } from 'antd'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DEFAULT_COMPONENTS, EasyPage, FormUtil } from '@easy-page/antd-ui'
import { CUSTOM_COMPONENTS } from '@/common/components/easypage'
import './index.less'
import { FactorsFormProps, getFactorPageInfo } from '../../common'
import { FactorList } from '../FactorList'
import { getDimensionDefaultChoosedFactors } from './utils'
import {
  Qualify,
  DataCollector,
} from '@/common/apis/saveAct/interfaces/qualify'
import { checkQualify } from '@/common/apis/checkQualify'
import { zsptConfirm } from '@/common/components/zspt/ZsptConfirm'
import { flatten } from 'lodash'

export type QualifyDialogProps = {
  value: Qualify
  handleChange: (qualify: Qualify) => void
  onClose: () => void
  visible: boolean
  firstCategoryList: FactorListFirstCategory<OperationFactorItem>[]
  searchOptions: OperationFactorItem[]
  factors?: FactorInfo
  disabled?: boolean
  subActName?: string
}

export const QualifyDialog = ({
  value,
  handleChange,
  firstCategoryList,
  searchOptions = [],
  onClose,
  visible,
  subActName,
  disabled,
}: QualifyDialogProps) => {
  const [curSearch, setCurSearch] = useState<string>()
  // 页面选中维度
  const [currentDimension, setCurrentDimension] = useState<CategoryCode>()

  const formRef = useRef<FormUtil<Record<string, any>>>()

  const {
    data: { factor_association_rules_map },
  } = mccModel.getData()

  const [choosedFactors, setChooseFactors] = useState<OperationFactorItem[]>([])
  // console.log('QualifyDialog value:', value, choosedFactors)

  const [curVal, setCurVal] = useState<DataCollector>({})

  const [formKey, setFormKey] = useState<string>()

  const pageInfo = useMemo(() => {
    const id = `${new Date().getTime()}`
    setFormKey(id)
    const allFactors: OperationFactorItem[] = flatten(
      firstCategoryList.map((e) =>
        flatten(
          (e.labelList as FactorListSecondCategory<OperationFactorItem>[]).map(
            (e) =>
              e.list.map((x) => ({
                ...x,
                categoryCode: e.code,
                categoryTitle: e.name,
              }))
          )
        )
      )
    )
    console.log('new form key')
    return getFactorPageInfo({
      allFactors: allFactors,
      id,
      mccConfigs: {
        factorAssociationRulesMap: factor_association_rules_map,
      },
    })
  }, [firstCategoryList])
  console.log('value?.dataCollector:', value?.dataCollector)

  useEffect(() => {
    console.log('value?.dataCollector:', value?.dataCollector)
    setCurVal(value?.dataCollector)
    setFormKey(`${new Date().getTime()}`)
  }, [value])

  useEffect(() => {
    const dismension = firstCategoryList[0]?.code
    setCurrentDimension(dismension)
  }, [firstCategoryList])

  useEffect(() => {
    setChooseFactors(
      getDimensionDefaultChoosedFactors({
        value,
        searchOptions,
      })
    )
  }, [value, searchOptions])

  const handleChooseFactors = useCallback(
    (factors) => {
      const formData = formRef.current?.getFormData() || {}
      const newVal = {
        ...formData,
      }

      /** 删除未选中值 */
      const choosedKeys = Object.keys(newVal)
      choosedKeys.forEach((e) => {
        const factor = factors.find((x) => x.factorCode === e)
        if (!factor) {
          delete newVal[e]
        }
      })
      setCurVal(newVal)
      setChooseFactors(factors)
    },
    [formRef.current]
  )

  return (
    <Modal
      width={'90%'}
      centered
      title="设置招商对象"
      open={visible}
      destroyOnClose={true}
      closable
      onCancel={() => {
        onClose?.()
      }}
      onClose={() => {
        onClose?.()
      }}
      footer={null}
    >
      <div className="flex flex-col h-[600px] overflow-hidden w-full qualify-dialog">
        <div className="flex-1 flex flex-row w-full overflow-hidden">
          <div className="flex flex-col w-1/3 overflow-auto">
            {subActName ? (
              <div className="flex flex-col mb-4">
                <div className="font-medium text-base">优惠活动名称</div>
                <div>{subActName}</div>
              </div>
            ) : (
              <></>
            )}
            <div className="font-medium text-base mb-4">可选筛选因子</div>
            <Select
              placeholder="搜索筛选因子"
              value={curSearch}
              allowClear
              onChange={(val) => {
                setCurSearch(val)
                const factor = searchOptions.find((x) => x.factorCode === val)
                if (currentDimension !== factor.categoryCode) {
                  setCurrentDimension(factor.categoryCode)
                }
              }}
              options={searchOptions.map((e) => ({
                label: e.factorName,
                value: e.factorCode,
              }))}
            />
            <Tabs
              activeKey={currentDimension}
              onChange={(id) => setCurrentDimension(id as CategoryCode)}
              items={firstCategoryList.map((e) => ({
                id: e.code,
                key: e.code,
                label: e.name,
                children: (
                  <div>
                    {(e.labelList || []).map((e) => (
                      <FactorList
                        key={e.id}
                        categoryCode={e.code}
                        title={e.name}
                        formRef={formRef}
                        disabled={disabled}
                        secondCategory={e}
                        setChooseFactors={handleChooseFactors}
                        choosedFactors={choosedFactors}
                        searched={curSearch || ''}
                      />
                    ))}
                  </div>
                ),
              }))}
            ></Tabs>
          </div>
          {pageInfo ? (
            <div className="ml-4 flex-1 flex flex-col overflow-auto">
              <div className="font-medium text-base choosed-factor-title pb-2 mb-4">
                已选信息（共 {choosedFactors.length} 个因子取交集）
              </div>
              <EasyPage<DataCollector, FactorsFormProps>
                {...pageInfo}
                commonUIConfig={{
                  form: {
                    labelCol: { span: 8 },
                    labelAlign: 'left',
                  },
                }}
                onChange={({ formUtil, value }) => {
                  const values = formUtil?.getFormData?.() || {}
                  console.log('pageStatepageState valuesvalues:', values)
                  setCurVal(values)
                }}
                defaultValues={curVal}
                key={formKey}
                components={{ ...DEFAULT_COMPONENTS, ...CUSTOM_COMPONENTS }}
                context={{
                  choosedFactors,
                  setChoosedFactors: handleChooseFactors,
                  editable: disabled ? false : true,
                }}
                setFormUtil={(ref) => {
                  formRef.current = ref
                }}
                pageType="form"
              ></EasyPage>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="h-[40px] mt-2 flex justify-end">
          <Button
            onClick={() => {
              onClose()
            }}
          >
            取消
          </Button>
          {disabled ? (
            <></>
          ) : (
            <ZsptButton
              type="primary"
              className="ml-2"
              onClick={async () => {
                try {
                  await formRef.current?.validateVisibleFields?.()
                  const data = formRef?.current?.getFormData?.() || {}
                  const res = await checkQualify({
                    dataCollector: data,
                  })
                  if (res.success && res.data?.success) {
                    handleChange({
                      ...value,
                      dataCollector: curVal,
                    })
                    onClose()
                  } else {
                    zsptConfirm({
                      title: res.data?.errorMsg || '远程校验因子失败',
                      cancelButtonProps: { hidden: true },
                      okText: '知道了',
                    })
                  }
                } catch (error) {
                  console.error(error)
                }
              }}
            >
              确定
            </ZsptButton>
          )}
        </div>
      </div>
    </Modal>
  )
}
