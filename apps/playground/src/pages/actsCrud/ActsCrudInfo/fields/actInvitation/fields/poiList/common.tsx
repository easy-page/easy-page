import { nodeUtil } from '@easy-page/antd-ui'
import { Button } from 'antd'
import { PoiListDialog } from './components'
import { get } from 'lodash'
import { useState } from 'react'
import { isEdit, isView } from '@/common'
import { CommonActCrudFormState } from '../../../interface'

export const poiList = () =>
  nodeUtil.createCustomField<number, CommonActCrudFormState>(
    'poiList',
    ' ',
    ({ value }) => {
      const [open, setOpen] = useState(false)
      return (
        <div>
          <Button
            onClick={() => {
              setOpen(true)
            }}
          >
            查看商家名单
          </Button>
          <PoiListDialog
            key="poi-list-dialog"
            open={open}
            setOpen={setOpen}
            actId={value}
          />
        </div>
      )
    },
    {
      when: {
        show() {
          console.log('poiListpoiList:', isEdit() || isView())
          return isEdit() || isView()
        },
      },
      preprocess({ defaultValues }) {
        return get(defaultValues, 'activity.id')
      },
      postprocess: () => {
        return {}
      },
    }
  )
