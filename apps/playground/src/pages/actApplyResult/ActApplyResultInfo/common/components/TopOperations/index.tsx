/** 报名结果表格上方操作栏 */

import './index.less'
import React, { useMemo } from 'react'

import {
  ListDismiss,
  ListDismissCustomHandler,
  ListDismissProps,
} from '../../operations/ListDismiss'
import { ListApprove, ListApproveProps } from '../../operations/ListApprove'
import { ListDownload, ListDownloadProps } from '../../operations/ListDownload'
import { BatchAction, SearchRuleId } from '../../constants'
import { ShowContent } from '../ShowContent'
import { PoiListDismissCountRes } from '@/common/apis/getPoiListDismissCount'
import { Tooltip } from 'antd'
import { BatchCancelCustomHandler } from '../../operations'
export type TopOperationsProps = {
  /** 老活动的逻辑 */
  batchDismiss?: React.ReactNode
  operations: BatchAction[]
  /** 过滤条件 */
  filterRules: Partial<Record<SearchRuleId, any>>
  onListApproveConfirm?: ListApproveProps['onConfirm']
  onListDownloadConfirm?: ListDownloadProps['onDownlaod']
  onListDismissConfirm?: ListDismissProps['onConfirm']
  listDismissCustomHandler?: ListDismissCustomHandler
  batchCancelCustomHandler?: BatchCancelCustomHandler<any>
  onListDismissCount?: (
    filterRules: Partial<Record<SearchRuleId, any>>
  ) => Promise<PoiListDismissCountRes | undefined>

  onListApproveCount?: (
    filterRules: Partial<Record<SearchRuleId, any>>
  ) => Promise<number | undefined>

  tips?: React.ReactNode
  disableListDismissWithoutFilter?: boolean
}

const ListDismissTooltip = ({ isDisabled, ...props }) => {
  const { children } = props
  if (!isDisabled) return <>{children}</>

  return (
    <div className="dismiss-button-tooltip-box">
      <Tooltip
        placement="top"
        title={'请至少在筛选框输入一个条件且点击查询后，才可操作。'}
        arrow={true}
      >
        <span className="dismiss-button-tooltip-target"></span>
      </Tooltip>
      {children}
    </div>
  )
}

export function TopOperations(props: TopOperationsProps) {
  const {
    operations = [],
    filterRules,
    tips,
    batchDismiss,
    listDismissCustomHandler,
    onListApproveConfirm,
    onListDismissConfirm,
    onListDownloadConfirm,
    onListDismissCount,
    onListApproveCount,
    disableListDismissWithoutFilter = false,
  } = props

  const showOperations = (curOpt: BatchAction) => {
    return operations.includes(curOpt)
  }

  const isListDismissDisabled = useMemo(() => {
    if (
      !filterRules ||
      Object.keys(filterRules).every((item) =>
        Array.isArray(filterRules[item])
          ? filterRules[item].length === 0
          : !filterRules[item]
      )
    ) {
      return true
    }
    return false
  }, [filterRules])

  return (
    <div className="result-action-btns mb-2">
      <div className="result-action">
        <div className="flex flex-row items-center mr-2">
          {tips ? <span className="result-action-tips">操作说明</span> : <></>}
          {tips}
        </div>
        {batchDismiss}
        <ShowContent whenShow={[showOperations(BatchAction.ListDismiss)]}>
          {disableListDismissWithoutFilter ? (
            <ListDismiss
              getCount={onListDismissCount}
              filterRules={filterRules}
              listDismissCustomHandler={listDismissCustomHandler}
              onConfirm={onListDismissConfirm}
              isDisabled={false}
            />
          ) : (
            <ListDismissTooltip isDisabled={isListDismissDisabled}>
              <ListDismiss
                getCount={onListDismissCount}
                filterRules={filterRules}
                listDismissCustomHandler={listDismissCustomHandler}
                onConfirm={onListDismissConfirm}
                isDisabled={isListDismissDisabled}
              />
            </ListDismissTooltip>
          )}
        </ShowContent>
        <ShowContent whenShow={[showOperations(BatchAction.ListApprove)]}>
          <ListApprove
            getCount={onListApproveCount}
            filterRules={filterRules}
            onConfirm={onListApproveConfirm}
          />
        </ShowContent>
        <ShowContent whenShow={[showOperations(BatchAction.ListDownload)]}>
          <ListDownload
            filterRules={filterRules}
            onDownlaod={onListDownloadConfirm}
          />
        </ShowContent>
      </div>
    </div>
  )
}
