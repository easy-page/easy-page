import {
  ANTD_ERROR_CLASS,
  ActionTypeEnum,
  FileUpload,
  InputTypeEnum,
  UploadSceneEnum,
  toJson,
} from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { message } from 'antd'

import { checkFile } from './utils/checkFile'
import {
  DEFAULT_INVITE_POI_BRAND_EXCEL_TEMPLATE_URL,
  DEFAULT_INVITE_POI_EXCEL_TEMPLATE_URL,
  FILE_ACCEPT,
  MAX_FILE_SIZE,
} from './constant'
import { uploadFile } from '@/common/apis/uploadFile'
import { useContext, useState } from 'react'

import { get } from 'lodash'
import { FormItemInputContext } from 'antd/es/form/context'
import classNames from 'classnames'
import {
  UplaodIdState,
  CommonActCrudFormState,
  CommonActCrudFormProps,
  InviteWay,
} from '../../../../../interface'

export const uplaodId = () =>
  nodeUtil.createCustomField<
    UplaodIdState,
    CommonActCrudFormState,
    CommonActCrudFormProps
  >(
    'uploadId',
    ' ',
    ({
      value = [],
      onChange,
      disabled: commonDisabled,
      frameworkProps: { store },
    }) => {
      const { chooseOperation } = store.pageState
      const isNoChange = chooseOperation === `${ActionTypeEnum.NoChange}`
      const disabled = commonDisabled || isNoChange
      const [uploading, setUploading] = useState(false)
      console.log('UplaodIdState value:', value)
      const { status } = useContext(FormItemInputContext)
      const hasError = status === 'error'
      return (
        <div
          className={classNames('flex flex-col', {
            [`uplaod-id-${ANTD_ERROR_CLASS}`]: hasError,
          })}
        >
          <FileUpload
            multiple={true}
            uploading={uploading}
            disabled={disabled}
            fileList={[...value]}
            maxCount={1}
            beforeUpload={async (file) => {
              const { success: checkSuccess, errorMsg } = checkFile(file, {
                maxFileSize: MAX_FILE_SIZE,
                accept: FILE_ACCEPT,
              })

              if (!checkSuccess) {
                message.error(errorMsg)
                onChange([
                  {
                    uid: file.uid,
                    name: file.name,
                    status: 'error',
                    url: '',
                    response: errorMsg,
                  },
                ])
                return true
              }
              setUploading(true)
              const { success, data, msg } = await uploadFile({
                file,
                scene: UploadSceneEnum.PoiInvitation,
              })
              if (!success || !data?.fileUrl) {
                setUploading(false)
                message.error('上传文件失败')
                onChange([
                  {
                    uid: file.uid,
                    name: file.name,
                    status: 'error',
                    url: '',
                    response: msg || '上传失败',
                  },
                ])
                return true
              }
              onChange([
                {
                  uid: file.uid,
                  name: file.name,
                  url: data?.fileUrl,
                  fileType: data?.fileType,
                },
              ])
              setUploading(false)
              return false
            }}
            btnTextConfig={{
              unUpload: '上传文件',
              uploaded: '重新上传',
            }}
          />
        </div>
      )
    },
    {
      effectedKeys: ['dataType', 'inputIdsWay', 'chooseOperation'],

      preprocess({ defaultValues }) {
        const inputIdsWay = get(defaultValues, 'invitation.inputType')
        if (inputIdsWay !== InputTypeEnum.File) {
          return []
        }
        const fileInfo = toJson(get(defaultValues, 'invitation.inputData'))
        return fileInfo ? [fileInfo] : []
      },
      postprocess: ({ value }) => {
        return {
          'invitation.inputData': JSON.stringify({
            fileUrl: value?.[0]?.url,
            fileType: value?.[0]?.fileType,
            ...(value?.[0] || {}),
          }),
        }
      },
      validate: ({ value }) => {
        if (!value || value.length === 0) {
          return { success: false, errorMsg: '请选择上传文件' }
        }
        if (value?.[0].status === 'error') {
          return {
            success: false,
            errorMsg: value?.[0]?.response || '上传失败',
          }
        }
        return { success: true }
      },
    },
    {
      formItem: {
        colon: false,
        customExtra: ({ frameworkProps: { store } }) => {
          const { dataType } = store.getAllState() as CommonActCrudFormState
          const {
            brandInviteTemplateUrl = DEFAULT_INVITE_POI_BRAND_EXCEL_TEMPLATE_URL,
            poiInviteTemplateUrl = DEFAULT_INVITE_POI_EXCEL_TEMPLATE_URL,
          } = store.getPageProps() as CommonActCrudFormProps
          const downloadUrl =
            dataType === InviteWay.ByMerchantBrand
              ? brandInviteTemplateUrl
              : poiInviteTemplateUrl
          return (
            <>
              文档格式支持xls/xlsx格式
              <a
                style={{
                  marginLeft: 5,
                  color: '#386bff',
                }}
                className="download"
                target={'_blank'}
                href={downloadUrl}
                rel="noreferrer"
              >
                下载模板
              </a>
            </>
          )
        },
      },
    }
  )
