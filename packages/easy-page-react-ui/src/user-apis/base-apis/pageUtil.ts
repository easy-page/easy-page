/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AnyNodesInfoType,
  CommonPageUtilProps,
  NodeInfo,
  PageInfo,
} from './interface';

/**
 * - 辅助写 schema 和 uiConfig 的 API
 * - 辅助封装一些使用层面上的复杂逻辑
 */
export abstract class CommonPageUtil<T> {
  private pageInfo: PageInfo<any, any>;

  protected options: CommonPageUtilProps<T>;

  constructor(options: CommonPageUtilProps<T>) {
    this.options = options;
    const { pageId, rootUIConfig } = options;
    this.pageInfo = {
      schema: {
        id: pageId,
        name: '',
        isFormField: false,
      },
      // schemaDefaultValues: {},
      uiConfig: {
        [this.getUIConfigKey(pageId, '')]: rootUIConfig || {},
      },
    };
  }

  private getUIConfigKey(id: string, parentId: string) {
    return `${parentId}_${id}`;
  }

  abstract addFields(
    nodes: AnyNodesInfoType
  ): void;


  protected doAddFields(nodes: NodeInfo<any, any, any>[]) {
    const schemas = nodes.map((each) => {
      this.pageInfo.uiConfig = this.pageInfo.uiConfig || {};
      this.pageInfo.uiConfig[
        this.getUIConfigKey(each.schema.id, this.pageInfo.schema.id)
      ] = each.fieldUIConfig;
      this.pageInfo.uiConfig = {
        ...this.pageInfo.uiConfig,
        ...(each.childrenUIConfig || {}),
      };
      // this.pageInfo.schemaDefaultValues = {
      //   ...this.pageInfo.schemaDefaultValues,
      //   ...each.defaultValues,
      // };

      return each.schema;
    });
    this.pageInfo.schema.children = schemas;
  }

  getPageInfo(): PageInfo<any, any> {
    return this.pageInfo;
  }
}
