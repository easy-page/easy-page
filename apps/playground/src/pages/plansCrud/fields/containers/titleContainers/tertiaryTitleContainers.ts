import { createTertiaryTitleContainerContainer } from "@/common/fields"

export const subsidyBaseLevelContainer = createTertiaryTitleContainerContainer('sub-subsidy-base-level',
  '基础档位',
  { tooltip: '商家报名可享美团平台基础神券商家权益' }
)

export const subsidyExpandLevelContainer = createTertiaryTitleContainerContainer('subsidy-expand-level',
  '膨胀档位',
  { tooltip: '享美团平台膨胀商家权益包，更高出资更多权益。（包含基础神券商家的全部权益，并享受定向营销场景大额券带来的流量权益，高门槛出资的美补保底权益等）' }
)