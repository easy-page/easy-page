import { observer } from 'mobx-react'
import { ALL_TEMPLATE_ID, MODAL_INFOS } from './constant'
import {
  actListModel,
  BizLineEnum,
  downloadActList,
  DownloadActListParams,
  DownloadType,
  getBizLine,
  mccModel,
} from '@/common'
import './dowloadListModal.less'
import { message, Modal, Checkbox } from 'antd'

export const NONE_TEMPLATE_DOWNLOAD_CODE = 113315 // 无下载结果时的返回码

interface DownloadListModalProps {
  isShow: boolean
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
  downloadType: DownloadType
}

type TemplateInfo = { templateName: string; templateId: number }

type TemplateInfoCheck = TemplateInfo & { checked: boolean }

export const DownloadListModal: React.FC<DownloadListModalProps> = observer(
  ({ isShow, setIsShow, downloadType }) => {
    const filters = actListModel.getFilters()
    const { templateId } = filters
    const { data: mccData } = mccModel.getData()
    console.log('showDownloadModal:', templateId, isShow)
    if (!isShow) {
      return <></>
    }
    const { des } = MODAL_INFOS[downloadType]
    const downloadList = mccData.download_act_list_template || []
    const isSelectTemplatedValid =
      templateId === ALL_TEMPLATE_ID ||
      downloadList
        .map((temp: TemplateInfo) => temp.templateId)
        .includes(templateId)

    const toastNoneTemplate = () => {
      message.error({
        content: (
          <div>
            <div>无可下载的活动，请修改筛选项后重试。</div>
            <div>
              当前支持下载的促销类型为:商品券-单品牌券(共补)、商品券-品牌联合券(共补)
            </div>
          </div>
        ),
        duration: 5000,
      })
    }

    if (!downloadList.length) {
      return <></>
    }

    if (!isSelectTemplatedValid) {
      toastNoneTemplate()
      setIsShow(false)
      return <></>
    }

    const checkboxInfoGroup: TemplateInfoCheck[] = downloadList.map(
      (temp: TemplateInfo) => {
        return {
          ...temp,
          checked:
            templateId === ALL_TEMPLATE_ID
              ? true
              : temp.templateId === templateId,
        }
      }
    )

    const handleCancel = () => {
      setIsShow(false)
    }

    const handleConfirm = async () => {
      const params: DownloadActListParams = {
        queryActListReq: {
          ...filters,
          bizLine: getBizLine() || BizLineEnum.ShanGou,
        },
        downloadType,
        downloadTemplateIdList: checkboxInfoGroup
          .filter((temp: TemplateInfoCheck) => temp.checked)
          .map((temp: TemplateInfoCheck) => temp.templateId),
      }
      const res = await downloadActList(params)
      if (res.success) {
        message.success(res.msg)
      } else {
        message.error(res.msg)
        if (res.code === NONE_TEMPLATE_DOWNLOAD_CODE) {
          toastNoneTemplate()
        }
        setIsShow(false)
      }
    }

    console.log('isShow:', isShow)
    return (
      <Modal
        title={<span style={{ fontWeight: 700 }}>请确认要下载的促销类型</span>}
        style={{ width: 600 }}
        open={isShow}
        onCancel={handleCancel}
        onOk={handleConfirm}
      >
        <div className="activity-download-list-modal">
          <div className="modal_des">{des}</div>
          <div className="modal_checkbox_gruop">
            {checkboxInfoGroup.map(
              (checkboxInfo: TemplateInfoCheck, index: number) => (
                <div
                  key={'checkboxInfo' + index}
                  className="modal_checkbox_item"
                >
                  <Checkbox checked={checkboxInfo.checked} disabled={true} />
                  {checkboxInfo.templateName}
                </div>
              )
            )}
          </div>
          <div className="modal_tip">（暂不支持其他促销类型）</div>
        </div>
      </Modal>
    )
  }
)
