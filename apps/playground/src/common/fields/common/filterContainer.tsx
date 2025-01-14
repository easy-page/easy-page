import { FormUtil, nodeUtil } from '@easy-page/antd-ui'
import { FilterContainer, FilterContainerProps } from '../../components'

/**
 * - 方案列表的过滤条件
 * - 每个列表的过滤条件不一样，难以通过 dom 判断个数，因此最佳方案是自己计算一下
 * - 下面是将：curFilterCount 挂在到当前节点上
 *  */
export const filterContainer = ({
  id,
  onClickReset,
  defaultValues,
  disableDefaultReset,
  ...rest
}: {
  id: string
  defaultValues: Record<string, any>
  onClickReset?: (formUtil: FormUtil<Record<string, any>>) => void | null
  disableDefaultReset?: boolean
} & Omit<FilterContainerProps, 'children' | 'onClickRest'>) =>
  nodeUtil.createContainer<any, any, boolean>(
    id,
    ({ children, frameworkProps: { getFormUtil } }) => {
      return (
        <FilterContainer
          getFormUtil={getFormUtil}
          onClickReset={() => {
            const formUtil = getFormUtil?.()
            if (!disableDefaultReset) {
              formUtil?.setFieldsValue(defaultValues)
            }

            onClickReset?.(formUtil)
          }}
          {...rest}
          children={children}
        ></FilterContainer>
      )
    }
  )
