import { nodeUtil } from '@easy-page/antd-ui'
import { Button, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { ConfirmActList } from '../confirmActList'
import { SingleBatchConfirmAct } from '@/common/apis/getBatchConfirmActList'
import { confirmDialogManager, ConfirmSceneEnum } from '@/common/fields'
import { zsptConfirm } from '@/common/components/zspt/ZsptConfirm'
import { BatchConfirmFormState } from '../../interface'
import { batchConfirmActStatModel } from '@/common/models/btachConfirmActStat'
import { loadBatchConfirmPnListToModel } from '@/common'

export const chooseAct = nodeUtil.createCustomField<
  Array<SingleBatchConfirmAct>,
  BatchConfirmFormState,
  any
>(
  'chooseAct',
  ' ',
  ({ value, onChange, frameworkProps: { store, nodeInfo }, disabled }) => {
    // 当前表单所有配置
    const { pageState } = store
    const { data } = batchConfirmActStatModel.getData()
    const [modalVisible, setModalVisible] = useState(false)

    const [choosedRecords, setChoosedRecords] = useState<
      Array<SingleBatchConfirmAct>
    >([])

    useEffect(() => {
      setChoosedRecords(value || [])
    }, [modalVisible])

    const showModal = () => {
      setModalVisible(true)
    }

    const hideModal = () => {
      setModalVisible(false)
    }

    const handleOnchange = async (
      chooseRecords: Array<SingleBatchConfirmAct>
    ) => {
      if (!choosedRecords || chooseRecords.length === 0) {
        onChange(choosedRecords)
        return
      }

      let minStartTime = chooseRecords[0].activityStartTime

      chooseRecords.map((item) => {
        if (minStartTime > item.activityStartTime) {
          minStartTime = item.activityStartTime
        }
      })

      await loadBatchConfirmPnListToModel({ period: minStartTime })
      onChange(choosedRecords)
    }

    return (
      <>
        <Button type="primary" onClick={showModal}>
          点击勾选活动范围
        </Button>
        <Modal
          title="勾选活动范围"
          width={1400}
          open={modalVisible}
          onOk={() => {
            // 判断选中数据是否有更改

            const lastChoosedRecords = value || []
            const currentChoosedRecords = choosedRecords || []

            const hasChangedChoosedValue =
              (lastChoosedRecords.length !== 0 &&
                lastChoosedRecords.length !==
                  (currentChoosedRecords || []).length) ||
              !lastChoosedRecords.every((item) =>
                (choosedRecords || []).find((each) => each.id === item.id)
              )

            if (hasChangedChoosedValue) {
              pageState?.confirmDialogManager?.confirm({
                callback() {
                  handleOnchange(choosedRecords)
                  hideModal()
                },
                onConfirm() {
                  zsptConfirm({
                    height: 170,
                    title: '提示',
                    content:
                      '如您修改勾选提报活动范围，补贴分摊信息将清空，确认继续修改吗？',
                    okText: '继续修改',
                    onOk() {
                      handleOnchange(choosedRecords)
                      hideModal()
                    },
                  })
                },
                triggerField: nodeInfo.id,
                sence: ConfirmSceneEnum.BatchConfirmActChange,
              })
            } else {
              handleOnchange(choosedRecords)
              hideModal()
            }
          }}
          onCancel={hideModal}
          okText="确认"
          cancelText="取消"
          // rootClassName={'w-[1500px] h-[700px]'}
          className="w-[1500px] h-[630px]"
        >
          <ConfirmActList
            choosedRecords={choosedRecords}
            setChoosedRecords={setChoosedRecords}
          />
        </Modal>
      </>
    )
  },
  {
    effectedKeys: [''],
    // required: true,
    postprocess: ({ value }) => {
      return {
        actInfo: value.map((item) => ({
          actId: item.id,
          relBrandIds: item.relBrandIds,
        })),
      }
    },
    validate: ({ value }) => {
      if (!value || value.length === 0) {
        return { success: false, errorMsg: '请至少勾选 1 个提报活动' }
      }

      return { success: true }
    },
  },
  {
    formItem: {
      colon: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    },
  }
)
