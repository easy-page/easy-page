/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CommonPageUtil,
  NodeInfo,
  NodeInfoWithChildren,
} from '@easy-page/react-ui';
import { nodeUtil } from './nodeUtil';

export type PageUtilProps = {
  disableRootLayout?: boolean;
  layoutProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
};

/**
 * - 辅助写 schema 和 uiConfig 的 API
 * - 辅助封装一些使用层面上的复杂逻辑
 */
export class PageUtil extends CommonPageUtil<PageUtilProps> {
  // constructor(options: CommonPageUtilProps<PageUtilProps>) {
  //   super(options);
  // }
  addFields(
    nodes: Array<NodeInfo<any, any, any> | NodeInfoWithChildren<any, any, any>>
  ): void {
    const { disableRootLayout = true, layoutProps } = this.options;
    const _nodes = nodeUtil.getFields(nodes);
    const curNodes: NodeInfo<any, any, any>[] = !disableRootLayout
      ? [
          nodeUtil
            .createContainer<any, any>(
              `${this.options.pageId}_container`,
              ({ children }) => (
                <div className="111" {...layoutProps}>
                  {children}
                </div>
              )
            )
            .appendChildren(_nodes),
        ]
      : _nodes;
    return this.doAddFields(curNodes);
  }
}
