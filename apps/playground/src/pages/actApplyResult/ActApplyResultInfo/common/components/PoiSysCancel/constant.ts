export enum CheckAndReturnEnum {
  Section = 1,
  All = 2,
}

export const CheckAndReturnDesc = {
  [CheckAndReturnEnum.Section]: '部分清退',
  [CheckAndReturnEnum.All]: '全部清退',
}

export const CHECK_AND_RETURN_OPTIONS = [
  {
    label: CheckAndReturnDesc[CheckAndReturnEnum.Section],
    value: CheckAndReturnEnum.Section,
  },
  {
    label: CheckAndReturnDesc[CheckAndReturnEnum.All],
    value: CheckAndReturnEnum.All,
  },
]
