import { uploadFile } from "@/common/apis/uploadFile"
import { UploadSceneEnum } from "@/common/constants"
import { customCheckLinkFn } from "./linkConfig"
import { message } from "antd"

const MAX_FILE_SIZE = 1024 * 1024 * 20 // MB
const MAX_FILE_SIZE_TIPS = '20MB'

export const menuConfig = {
  insertLink: {
    checkLink: customCheckLinkFn, // 也支持 async 函数
  },
  editLink: {
    checkLink: customCheckLinkFn, // 也支持 async 函数
  },

  codeSelectLang: {
    codeLangs: [
      { text: 'CSS', value: 'css' },
      { text: 'HTML', value: 'html' },
      { text: 'XML', value: 'xml' },
      // 其他
    ]
  },
  uploadImage: {
    customUpload: async (file, insertFn) => {
      if (file.size > MAX_FILE_SIZE) {
        message.error(`图片超过最大文件大小：${MAX_FILE_SIZE_TIPS}`)
        return;
      }
      const res = await uploadFile({ file, scene: UploadSceneEnum.RuleDesc })
      if (res.success) {
        const src = res.data?.fileUrl
        insertFn(src, 'rule desc')
      }

    },
  },
  insertVideo: {
    onInsertedVideo: (videoNode) => {
      console.log('inserted video', videoNode)
    }
  },
}
