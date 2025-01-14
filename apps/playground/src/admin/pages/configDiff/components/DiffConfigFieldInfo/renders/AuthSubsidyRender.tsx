import { TagRender } from './TagRender'
import { Field } from './Field'
import React from 'react'
import { AuthSubsidyConfig } from '@/common/apis/getConfigList'
import { AuthTypeText, CheckSubsidyItemText } from '@/common'

export const AuthSubsidyRender = ({
  config,
}: {
  config: AuthSubsidyConfig
}) => {
  const { checkItems, resourceIdList } = config
  return (
    <div className="flex flex-row mb-2">
      <div className="text-sec mb-2 w-[200px]">补贴权限校验</div>
      <div className="px-2 flex flex-col  bg-[#EDF2FA] p-2">
        <Field
          label="补贴权限检查项"
          value={
            <TagRender
              className="ml-2"
              val={checkItems.map((e) => CheckSubsidyItemText[e])}
            />
          }
        ></Field>
        <Field
          label="补贴资源权限列表"
          value={
            <TagRender
              className="ml-2"
              val={resourceIdList.map((e) => AuthTypeText[e])}
            />
          }
        />
      </div>
    </div>
  )
}
