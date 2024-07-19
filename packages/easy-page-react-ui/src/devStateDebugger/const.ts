export enum TriggerChangeSence {
  /** 来源于副作用的 action 变更 */
  FromAction = 'FromAction',
  /** 来源于字段本身 onChange */
  FromOnChange = 'FromOnChange',
}

export enum DefaultValueSource {
  /** 来源于表单的 Props */
  FromProps = 'FromProps',
  /** 来源于 preprocess 计算 */
  FromPreprocess = 'FromPreprocess',
  /** 来源于 node 本身配置 */
  FromNode = 'fromNode',
}
