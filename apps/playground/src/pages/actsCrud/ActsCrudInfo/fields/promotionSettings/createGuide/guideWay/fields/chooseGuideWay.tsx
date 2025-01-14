import { nodeUtil } from '@easy-page/antd-ui'
import { CommonSubActPageState } from '../../../../interface'
import { CreateProductTypeEnum } from '@/common'
import { get } from 'lodash'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

export const chooseGuideWay = () =>
  nodeUtil.createField<string, CommonSubActPageState>(
    'chooseGuideWay',
    '引导建品方式',
    {
      required: true,
      mode: 'single',
      value: `${CreateProductTypeEnum.ByUpc}`,
      validate: ({ value }) => {
        if (!value) {
          return { success: false, errorMsg: '请选择引导建品方式' }
        }
        return { success: true }
      },
      postprocess({ value, pageState }) {
        if (!pageState.openGuide) {
          return {}
        }
        return {
          'poiBuildProduct.type': Number(value),
        }
      },
      preprocess: ({ defaultValues }) => {
        const type = get(defaultValues, 'poiBuildProduct.type')
        return type ? `${type}` : `${CreateProductTypeEnum.ByUpc}`
      },
      when: {
        effectedKeys: ['openGuide'],
        show({ effectedData }) {
          return effectedData['openGuide']
        },
      },
    },
    {
      formItem: {
        tooltip: (
          <Tooltip
            style={{ display: 'inline' }}
            rootClassName="whitespace-pre-line"
            title={
              <span>
                建议选择“通过标品编码引导”，此时当门店无可报名商品时，可引导商家上架商品。
                <a
                  href="https://km.sankuai.com/collabpage/1421546848"
                  target="__blank"
                >
                  查看说明文档
                </a>
              </span>
            }
          >
            <QuestionCircleOutlined className="ml-1" />
          </Tooltip>
        ),
      },
    }
  )
