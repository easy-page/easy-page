import { nodeUtil } from '@easy-page/antd-ui'
import {
  ActivityInfo,
  COLLECT_STORE_ACT_DOWNLOAD_FILE,
  IActRuleList,
  ProductSelection,
  ZsptButton,
} from '@/common'
import { SUBSIDY_RISK_TIPS, showRiskTips } from './columns'
import './index.less'
import { Steps, Upload, message } from 'antd'
import {
  CheckCircleFilled,
  DownloadOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { uploadActRule } from '@/common/apis/uploadRules'
import { convertProductionSelectionToLocal, getUploadText } from './util'
import { CsActFormProps, CsActFormState } from '../../../interface'
import { ProductSelectionTable } from './productSelectionTable'
import { get } from 'lodash'

export const subActRule = nodeUtil
  .createCustomField<
    IActRuleList<ProductSelection>,
    CsActFormState,
    CsActFormProps
  >(
    'actRule',
    '设置规则',
    ({ value, onChange, disabled, frameworkProps: { store } }) => {
      const {
        actRule,
        uploadError = [],
        actStashList = [],
      } = (value || {}) as IActRuleList<ProductSelection>

      const formData = store.pageState as CsActFormState

      const {
        activity = {} as ActivityInfo,
        chargeFlowType,
        jhdType,
        poiType,
        promotionType,
      } = formData

      const timeRange = formData['promotionTime.timeRange']
      const startTime = timeRange?.[0]

      const actId = activity.id

      const [uploading, setUploading] = useState(false)

      const hasError = Boolean(actStashList.find((e) => e.errors?.length > 0))
      const uploadSuccess =
        (uploadError || [])?.length === 0 && actRule && !hasError

      /** 配置了禁用，或者是未填写：活动开始时间和门店类型 */
      const hasNotFillFields =
        !jhdType?.choosed ||
        !poiType ||
        !timeRange ||
        timeRange.filter((e) => Boolean(e)).length !== 2

      const disabledUpload = disabled || hasNotFillFields

      const showSubsidyRiskTips = showRiskTips({
        isAct: true,
        isPreview: false,
        uploadError,
        subsidyType: ['agentSubsidy', 'directSubsidy'],
        productSelections: actStashList,
      })

      /** 判断是否上传过文件 */
      const uploadedFile =
        Boolean(actRule) || uploadError?.length > 0 || actStashList.length > 0

      return (
        <div className="sub-active-rule-container">
          <Steps
            className="upload-steps"
            direction="vertical"
            size="default"
            current={-1}
            items={[
              {
                title: (
                  <div className="">
                    <span className="mr-2 text-sm text-black">
                      下载“选品与优惠规则”表格
                    </span>
                    <ZsptButton
                      type="primary"
                      icon={<DownloadOutlined />}
                      onClick={async () => {
                        window.open(COLLECT_STORE_ACT_DOWNLOAD_FILE)
                      }}
                      className="result-action-btn h-[30px]"
                    >
                      下载表格
                    </ZsptButton>
                  </div>
                ),
              },
              {
                title: (
                  <div className="text-black text-sm mt-[5px]">
                    <span>按要求在excel中设置规则</span>
                  </div>
                ),
              },
              {
                title: (
                  <div className="upload-step-3  mt-[2px]">
                    <Upload
                      multiple={false}
                      disabled={uploading || disabled || hasNotFillFields}
                      showUploadList={false}
                      beforeUpload={async (file: File) => {
                        setUploading(true)
                        try {
                          console.log('startTime:', startTime)
                          const result = await uploadActRule({
                            file,
                            ...(actId === null ? {} : { activityId: actId }),
                            chargeFlowType: chargeFlowType,
                            startTime: startTime?.unix(),
                            jhdType: jhdType?.choosed,
                          })

                          if (result.success) {
                            const data = result.data
                            const transformData = {
                              uploadError: data.uploadError,
                              actRule: data.actRule,
                              pn: data.pn,
                              allPass: data.allPass,
                              actStashList: convertProductionSelectionToLocal(
                                true,
                                data.actStashList
                              ),
                            }
                            console.log('transformData result:', result)
                            onChange(transformData)
                          } else {
                            message.error(result?.msg || '表格上传失败，请重试')
                          }

                          setUploading(false)
                          return false
                        } catch (error) {
                          setUploading(false)
                          message.error(error?.message)
                        }
                        return false
                      }}
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                      fileList={[]}
                      headers={{
                        'Content-Type': 'multipart/form-data',
                      }}
                    >
                      <ZsptButton
                        loading={uploading}
                        disabled={uploading || disabled || hasNotFillFields}
                        icon={<UploadOutlined />}
                        type="primary"
                        className="upload-table-btn h-[30px]"
                      >
                        {getUploadText({
                          loading: uploading,
                          uploaded: uploadedFile,
                        })}
                      </ZsptButton>
                      {hasNotFillFields ? (
                        <div className="disable-upload-tips mt-1 text-[#FF4D4F] text-xs font-medium">
                          请先选择邀请目标集合店、门店类型、补贴类型、活动生效时间
                        </div>
                      ) : (
                        <></>
                      )}
                    </Upload>

                    {value?.actRule ? (
                      <div className="sub-acts-desc">
                        {actRule?.fileName ? (
                          <>
                            <a
                              target="_blank"
                              href={actRule?.url || ''}
                              rel="noreferrer"
                              className="text-[#386BFF]"
                            >
                              {actRule?.fileName}&nbsp;
                            </a>
                            &nbsp;|&nbsp;
                          </>
                        ) : (
                          <></>
                        )}
                        共&nbsp;{actStashList?.length || '-'}&nbsp;条子活动
                        {uploadSuccess && !disabledUpload ? (
                          <span className="sub-acts-tips">
                            <CheckCircleFilled />
                            &nbsp;校验成功
                          </span>
                        ) : (
                          <></>
                        )}
                        {showSubsidyRiskTips ? (
                          <div className="subsidy-risk-tips">
                            风险提示：{SUBSIDY_RISK_TIPS}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                    {uploadedFile ? (
                      <ProductSelectionTable
                        fileErrorInfo={uploadError}
                        productSelections={actStashList}
                        showErrorToolbar
                        poiType={poiType}
                        chargeFlowType={chargeFlowType}
                        showSubsidyRiskTips={showSubsidyRiskTips}
                        isAct={true}
                        actType={promotionType}
                        isPreview={false}
                        className="sub-activity-rule-table-container"
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                ),
              },
            ]}
          />
        </div>
      )
    },
    {
      required: true,

      effectedKeys: [
        'poiType',
        'chargeFlowType',
        'promotionTime.timeRange',
        'promotionType',
        'jhdType',
      ],

      preprocess({ defaultValues }) {
        return (
          get(defaultValues, 'actRule') || {
            allPass: false,
            actRule: null,
            actStashList: [],
            pn: [],
          }
        )
      },

      postprocess: ({ value }) => {
        console.log('valpostprocessue:', value)
        return {
          actRule: {
            url: value?.actRule?.url,
            dataId: value?.actRule?.dataId,
            fileName: value?.actRule?.fileName,
          },
        }
      },
      validate: ({ value }) => {
        if (!value || (value?.actStashList || []).length === 0) {
          return { success: false, errorMsg: '必填' }
        }

        // 行内存在错误，拦截表单校验
        if (value?.uploadError?.length > 0) {
          return { success: false, errorMsg: ' ' }
        }

        if (
          value?.actStashList?.length > 0 &&
          value?.actStashList?.some(
            (item: any) => Array.isArray(item.errors) && item.errors.length > 0
          )
        ) {
          return { success: false, errorMsg: ' ' }
        }

        return { success: true }
      },
    },
    {
      layout: {},
      formItem: {
        labelAlign: 'right',
        // noStyle: true,
        wrapperCol: { span: 20 },
      },
    }
  )
  .appendChildren([])
