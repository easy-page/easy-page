import {
  ActTypeEnum,
  ChargeFlowTypeEnum,
  ErrorLocation,
  PoiTypeEnum,
  ProductSelection,
} from '@/common'
import { CustomTd } from './CustomTd'
import { CustomEllipsis } from './CustomEllipsis'
import { Column } from '@/common/components/base/TableNew'
import { ImageViewer } from '@roo/roo'

const RISK_PRICE = 10 // 10 元即为风险
export const SUBSIDY_RISK_TIPS = '美团补贴金额较大，请认真核对'

const judgeRisk = (
  data: ProductSelection,
  subsidyType: Array<'directSubsidy' | 'agentSubsidy'>
) => {
  let hasRisk = false
  subsidyType.forEach((e) => {
    const [, price] = (data[e].poiMtCharge || '').replace('，', ',').split(',')
    if (price && Number(price) >= RISK_PRICE) {
      hasRisk = true
    }
  })
  return hasRisk
}

export const showRiskTips = (options: {
  isAct: boolean
  isPreview: boolean
  subsidyType: Array<'directSubsidy' | 'agentSubsidy'>
  productSelections: ProductSelection[]
  uploadError?: string[]
}) => {
  const {
    isAct,
    isPreview,
    productSelections,
    subsidyType,
    uploadError = [],
  } = options

  // isPreview 是表示是否为预览悬浮弹窗，只有创建页显示，否则不现实
  if (!isAct || isPreview || uploadError?.length > 0) {
    return false
  }
  let hasError = false
  let hasRisk = false
  for (let i = 0; i < productSelections.length; i++) {
    if ((productSelections[i].errors || []).length > 0) {
      hasError = true
    }
    if (judgeRisk(productSelections[i], subsidyType)) {
      hasRisk = true
    }
  }
  /** 没有文件错误，没有类型错误，并且存在风险，才提示 */
  return !hasError && hasRisk
}

export const productSelectionColumns: (options: {
  /** 判断是否是活动，如果是活动的话，列会更多一些 */
  isAct: boolean
  actType: string
  uploadError: string[]
  isPreview: boolean
  errorLocation?: ErrorLocation
  poiType?: PoiTypeEnum
  /** 补贴类型 */
  chargeFlowType?: ChargeFlowTypeEnum[]
  /** 总体判断是否展示异常信息：没有文件错误，没有表格内容错误 */
  showSubsidyRiskTips: boolean
  activeTab: number
  tabIndex: number
}) => Column<ProductSelection>[] = ({
  isAct,
  actType,
  isPreview,
  errorLocation,
  showSubsidyRiskTips,
  uploadError,
  poiType,
  chargeFlowType,
  activeTab,
  tabIndex,
}) => {
  const getTitle = (options: {
    title: string
    className: string
    containerClassName: string
    text: string
  }) => {
    const { title, className, text, containerClassName } = options
    if (!isPreview) {
      return title
    }
    return (
      <div className={containerClassName}>
        <div className="table-header-title">{title}</div>
        <div className={className}>{text}</div>
      </div>
    )
  }

  const getColumnsByConfig = (
    config: string[],
    columnsConfig: Record<string, Column<ProductSelection>>
  ): Array<Column<ProductSelection>> => {
    const returnResArr: Array<Column<ProductSelection>> = []
    Object.keys(columnsConfig).forEach((columnKey) => {
      if (config.includes(columnKey)) {
        returnResArr.push(columnsConfig[columnKey])
      }
    })
    return returnResArr
  }

  const templateRenderColumnsConfig: Record<
    string,
    {
      baseColumns: string[]
      qualifyColumns: string[]
      packageColumns: string[]
      subsidyColumns: string[]
      subsidyType: string
    }
  > = {
    [ActTypeEnum.COLLECT_STORE]: {
      baseColumns: ['lineNumber', 'subActivityName', 'collectStoreBoss'],
      qualifyColumns: [
        'jhdZpbzTag',
        'productUpc',
        'productNameKeyword',
        'productNameSensitiveWord',
        'productWeight',
        'productCategory',
        'productPrice',
      ],
      packageColumns: [],
      subsidyColumns: ['supplyPriceRange', 'enteredSkuCountMax'],
      subsidyType: 'fixed',
    },
  }

  const baseColumnsConfig: Record<string, Column<ProductSelection>> = {
    lineNumber: {
      title: '序号',
      key: 'lineNumber',
      width: 80,
      dataIndex: 'lineNumber',
      className: 'lineNumber',
      fixed: 'left',
      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="lineNumber"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={<>{text}</>}
          />
        )
      },
    },
    subActivityName: {
      title: getTitle({
        title: '子活动名称',
        containerClassName: 'table-header-left',
        className: 'table-header-title-red',
        text: '本列不可修改',
      }),
      key: 'subActivityName',
      fixed: 'left',
      width: 150,
      dataIndex: 'subActivityName',
      className: 'subActivityName',
      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="subActivityName"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              <CustomEllipsis tabIndex={tabIndex} content={text} line={2} />
            }
          />
        )
      },
    },
    collectStoreBoss: {
      title: getTitle({
        title: '关联集合店总部商品 skuid',
        containerClassName: 'table-header-left',
        className: 'table-header-title-red',
        text: '本列不可修改',
      }),
      key: 'skuId',
      fixed: 'left',
      width: 150,
      dataIndex: 'skuId',
      className: 'skuId',
      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="skuId"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              <CustomEllipsis tabIndex={tabIndex} content={text} line={2} />
            }
          />
        )
      },
    },
  }

  const qualifyColumnsConfig: Record<string, Column<ProductSelection>> = {
    jhdZpbzTag: {
      title: getTitle({
        title: '商品正品保障',
        containerClassName: 'table-header-left',
        className: 'table-header-title-red',
        text: '本列不可修改',
      }),
      key: 'jhdZpbzTag',
      width: 150,
      dataIndex: 'jhdZpbzTag',
      className: 'jhdZpbzTag',
      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="jhdZpbzTag"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              <CustomEllipsis tabIndex={tabIndex} content={text} line={2} />
            }
          />
        )
      },
    },
    productUpc: {
      title: getTitle({
        title: '商品UPC',
        containerClassName: 'table-header-left',
        className: 'table-header-title-red',
        text: '本列不可修改',
      }),
      key: 'productUpc',
      width: 150,
      dataIndex: 'productUpc',
      className: 'productUpc',
      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="productUpc"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              <CustomEllipsis tabIndex={tabIndex} content={text} line={2} />
            }
          />
        )
      },
    },
    productNameKeyword: {
      title: getTitle({
        title: '商品名称关键字',
        containerClassName: 'table-header-left',
        className: 'table-header-title-red',
        text: '本列不可修改',
      }),
      key: 'productNameKeyword',
      width: 150,
      className: 'productNameKeyword',
      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="productNameKeyword"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              <CustomEllipsis tabIndex={tabIndex} content={text} line={2} />
            }
          />
        )
      },
      dataIndex: 'productNameKeyword',
    },
    productNameSensitiveWord: {
      title: getTitle({
        title: '商品名称敏感词',
        containerClassName: 'table-header-left',
        className: 'table-header-title-red',
        text: '本列不可修改',
      }),
      key: 'productNameSensitiveWord',
      width: 150,
      className: 'productNameSensitiveWord',
      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="productNameSensitiveWord"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              <CustomEllipsis tabIndex={tabIndex} content={text} line={2} />
            }
          />
        )
      },
      dataIndex: 'productNameSensitiveWord',
    },
    productWeight: {
      title: getTitle({
        title: '商品重量（g）',
        containerClassName: 'table-header-left',
        className: 'table-header-title-red',
        text: '本列不可修改',
      }),
      key: 'productWeight',
      width: 150,
      className: 'productWeight',
      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="productWeight"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              <CustomEllipsis tabIndex={tabIndex} content={text} line={1} />
            }
          />
        )
      },
      dataIndex: 'productWeight',
    },
    productCategory: {
      title: getTitle({
        title: '商品品类',
        containerClassName: 'table-header-left',
        className: 'table-header-title-red',
        text: '本列不可修改',
      }),
      key: 'productCategory',
      width: 150,
      className: 'productCategory',
      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="productCategory"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              <CustomEllipsis tabIndex={tabIndex} content={text} line={2} />
            }
          />
        )
      },
      dataIndex: 'productCategory',
    },
    productOriginPrice: {
      title: getTitle({
        title: '原价最大值（元）',
        containerClassName: 'table-header-left',
        className: 'table-header-title-red',
        text: '本列不可修改',
      }),
      key: 'productOriginPrice',
      className: 'productOriginPrice',
      width: 150,
      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="productOriginPrice"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              <CustomEllipsis tabIndex={tabIndex} content={text} line={1} />
            }
          />
        )
      },
      dataIndex: 'productOriginPrice',
    },
    productPriceMax: {
      title: getTitle({
        title: '原价最大值（元）',
        containerClassName: 'table-header-left',
        className: 'table-header-title-red',
        text: '本列不可修改',
      }),
      key: 'productOriginPrice',
      className: 'productOriginPrice',
      width: 150,
      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="productOriginPrice"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              <CustomEllipsis tabIndex={tabIndex} content={text} line={1} />
            }
          />
        )
      },
      dataIndex: 'productOriginPrice',
    },
    productPrice: {
      title: getTitle({
        title: '商品原价（元）',
        containerClassName: 'table-header-left',
        className: 'table-header-title-red',
        text: '本列不可修改',
      }),
      key: 'productOriginPrice',
      className: 'productOriginPrice',
      width: 150,
      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="productOriginPrice"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              <CustomEllipsis tabIndex={tabIndex} content={text} line={1} />
            }
          />
        )
      },
      dataIndex: 'productOriginPrice',
    },
  }

  const packageColumnsConfig: Record<string, Column<ProductSelection>> = {
    combineProductName: {
      title: getTitle({
        title: '组包后商品名称',
        containerClassName: 'table-header-left',
        className: 'table-header-title-red',
        text: '本列不可修改',
      }),
      key: 'combineProductName',
      className: 'combineProductName',
      width: 150,
      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="combineProductName"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              <CustomEllipsis tabIndex={tabIndex} content={text} line={2} />
            }
          />
        )
      },
      dataIndex: 'combineProductName',
    },
    combineProductImgUrl: {
      title: getTitle({
        title: '组包后商品图片链接',
        containerClassName: 'table-header-left',
        className: 'table-header-title-red',
        text: '本列不可修改',
      }),

      key: 'combineProductImgUrl',
      className: 'combineProductImgUrl',
      dataIndex: 'combineProductImgUrl',
      width: 150,

      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="combineProductImgUrl"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              text ? (
                <ImageViewer width={80} height={80} images={[{ src: text }]} />
              ) : (
                <div />
              )
            }
          />
        )
      },
    },
    combineProductSubItemAmount: {
      title: getTitle({
        title: '子商品件数',
        containerClassName: 'table-header-left',
        className: 'table-header-title-red',
        text: '本列不可修改',
      }),

      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="combineProductSubItemAmount"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              <CustomEllipsis tabIndex={tabIndex} content={text} line={1} />
            }
          />
        )
      },
      key: 'combineProductSubItemAmount',
      className: 'combineProductSubItemAmount',
      width: 150,
      dataIndex: 'combineProductSubItemAmount',
    },
  }

  const subsidyColumnsConfig: Record<string, Column<ProductSelection>> = {
    priceMax: {
      title: getTitle({
        title: '优惠后价格最大值（元）',
        containerClassName: 'table-header-left',
        className: 'table-header-title-red',
        text: '本列不可修改',
      }),
      key: 'priceMax',
      className: 'priceMax',
      width: 150,
      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="priceMax"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              <CustomEllipsis tabIndex={tabIndex} content={text} line={1} />
            }
          />
        )
      },
      dataIndex: 'priceMax',
    },
    orderLimitRange: {
      title: getTitle({
        title: '每单限购份数区间',
        containerClassName: 'table-header-left',
        className: 'table-header-title-red',
        text: '本列不可修改',
      }),
      key: 'orderLimitRange',
      className: 'orderLimitRange',
      width: 150,
      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="orderLimitRange"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              <CustomEllipsis tabIndex={tabIndex} content={text} line={1} />
            }
          />
        )
      },
      dataIndex: 'orderLimitRange',
    },
    dayStockMin: {
      title: getTitle({
        title: '每日活动库存最小值',
        containerClassName: 'table-header-left',
        className: 'table-header-title-green',
        text: '本列可改大',
      }),

      className: 'dayStockMin',
      key: 'dayStockMin',
      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="dayStockMin"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              <CustomEllipsis tabIndex={tabIndex} content={text} line={1} />
            }
          />
        )
      },
      width: 150,
      dataIndex: 'dayStockMin',
    },
    supplyPriceRange: {
      title: getTitle({
        title: '商品供货价（元）',
        containerClassName: 'table-header-left',
        className: 'table-header-title-green',
        text: '本列需补充',
      }),
      key: 'supplyPriceRange',
      width: 150,
      dataIndex: 'supplyPriceRange',
      className: 'supplyPriceRange',

      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="supplyPriceRange"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              <CustomEllipsis tabIndex={tabIndex} content={text} line={1} />
            }
          />
        )
      },
    },
    enteredSkuCountMax: {
      title: getTitle({
        title: '单门店最多报名商品数（件）',
        containerClassName: 'table-header-left',
        className: 'table-header-title-green',
        text: '本列需补充',
      }),
      key: 'enteredSkuCountMax',
      width: 150,
      dataIndex: 'enteredSkuCountMax',
      className: 'enteredSkuCountMax',

      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="enteredSkuCountMax"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              <CustomEllipsis tabIndex={tabIndex} content={text} line={1} />
            }
          />
        )
      },
    },
    targetUserType: {
      title: getTitle({
        title: '目标人群',
        containerClassName: 'table-header-left',
        className: 'table-header-title-green',
        text: '本列需补充',
      }),

      className: 'targetUserType',
      key: 'targetUserType',
      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="targetUserType"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              <CustomEllipsis tabIndex={tabIndex} content={text} line={1} />
            }
          />
        )
      },
      width: 150,
      dataIndex: 'targetUserType',
    },
    'directSubsidy.poiMtCharge1': {
      title: getTitle({
        title: '直营门店-补贴承担1-神价',
        containerClassName: 'table-header-left',
        className: 'table-header-title-green',
        text: '本列可改小',
      }),
      key: 'directSubsidy.poiMtCharge1',
      width: 150,
      dataIndex: ['directSubsidy', 'poiMtCharge1'],
      className: 'directSubsidy-poiMtCharge1',
      render(text, record, index) {
        console.log('record:', text, record)
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="directSubsidy.poiMtCharge1"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              <CustomEllipsis tabIndex={tabIndex} content={text} line={1} />
            }
          />
        )
      },
    },
    'agentSubsidy.poiMtCharge1': {
      title: getTitle({
        title: '代理门店-补贴承担1-神价',
        containerClassName: 'table-header-left',
        className: 'table-header-title-green',
        text: '本列可改小',
      }),
      key: 'agentSubsidy.poiMtCharge1',
      className: 'agentSubsidy-poiMtCharge1',
      width: 150,
      render(text, record, index) {
        return (
          <CustomTd
            tabIndex={tabIndex}
            activeTab={activeTab}
            dataIndex="agentSubsidy.poiMtCharge1"
            record={record}
            index={index}
            errorLocation={errorLocation}
            pageIdx={record.pageIdx!}
            info={
              <CustomEllipsis tabIndex={tabIndex} content={text} line={1} />
            }
          />
        )
      },
      dataIndex: ['agentSubsidy', 'poiMtCharge1'],
    },
  }

  const getColumnConfigByType = (): {
    baseColumns: string[]
    qualifyColumns: string[]
    packageColumns: string[]
    subsidyColumns: string[]
    subsidyType: string
  } => {
    if (isAct) {
      return templateRenderColumnsConfig[actType]
    } else {
      return templateRenderColumnsConfig['plan']
    }
  }

  const columnConfig = getColumnConfigByType()
  const {
    baseColumns,
    qualifyColumns,
    packageColumns,
    subsidyColumns,
    subsidyType,
  } = columnConfig

  /**
   * 直营补贴列
   * - 补贴类型中，未选择直营门店美补时，下载模板中，出现这些列，但这些列不校验，不在预览中回显
   * - 门店类型中，选择代理门店时，这些列都不校验，不在预览中回显
   *  */
  const meituanSubsidyColumns: Column<ProductSelection>[] =
    (poiType === PoiTypeEnum.Direct &&
      chargeFlowType?.includes(ChargeFlowTypeEnum.DirectMtCharge)) ||
    isPreview
      ? [
          {
            title: '直营门店补贴规则',
            key: 'directSubsidy',
            dataIndex: 'directSubsidy',

            children: [
              {
                title: getTitle({
                  title: '美团总补贴-按金额（元）',
                  containerClassName: 'table-header-left',
                  className: 'table-header-title-green',
                  text: '本列可补充',
                }),
                key: 'directSubsidy.mtChargeAmount',
                className: 'directSubsidy-mtChargeAmount',
                width: 150,

                render(text, record, index) {
                  return (
                    <CustomTd
                      tabIndex={tabIndex}
                      activeTab={activeTab}
                      dataIndex="directSubsidy.mtChargeAmount"
                      record={record}
                      index={index}
                      errorLocation={errorLocation}
                      pageIdx={record.pageIdx!}
                      info={
                        <CustomEllipsis
                          tabIndex={tabIndex}
                          content={text}
                          line={1}
                        />
                      }
                    />
                  )
                },
                dataIndex: ['directSubsidy', 'mtChargeAmount'],
              },
              {
                title: getTitle({
                  title: '美补承担组织-PN号',
                  containerClassName: 'table-header-left',
                  className: 'table-header-title-green',
                  text: '本列可补充',
                }),
                key: 'directSubsidy.chargePn',
                className: 'directSubsidy-chargePn',
                width: 200,

                render(text, record, index) {
                  return (
                    <CustomTd
                      tabIndex={tabIndex}
                      activeTab={activeTab}
                      dataIndex="directSubsidy.chargePn"
                      record={record}
                      index={index}
                      errorLocation={errorLocation}
                      pageIdx={record.pageIdx!}
                      info={
                        <CustomEllipsis
                          tabIndex={tabIndex}
                          content={text}
                          line={1}
                        />
                      }
                    />
                  )
                },
                dataIndex: ['directSubsidy', 'chargePn'],
              },
            ],
          },
        ]
      : []

  /** 代理补贴列 */
  const hasAgentCharge =
    chargeFlowType?.includes(ChargeFlowTypeEnum.AgentMtCharge) || isPreview

  const agentSubsidyColumns: Column<ProductSelection>[] =
    poiType === PoiTypeEnum.Agent || isPreview
      ? [
          {
            title: '代理门店补贴规则',
            key: 'agentSubsidy',
            dataIndex: 'agentSubsidy',
            children: [
              ...(hasAgentCharge
                ? ([
                    subsidyType === 'percent'
                      ? {
                          title: getTitle({
                            title: '美团补贴-按比例（元）',
                            containerClassName: 'table-header-left',
                            className: 'table-header-title-green',
                            text: '本列可补充',
                          }),
                          key: 'agentSubsidy.poiMtCharge',
                          className: 'agentSubsidy-poiMtCharge',
                          width: 200,

                          render(text, record, index) {
                            const showRiskTipsInfo = showRiskTips({
                              isAct,
                              isPreview,
                              uploadError,
                              productSelections: [record],
                              subsidyType: ['agentSubsidy'],
                            })
                            return (
                              <CustomTd
                                tabIndex={tabIndex}
                                activeTab={activeTab}
                                dataIndex="agentSubsidy.poiMtCharge"
                                record={record}
                                index={index}
                                errorLocation={errorLocation}
                                pageIdx={record.pageIdx!}
                                info={
                                  <>
                                    <div
                                      dangerouslySetInnerHTML={{ __html: text }}
                                    />
                                    {showRiskTipsInfo && showSubsidyRiskTips ? (
                                      <div className="subsidy-td-risk-tips">
                                        {SUBSIDY_RISK_TIPS}
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                }
                              />
                            )
                          },
                          dataIndex: ['agentSubsidy', 'poiMtCharge'],
                        }
                      : {
                          title: getTitle({
                            title: '美团补贴-按金额（元）',
                            containerClassName: 'table-header-left',
                            className: 'table-header-title-green',
                            text: '本列可补充',
                          }),
                          key: 'agentSubsidy.poiMtCharge',
                          className: 'agentSubsidy-poiMtCharge',
                          width: 200,

                          render(text, record, index) {
                            const showRiskTipsInfo = showRiskTips({
                              isAct,
                              isPreview,
                              uploadError,
                              productSelections: [record],
                              subsidyType: ['agentSubsidy'],
                            })
                            return (
                              <CustomTd
                                tabIndex={tabIndex}
                                activeTab={activeTab}
                                dataIndex="agentSubsidy.poiMtCharge"
                                record={record}
                                index={index}
                                errorLocation={errorLocation}
                                pageIdx={record.pageIdx!}
                                info={
                                  <>
                                    <div
                                      dangerouslySetInnerHTML={{ __html: text }}
                                    />
                                    {showRiskTipsInfo && showSubsidyRiskTips ? (
                                      <div className="subsidy-td-risk-tips">
                                        {SUBSIDY_RISK_TIPS}
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                }
                              />
                            )
                          },
                          dataIndex: ['agentSubsidy', 'poiMtCharge'],
                        },
                  ] as Column<ProductSelection>[])
                : []),
              {
                title: getTitle({
                  title: '代理商补贴-按比例（元）',
                  containerClassName: 'table-header-left',
                  className: 'table-header-title-green',
                  text: '本列可补充',
                }),
                key: 'agentSubsidy.poiAgentCharge',
                className: 'agentSubsidy-poiAgentCharge',
                width: 200,

                render(text, record, index) {
                  return (
                    <CustomTd
                      tabIndex={tabIndex}
                      activeTab={activeTab}
                      dataIndex="agentSubsidy.poiAgentCharge"
                      record={record}
                      index={index}
                      errorLocation={errorLocation}
                      pageIdx={record.pageIdx!}
                      info={
                        <CustomEllipsis
                          tabIndex={tabIndex}
                          content={text}
                          line={1}
                        />
                      }
                    />
                  )
                },
                dataIndex: ['agentSubsidy', 'poiAgentCharge'],
              },
              ...(hasAgentCharge
                ? ([
                    {
                      title: getTitle({
                        title: '补贴承担1-神价',
                        containerClassName: 'table-header-left',
                        className: 'table-header-title-green',
                        text: '本列可改小',
                      }),
                      className: 'agentSubsidy-poiMtCharge1',
                      key: 'agentSubsidy.poiMtCharge1',
                      width: 200,

                      render(text, record, index) {
                        return (
                          <CustomTd
                            tabIndex={tabIndex}
                            activeTab={activeTab}
                            dataIndex="agentSubsidy.poiMtCharge1"
                            record={record}
                            index={index}
                            errorLocation={errorLocation}
                            pageIdx={record.pageIdx!}
                            info={
                              <CustomEllipsis
                                tabIndex={tabIndex}
                                content={text}
                                line={1}
                              />
                            }
                          />
                        )
                      },
                      dataIndex: ['agentSubsidy', 'poiMtCharge1'],
                    },
                    {
                      title: getTitle({
                        title: '美补承担组织2-PN号',
                        containerClassName: 'table-header-left',
                        className: 'table-header-title-green',
                        text: '本列可补充',
                      }),
                      key: 'agentSubsidy.poiMtCharge2Pn',
                      className: 'agentSubsidy-poiMtCharge2Pn',
                      width: 200,

                      render(text, record, index) {
                        return (
                          <CustomTd
                            tabIndex={tabIndex}
                            activeTab={activeTab}
                            dataIndex="agentSubsidy.poiMtCharge2Pn"
                            record={record}
                            index={index}
                            errorLocation={errorLocation}
                            pageIdx={record.pageIdx!}
                            info={
                              <CustomEllipsis
                                tabIndex={tabIndex}
                                content={text}
                                line={1}
                              />
                            }
                          />
                        )
                      },
                      dataIndex: ['agentSubsidy', 'poiMtCharge2Pn'],
                    },
                    {
                      title: getTitle({
                        title: '补贴承担2',
                        containerClassName: 'table-header-left',
                        className: 'table-header-title-green',
                        text: '本列可补充',
                      }),
                      key: 'agentSubsidy.poiMtCharge2',
                      className: 'agentSubsidy-poiMtCharge2',
                      width: 200,

                      render(text, record, index) {
                        return (
                          <CustomTd
                            tabIndex={tabIndex}
                            activeTab={activeTab}
                            dataIndex="agentSubsidy.poiMtCharge2"
                            record={record}
                            index={index}
                            errorLocation={errorLocation}
                            pageIdx={record.pageIdx!}
                            info={
                              <CustomEllipsis
                                tabIndex={tabIndex}
                                content={text}
                                line={1}
                              />
                            }
                          />
                        )
                      },
                      dataIndex: ['agentSubsidy', 'poiMtCharge2'],
                    },
                    {
                      title: getTitle({
                        title: '美补承担组织3-PN号',
                        containerClassName: 'table-header-left',
                        className: 'table-header-title-green',
                        text: '本列可补充',
                      }),
                      key: 'agentSubsidy.poiMtCharge3Pn',
                      className: 'agentSubsidy-poiMtCharge3Pn',
                      width: 200,

                      render(text, record, index) {
                        return (
                          <CustomTd
                            tabIndex={tabIndex}
                            activeTab={activeTab}
                            dataIndex="agentSubsidy.poiMtCharge3Pn"
                            record={record}
                            index={index}
                            errorLocation={errorLocation}
                            pageIdx={record.pageIdx!}
                            info={
                              <CustomEllipsis
                                tabIndex={tabIndex}
                                content={text}
                                line={1}
                              />
                            }
                          />
                        )
                      },
                      dataIndex: ['agentSubsidy', 'poiMtCharge3Pn'],
                    },
                    {
                      title: getTitle({
                        title: '补贴承担3',
                        containerClassName: 'table-header-left',
                        className: 'table-header-title-green',
                        text: '本列可补充',
                      }),
                      key: 'agentSubsidy.poiMtCharge3',
                      className: 'agentSubsidy-poiMtCharge3',
                      width: 200,

                      render(text, record, index) {
                        return (
                          <CustomTd
                            tabIndex={tabIndex}
                            activeTab={activeTab}
                            dataIndex="agentSubsidy.poiMtCharge3"
                            record={record}
                            index={index}
                            errorLocation={errorLocation}
                            pageIdx={record.pageIdx!}
                            info={
                              <CustomEllipsis
                                tabIndex={tabIndex}
                                content={text}
                                line={1}
                              />
                            }
                          />
                        )
                      },
                      dataIndex: ['agentSubsidy', 'poiMtCharge3'],
                    },
                    {
                      title: getTitle({
                        title: '美补承担组织4-PN号',
                        containerClassName: 'table-header-left',
                        className: 'table-header-title-green',
                        text: '本列可补充',
                      }),
                      key: 'agentSubsidy.poiMtCharge4Pn',
                      className: 'agentSubsidy-poiMtCharge4Pn',
                      width: 200,

                      render(text, record, index) {
                        return (
                          <CustomTd
                            tabIndex={tabIndex}
                            activeTab={activeTab}
                            dataIndex="agentSubsidy.poiMtCharge4Pn"
                            record={record}
                            index={index}
                            errorLocation={errorLocation}
                            pageIdx={record.pageIdx!}
                            info={
                              <CustomEllipsis
                                tabIndex={tabIndex}
                                content={text}
                                line={1}
                              />
                            }
                          />
                        )
                      },
                      dataIndex: ['agentSubsidy', 'poiMtCharge4Pn'],
                    },
                    {
                      title: getTitle({
                        title: '补贴承担4',
                        containerClassName: 'table-header-left',
                        className: 'table-header-title-green',
                        text: '本列可补充',
                      }),
                      key: 'agentSubsidy.poiMtCharge4',
                      className: 'agentSubsidy-poiMtCharge4',
                      width: 200,

                      render(text, record, index) {
                        return (
                          <CustomTd
                            tabIndex={tabIndex}
                            activeTab={activeTab}
                            dataIndex="agentSubsidy.poiMtCharge4"
                            record={record}
                            index={index}
                            errorLocation={errorLocation}
                            pageIdx={record.pageIdx!}
                            info={
                              <CustomEllipsis
                                tabIndex={tabIndex}
                                content={text}
                                line={1}
                              />
                            }
                          />
                        )
                      },
                      dataIndex: ['agentSubsidy', 'poiMtCharge4'],
                    },
                    {
                      title: getTitle({
                        title: '美补承担组织5-PN号',
                        containerClassName: 'table-header-left',
                        className: 'table-header-title-green',
                        text: '本列可补充',
                      }),
                      key: 'agentSubsidy.poiMtCharge5Pn',
                      className: 'agentSubsidy-poiMtCharge5Pn',
                      width: 200,

                      render(text, record, index) {
                        return (
                          <CustomTd
                            tabIndex={tabIndex}
                            activeTab={activeTab}
                            dataIndex="agentSubsidy.poiMtCharge5Pn"
                            record={record}
                            index={index}
                            errorLocation={errorLocation}
                            pageIdx={record.pageIdx!}
                            info={
                              <CustomEllipsis
                                tabIndex={tabIndex}
                                content={text}
                                line={1}
                              />
                            }
                          />
                        )
                      },
                      dataIndex: ['agentSubsidy', 'poiMtCharge5Pn'],
                    },
                    {
                      title: getTitle({
                        title: '补贴承担5',
                        containerClassName: 'table-header-left',
                        className: 'table-header-title-green',
                        text: '本列可补充',
                      }),
                      key: 'agentSubsidy.poiMtCharge5',
                      className: 'agentSubsidy-poiMtCharge5',
                      width: 200,

                      render(text, record, index) {
                        return (
                          <CustomTd
                            tabIndex={tabIndex}
                            activeTab={activeTab}
                            dataIndex="agentSubsidy.poiMtCharge5"
                            record={record}
                            index={index}
                            errorLocation={errorLocation}
                            pageIdx={record.pageIdx!}
                            info={
                              <CustomEllipsis
                                tabIndex={tabIndex}
                                content={text}
                                line={1}
                              />
                            }
                          />
                        )
                      },
                      dataIndex: ['agentSubsidy', 'poiMtCharge5'],
                    },
                  ] as Column<ProductSelection>[])
                : []),
            ],
          },
        ]
      : []

  const columns: Column<ProductSelection>[] = [
    ...getColumnsByConfig(baseColumns, baseColumnsConfig),
    {
      title: '商品资质信息，用于筛选可报名商品',
      key: 'qualification',
      dataIndex: 'qualification',
      children: [...getColumnsByConfig(qualifyColumns, qualifyColumnsConfig)],
    },
    {
      title: '组包商品配置',
      key: 'packageSettings',
      dataIndex: 'packageSettings',
      children: [...getColumnsByConfig(packageColumns, packageColumnsConfig)],
    },
    {
      title: '优惠规则',
      key: 'subsidySettings',
      dataIndex: 'subsidySettings',
      children: [...getColumnsByConfig(subsidyColumns, subsidyColumnsConfig)],
    },
    ...(isAct ? [...meituanSubsidyColumns, ...agentSubsidyColumns] : []),
  ]

  return columns
}
