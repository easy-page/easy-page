import { OperationType } from '@/common/constants'
import { FieldTypeEnum } from '@/common/constants/fieldMaps/fieldType'
import {
  FieldConfig,
  FieldsConfig,
} from '@/common/constants/fieldMaps/interface'
import { OpSenceId } from '@/common/constants/fieldMaps/opSence'
import {
  emptyField,
  emptyOptionNode,
} from '@/pages/actsCrud/ActsCrudInfo/common'

import {
  AnyNodesInfoType,
  generateId,
  NodeInfoWithChildren,
  PageUtil,
} from '@easy-page/antd-ui'
import { ConfigsInfoMappings } from '../../../constants'

export type AndNodeWithChildren = NodeInfoWithChildren<any, any, any, any>

const OpSenceMap: Record<OperationType, OpSenceId> = {
  [OperationType.CREATE]: OpSenceId.ActInviteCreate,
  [OperationType.COPY]: OpSenceId.ActInviteCopy,
  [OperationType.VIEW]: OpSenceId.ActInviteView,
  [OperationType.EDIT]: OpSenceId.ActInviteEdit,
}

export type GetPreviewInfoOptions = {
  sence: OperationType
  fieldConfigs: FieldsConfig
  // templateFullMappings: ConfigsInfoMappingType
}

const getFields = ({
  sence,
  fieldConfigs,
}: // templateFullMappings,
GetPreviewInfoOptions) => {
  const doAppendNode = (configs: FieldConfig[]) => {
    const result: AnyNodesInfoType = []
    ;(configs || []).forEach((each) => {
      const {
        containersMap: belongContainersMap,
        fieldsMap: belongFieldsMap,
        optionsMap: belongOptionsMap,
        subFormsMap: belongSubFormsMap,
      } = ConfigsInfoMappings[each.belong] || {}
      /** 默认是闪购的模板 */
      const templateFullMappings = ConfigsInfoMappings.common
      const hasChildren = each.children?.length > 0
      if (each.fieldType === FieldTypeEnum.Container) {
        const containersMap = belongContainersMap?.[each.id]
        // templateFullMappings?.containersMap?.[each.id]
        const containerNode = containersMap?.() as AndNodeWithChildren
        if (containerNode) {
          result.push(
            hasChildren
              ? containerNode.appendChildren(doAppendNode(each.children || []))
              : containerNode
          )
        } else {
          result.push(emptyField(each.id))
        }
      } else if (each.fieldType === FieldTypeEnum.Field) {
        const fieldsMap = belongFieldsMap?.[each.id]
        // templateFullMappings?.fieldsMap?.[each.id]
        const fieldNode = fieldsMap?.(each.config) as AndNodeWithChildren
        if (fieldNode) {
          result.push(
            hasChildren && typeof fieldNode.appendChildren === 'function'
              ? fieldNode.appendChildren(doAppendNode(each.children || []))
              : fieldNode
          )
        } else {
          result.push(emptyField(each.id))
        }
      } else if (each.fieldType === FieldTypeEnum.FieldOption) {
        const optionsMap = belongOptionsMap?.[each.id]
        const fieldOptionsNode = optionsMap?.(
          each.config
        ) as AndNodeWithChildren
        if (fieldOptionsNode) {
          result.push(
            hasChildren && typeof fieldOptionsNode.appendChildren === 'function'
              ? fieldOptionsNode.appendChildren(
                  doAppendNode(each.children || [])
                )
              : fieldOptionsNode
          )
        } else {
          result.push(emptyOptionNode(each.id))
        }
      } else if (each.fieldType === FieldTypeEnum.SubForm) {
        const pu = new PageUtil({ pageId: `${each.fullId}` })
        pu.addFields(doAppendNode(each.children || []))
        const subFormsMap = belongSubFormsMap?.[each.id]
        // templateFullMappings?.subFormsMap?.[each.id]
        const subFormNode = subFormsMap?.({
          pageInfo: pu.getPageInfo(),
        })
        if (subFormNode) {
          result.push(subFormNode)
        } else {
          result.push(emptyField(each.id))
        }
      } else if (
        each.fieldType === FieldTypeEnum.OpSence &&
        each.id === OpSenceMap[sence]
      ) {
        const nodes = doAppendNode(each.children)
        nodes.forEach((e) => result.push(e))
      }
    })
    return result
  }
  return doAppendNode(fieldConfigs)
}

export const getPreviewPageInfo = ({
  sence,
  fieldConfigs,
}: GetPreviewInfoOptions) => {
  const pu = new PageUtil({ pageId: 'fields-preview-config' })
  pu.addFields(
    getFields({
      sence,
      fieldConfigs: fieldConfigs || [],
    })
  )
  return {
    pageInfo: pu.getPageInfo(),
    id: generateId('fields-preview'),
  }
}
