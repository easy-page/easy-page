import {
  BaseContainer,
  ConfigType,
  ConfigTypeText,
  IsConfigTemplate,
  OperationType,
  ZsptSegmented,
} from '@/common'
import { Input, List, Modal } from 'antd'
import { observer } from 'mobx-react'
import { useEffect, useMemo, useState } from 'react'
import { FirstTitle } from './components/FirstTitle'
import { ConfigItemCard } from './components/ConfigItem'
import { toCrudConfig } from '@/admin/common/routes'
import {
  configItemsModel,
  loadConfigItems,
} from '@/admin/common/models/configItems'
import { ConfigItem } from '@/admin/common/apis/getConfigItems'
import { debounce } from 'lodash'

export type CreateConfigProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

const EMPTY_TEMPLATE_ID = -1

export const CreateConfig = observer(({ open, setOpen }: CreateConfigProps) => {
  const [id, setId] = useState<number | null>(EMPTY_TEMPLATE_ID)
  const { data: oriConfigs, error, loading } = configItemsModel.getList()
  useEffect(() => {
    loadConfigItems()
  }, [])
  const handleClose = () => {
    setId(EMPTY_TEMPLATE_ID)
    setOpen(false)
  }

  const [type, setType] = useState(ConfigType.Act)

  const isAct = type === ConfigType.Act

  const [search, setSearch] = useState('')

  const configs = useMemo(() => {
    return oriConfigs.filter((e) => {
      return e.name.includes(search)
    })
  }, [search, oriConfigs])

  const { configItems, templates } = useMemo(() => {
    const planTemplatesConfigs: ConfigItem[] = []

    const planConfigs: ConfigItem[] = []
    const actConfigs: ConfigItem[] = []
    const actTemplatesConfigs: ConfigItem[] = []
    ;(configs || []).forEach((each) => {
      const isPlan = each.type === ConfigType.Plan
      if (isPlan) {
        if (each.isTemplate === IsConfigTemplate.Yes) {
          planTemplatesConfigs.push(each)
        } else {
          planConfigs.push(each)
        }
      }
      if (!isPlan) {
        if (each.isTemplate === IsConfigTemplate.Yes) {
          actTemplatesConfigs.push(each)
        } else {
          actConfigs.push(each)
        }
      }
    })
    const curTemplates = isAct ? actTemplatesConfigs : planTemplatesConfigs
    return {
      configItems: isAct ? actConfigs : planConfigs,
      templates: [
        { id: EMPTY_TEMPLATE_ID, name: '空模板' } as ConfigItem,
        ...curTemplates,
      ],
    }
  }, [configs, isAct])

  const debounceSearch = debounce(setSearch, 100)
  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose()
      }}
      onCancel={() => {
        handleClose()
      }}
      onOk={() => {
        if (id === EMPTY_TEMPLATE_ID) {
          toCrudConfig(
            {
              operationType: OperationType.CREATE,
              type,
            },
            '_blank'
          )
        } else {
          toCrudConfig(
            {
              id: id ? `${id}` : '',
              operationType: id ? OperationType.COPY : OperationType.CREATE,
            },
            '_blank'
          )
        }
        handleClose()
      }}
      okButtonProps={{
        disabled: id === null,
      }}
      width={'70%'}
      height={700}
      destroyOnClose
    >
      <BaseContainer isPanel error={error} loading={loading}>
        <div className="flex flex-row justify-between pr-6">
          <ZsptSegmented
            defaultId={ConfigType.Act}
            hasTab={() => true}
            onChange={(val) => {
              setType(val)
            }}
            options={Object.keys(ConfigTypeText).map((e) => ({
              label: ConfigTypeText[e],
              value: Number(e),
            }))}
          />
          <Input
            className="w-[200px]"
            placeholder="输入名称搜索"
            defaultValue={search}
            onChange={(e) => {
              debounceSearch(e.target.value)
            }}
          />
        </div>

        <FirstTitle title="模版">
          <List
            dataSource={templates}
            grid={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
            renderItem={(e) => (
              <List.Item>
                <ConfigItemCard
                  onClick={() => {
                    setId(e.id)
                  }}
                  choosed={id === e.id}
                  item={e}
                  key={e.id}
                ></ConfigItemCard>
              </List.Item>
            )}
          />
        </FirstTitle>
        <FirstTitle title={isAct ? '活动' : '方案'}>
          <List
            dataSource={configItems}
            grid={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
            renderItem={(e) => (
              <List.Item>
                <ConfigItemCard
                  onClick={() => {
                    setId(e.id)
                  }}
                  choosed={id === e.id}
                  item={e}
                  key={e.id}
                ></ConfigItemCard>
              </List.Item>
            )}
          />
        </FirstTitle>
      </BaseContainer>
    </Modal>
  )
})
