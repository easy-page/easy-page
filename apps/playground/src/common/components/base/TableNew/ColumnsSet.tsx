/* eslint-disable */
// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react'
import DropMenu from '@roo/roo/DropMenu'
import Tooltip from '@roo/roo/Tooltip'
import CheckBox from '@roo/roo/CheckBox'
import classNames from 'classnames'
import ReactDragListView from 'react-drag-listview'
import locale from '@roo/roo/locale'
import { SetConfig, SetData, Column } from './interface'
import {
  handleSortColumns,
  changeSort,
  getConfigByprops,
  getDeaultValue,
  compareWithColumns,
} from './util'

const IMG_MAP = {
  LIGHTSVG:
    'https://s3plus.sankuai.com/roo-prod/roo-sketch/customer/customer_light.svg',
  DOWNSVG:
    'https://s3plus.sankuai.com/roo-prod/roo-sketch/customer/customer_down.svg',
  UPSVG:
    'https://s3plus.sankuai.com/roo-prod/roo-sketch/customer/customer_up.svg',
  DREGSVG:
    'https://s3plus.sankuai.com/roo-prod/roo-sketch/customer/customer_dreg.svg',
  DEFAULTSVG:
    'https://s3plus.sankuai.com/roo-prod/roo-sketch/customer/customer_default.svg',
}

const CheckBoxGroup = CheckBox.Group

/**
 * @param columns - table的columns配置
 * @param onChange - 点击选中回调函数
 * @param setConfig - 配置项
 * @param popupContainer
 */
interface SettingProps<T> {
  onChange: (value: SetData[]) => void
  columns: Column<T>[]
  setConfig: SetConfig<T> | boolean
  popupContainer: HTMLElement | null
  prefixCls: string
}

interface DragProps {
  onDragEnd: (form: number, to: number) => void
  dragable: boolean
  children: any
  prefixCls: string
}

/* istanbul ignore next */
const DragTableView = (props: DragProps) => {
  const { onDragEnd, dragable, children, prefixCls } = props
  if (dragable) {
    return (
      <ReactDragListView
        nodeSelector="div"
        onDragEnd={onDragEnd}
        enableScroll={true}
        lineClassName={classNames(`${prefixCls}-drag-line`)}
      >
        {children}
      </ReactDragListView>
    )
  } else {
    return <>{children}</>
  }
}

function ColumnsSet<RecordType extends object = any>(
  props: SettingProps<RecordType>
) {
  const { onChange, columns, popupContainer, prefixCls } = props
  const {
    fixed,
    dragable,
    iconRender,
    hiddenLeft,
    hiddenRight,
    value,
    className,
  } = React.useMemo(() => {
    return getConfigByprops(props.setConfig) as SetConfig<RecordType>
  }, [props.setConfig, (props.setConfig as SetConfig<RecordType>).value])
  const wrapperClassNames = classNames(
    `${prefixCls}-setting-wrapper`,
    className
  )
  const { defaultValue, disabledValue } = useMemo(() => {
    return {
      defaultValue: columns?.map((item) => item?.dataIndex as string) || [],
      disabledValue:
        columns
          ?.filter((item) => item?.setDisabled)
          .map((item) => item?.dataIndex as string) || [],
    }
  }, [columns])
  const [toggleValues, setToggleValues] = useState<string[]>([])
  const [checkedAll, setCheckedAll] = useState<boolean>(true)
  const [visible, setVisible] = useState<boolean>(false)
  const [settingValue, setSettingValue] = React.useState<SetData[]>(
    getDeaultValue(columns)
  )

  /* istanbul ignore next */
  const stopPropagation = (event: any) => {
    if (event.nativeEvent && event.nativeEvent.stopImmediatePropagation) {
      event.nativeEvent.stopImmediatePropagation()
    }
  }

  useEffect(() => {
    initData(false)
  }, [value])

  useEffect(() => {
    initData(true)
  }, [columns])

  const initData = (status: boolean) => {
    let _value = value && value.length ? value : settingValue
    if (status) {
      _value = compareWithColumns(columns, _value)
    }
    const toggledList = _value
      .filter((item: SetData) => item.show)
      .map((item: SetData) => item.dataIndex)
    setSettingValue(_value)
    setToggleValues(toggledList)
    setCheckedAll(getCheckState(toggledList))
  }

  const getCheckState = (selectKey: string[]) => {
    const data = defaultValue
    const isEqual =
      selectKey.filter((item: string) => data.indexOf(item) === -1).length ===
        0 && selectKey.length === data.length
    return isEqual
  }

  const onToggleChange = (values: string[]) => {
    setToggleValues(values)
    setCheckedAll(getCheckState(values))
    const data = settingValue.map((item) => ({
      ...item,
      show: values.includes(item?.dataIndex),
    }))
    handleChangeValue(data)
  }

  const handleChangeAll = (e: any) => {
    setCheckedAll(e.target.checked)
    if (e.target.checked) {
      onToggleChange(defaultValue)
    } else {
      onToggleChange(disabledValue)
    }
  }

  const handleFixed = (itemColumn: any, fixed: string | boolean) => {
    if (itemColumn.setDisabled) return
    const data = settingValue.map((item) => {
      if (item.dataIndex === itemColumn.dataIndex) {
        return {
          ...item,
          fixed: fixed,
        }
      }
      return item
    })
    handleChangeValue(data)
  }

  const handleChangeValue = (data: SetData[]) => {
    const value = handleSortColumns(data)
    setSettingValue(value)
    onChange(value)
  }

  const handleReset = () => {
    setToggleValues(defaultValue)
    setCheckedAll(getCheckState(defaultValue))
    handleChangeValue(getDeaultValue(columns))
  }

  /* istanbul ignore next */
  const handleDragEnd = (fromIndex: number, toIndex: number) => {
    if (!dragable) return
    const fromItem = columns.find(
      (item) => item.dataIndex === settingValue[fromIndex].dataIndex
    )
    const toItem = columns.find(
      (item) => item.dataIndex === settingValue[toIndex].dataIndex
    )
    if (!(fromItem && toItem) || (fromItem && fromItem?.setDisabled)) return
    const data = changeSort({ data: settingValue, fromIndex, toIndex })
    handleChangeValue(data)
  }

  const renderItem = (data: any, key: number, showBorder: boolean) => {
    const item: Column<RecordType> = (columns.find(
      (i) => i.dataIndex === data.dataIndex
    ) || {}) as any
    return (
      <div
        key={item?.dataIndex as string}
        className={classNames(`${prefixCls}-setting-item`, {
          [`${prefixCls}-item-border`]: key === 0 && showBorder,
          [`${prefixCls}-item-diabled`]: item.setDisabled && dragable,
        })}
      >
        {!item.setDisabled && dragable && (
          <img
            src={IMG_MAP.DREGSVG}
            style={{ width: 8, height: 8, marginRight: 8 }}
          />
        )}
        <Tooltip
          disabled={
            !!(
              item.title &&
              (item.title as string).length <= 8 &&
              !item?.setDisabled
            )
          }
          content={item?.setDisabled ? '固定列不可操作' : item.title}
        >
          <CheckBox
            value={item?.dataIndex as string}
            disabled={!!item?.setDisabled}
          >
            {item.title}
          </CheckBox>
        </Tooltip>
        {
          // 列选择展示时才可显示固定列操作
          data.show && fixed && (
            <span
              className={classNames(`${prefixCls}-fixed-opt`, {
                [`${prefixCls}-fixed-disabled`]: item?.setDisabled,
                [`${prefixCls}-show-opt`]: data.fixed,
                [`${prefixCls}-un-drage`]: !dragable,
              })}
            >
              {data.fixed && (
                <span onClick={() => handleFixed(item, false)}>
                  {locale.lng('Table.fixedCancel')}
                </span>
              )}
              {!data.fixed && typeof fixed === 'boolean' && (
                <>
                  <Tooltip
                    content={locale.lng('Table.fixedLeft')}
                    placement="top"
                    enterable={false}
                  >
                    <img
                      src={IMG_MAP.UPSVG}
                      style={{ width: 12, height: 12 }}
                      onClick={() => handleFixed(item, 'left')}
                    />
                  </Tooltip>
                  <Tooltip
                    content={locale.lng('Table.fixedRight')}
                    placement="top"
                    enterable={false}
                  >
                    <img
                      src={IMG_MAP.DOWNSVG}
                      style={{ width: 12, height: 12 }}
                      onClick={() => handleFixed(item, 'right')}
                    />
                  </Tooltip>
                </>
              )}
              {!data.fixed && typeof fixed !== 'boolean' && (
                <span onClick={() => handleFixed(item, fixed)}>
                  {locale.lng('Table.fixedColumn')}
                </span>
              )}
            </span>
          )
        }
      </div>
    )
  }

  const renderCheckbox = () => {
    const left = settingValue?.filter(
      (s) => s.fixed === 'left' || (typeof s.fixed === 'boolean' && s.fixed)
    )
    const main = settingValue?.filter((s) => !s.fixed)
    const right = settingValue?.filter((s) => s.fixed === 'right')
    return (
      <div
        className={classNames(`${prefixCls}-setting-menu`)}
        onClick={stopPropagation}
      >
        <div className={classNames(`${prefixCls}-menu-header`)}>
          <CheckBox
            checked={checkedAll}
            onChange={handleChangeAll}
            indeterminate={
              !!toggleValues.length && !getCheckState(toggleValues)
            }
          >
            {locale.lng('Table.columnShow')}
          </CheckBox>
          <span
            className={classNames(`${prefixCls}-menu-reset`)}
            onClick={handleReset}
          >
            {locale.lng('Table.reset')}
          </span>
        </div>
        <CheckBoxGroup
          defaultValue={toggleValues}
          value={toggleValues}
          onChange={onToggleChange as any}
          className={classNames(`${prefixCls}-columns-menu`)}
        >
          <DragTableView
            onDragEnd={handleDragEnd}
            dragable={dragable}
            prefixCls={prefixCls}
          >
            {!hiddenLeft &&
              left.map((item, key) => renderItem(item, key, false))}
            {main.map((item, key) => renderItem(item, key, !!left.length))}
            {!hiddenRight &&
              right.map((item, key) => renderItem(item, key, !!right.length))}
          </DragTableView>
        </CheckBoxGroup>
      </div>
    )
  }

  const menus = renderCheckbox()

  return (
    <div className={wrapperClassNames}>
      <DropMenu
        onClickOutside={() => setVisible(false)}
        visible={visible}
        menuComponent={menus}
        trigger="click"
        flip={'flip'}
        popupContainer={popupContainer || undefined}
        popupClassName={classNames(`${prefixCls}-toggle-menu-wrapper`)}
      >
        <div
          className={classNames(`${prefixCls}-toggle-btn`)}
          onClick={() => setVisible(!visible)}
        >
          <Tooltip content={locale.lng('Table.columnSet')} placement="top">
            {iconRender ? (
              iconRender()
            ) : (
              <img
                src={visible ? IMG_MAP.LIGHTSVG : IMG_MAP.DEFAULTSVG}
                style={{ width: 16, height: 16 }}
              />
            )}
          </Tooltip>
        </div>
      </DropMenu>
    </div>
  )
}

export default React.memo(ColumnsSet)
