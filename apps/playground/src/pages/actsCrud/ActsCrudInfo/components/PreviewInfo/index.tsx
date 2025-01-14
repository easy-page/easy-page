import { Modal, message } from 'antd'
import { PreviewInfo, PreviewInfoProps } from './PreviewInfo'
import './index.less'
import { getSubActNameWithoutFactors } from './utils'
import {
  ActFullInfo,
  checkGuideCreateInfo,
  CreateProductTypeEnum,
} from '@/common'
export type SubmitActConfirmProps = PreviewInfoProps & {
  onConfirm: () => Promise<void>
  checkSubActQualify?: boolean
  checkGuideCreate?: boolean
}

const isSetGuideCreate = (actInfo: ActFullInfo) => {
  const openGuide = actInfo?.subActivity?.[0]?.openGuide
  return openGuide
}

export const submitActConfirm = async ({
  data,
  fields,
  factors,
  onConfirm,
  checkSubActQualify,
  checkGuideCreate,
}: SubmitActConfirmProps): Promise<void> => {
  const doSubmit: () => Promise<void> = () =>
    new Promise((resolve, reject) => {
      Modal.confirm({
        title: '确认提交活动吗?',
        centered: true,
        className: 'preview-info',
        styles: {
          content: {
            height: '600px',
            width: '100%',
            overflow: 'hidden',
            padding: 0,
          },
          body: { height: '100%', overflow: 'hidden' },
        },
        content: <PreviewInfo factors={factors} data={data} fields={fields} />,
        onOk: () => {
          return onConfirm()
            .then(() => {
              resolve()
            })
            .catch((err) => {
              console.error('submitActConfirm error:', err)
              message.error('提交出错，请稍后重试!')
              resolve()
            })
        },
        onCancel: () => {
          resolve()
        },
      })
    })

  const subActNames = getSubActNameWithoutFactors(data)

  // 引导建品提示
  if (checkGuideCreate && isSetGuideCreate(data)) {
    const res = await checkGuideCreateInfo(data)
    if (!res.success) {
      Modal.confirm({
        title: '提示',
        content: (
          <div
            dangerouslySetInnerHTML={{
              __html: res?.msg || '引导建品商品规则校验失败',
            }}
          ></div>
        ),
        closable: false,
        cancelText: '取消',
        okText: '确定',
      })
      return
    }
  }

  if (subActNames.length === 0 || !checkSubActQualify) {
    return doSubmit()
  }

  return new Promise((resolve, reject) => {
    Modal.confirm({
      title: '以下子活动未设置任何商品资质因子，确认提交活动吗？',
      centered: true,
      className: '',
      // styles: {
      //   content: {
      //     width: '100%',
      //     overflow: 'hidden',
      //     // padding: 0,
      //   },
      //   body: { height: '100%', overflow: 'hidden' },
      // },
      content: (
        <div className="text-[#585A6D] max-h-[400px] overflow-auto">
          {subActNames.map((e, idx) => (
            <div>
              子活动{idx + 1}: {e}
            </div>
          ))}
        </div>
      ),
      onOk: async () => {
        await doSubmit()
        return resolve()
      },
      onCancel: () => {
        resolve()
      },
    })
  })
}
