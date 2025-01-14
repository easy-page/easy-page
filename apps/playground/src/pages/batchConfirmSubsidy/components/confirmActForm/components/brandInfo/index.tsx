import { nodeUtil } from '@easy-page/antd-ui'
import { batchConfirmActStatModel } from '@/common/models/btachConfirmActStat'
import { Button, Modal } from 'antd'
import { useMemo, useState } from 'react'
import {
  ConfirmContent,
  SingleBatchConfirmAct,
} from '@/common/apis/getBatchConfirmActList'
import { formateDate, FormatStyle, getQueryString, toJson } from '@/common'
import './index.less'
import classNames from 'classnames'

export const brandInfo = nodeUtil.createCustomField<any>(
  'brandInfo',
  '',
  ({ value, onChange, frameworkProps: { store }, disabled }) => {
    const { data } = batchConfirmActStatModel.getData()
    const [isExpand, setIsExpand] = useState(false)
    const { brandInfo } = data

    const confirm4Batch = getQueryString('confirm4Batch')

    const isBtachConfirm = confirm4Batch === 'true'

    if (!brandInfo || brandInfo.length === 0) {
      return <></>
    }

    if (!isBtachConfirm) {
      return (
        <div className="flex items-center justify-between w-[600px]">
          <div>
            业务品牌ID
            <span className="ml-6">{brandInfo[0].brandId}</span>
          </div>
          <div>
            业务品牌名称
            <span className="ml-6">{brandInfo[0].brandName}</span>
          </div>
        </div>
      )
    }

    return (
      <div className="flex mt-2 mb-4 items-center">
        <div className="mr-4 flex self-start items-start relative">
          业务品牌
        </div>
        <div className="flex flex-col">
          <div>
            已选
            <span className="text-[#FF4D4F] ml-1 mr-1">
              {brandInfo.length}个
            </span>
            业务品牌
            <span
              onClick={() => {
                setIsExpand(!isExpand)
              }}
              className=" ml-12 relative top-[-1px] expand-text"
            >
              {isExpand ? '收起' : '展开'}
              <span
                className={classNames('expand-text-tag', {
                  fold: !isExpand,
                  expand: isExpand,
                })}
              ></span>
            </span>
          </div>
          <div>
            {isExpand && (
              <div
                className={classNames(
                  'brand-info-list flex flex-wrap mt-2 w-[550px]',
                  {
                    fold: !isExpand,
                    expand: isExpand,
                  }
                )}
              >
                {brandInfo.map((item, index) => (
                  <div key={index} className="relative w-[50%]">
                    <span className="">{item.brandId}</span>
                    <span className="ml-2">{item.brandName}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  },
  {
    // effectedKeys: ['chooseAct'],
    postprocess() {
      return {}
    },
  },
  {
    formItem: {
      colon: false,
      // labelCol: { span: 4 },
      // wrapperCol: { span: 18 },
    },
  }
)
