import { preCheckPn } from '@/common/apis/preCheckPn'
import { FormItemProps } from '@easy-page/antd-ui'
import { useState, useEffect } from 'react'
import { BatchConfirmFormState } from '../../../../interface'

export const ChoosePnExtraText = ({
  value,
  frameworkProps: { store },
}: Omit<FormItemProps, 'customExtra'>) => {
  const [returnStr, setReturnStr] = useState('')

  useEffect(() => {
    const getExtraText = async () => {
      const { pageState } = store
      const { chooseAct } = pageState as BatchConfirmFormState

      if (
        !value.choosed ||
        !Array.isArray(chooseAct) ||
        chooseAct.length === 0
      ) {
        setReturnStr('')
        return
      }

      const res = await preCheckPn({
        pn: value.choosed,
        actIds: chooseAct.map((item) => item.id),
      })

      if (res.success) {
        if (res.data.isValid) {
          setReturnStr('')
        } else {
          setReturnStr(res.data.reason)
        }
      }
    }

    getExtraText()
  }, [value?.choosed, store.pageState.chooseAct, store])

  return <div className="text-[#ff4d4f]">{returnStr}</div>
}
