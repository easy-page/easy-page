import React, { useMemo, useState } from 'react'
import { Modal, Image } from 'antd'
import { MaterialTypeEnum } from '../../../common'
import JSZip from 'jszip'

export interface MaterialInfoType {
  materialType: number
  materialName: string
  materialValue: string
}

export type PreviewDialogProps = {
  materialInfo: Array<MaterialInfoType>
  resourceName: string
}

export const PreviewDialog: React.FC<PreviewDialogProps> = (
  props: PreviewDialogProps
) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { materialInfo, resourceName } = props

  const imgMaterialInfo = materialInfo?.filter((item) => {
    return item.materialType === MaterialTypeEnum.Image
  })
  const textMaterialInfo = materialInfo?.filter((item) => {
    return item.materialType === MaterialTypeEnum.TEXT
  })

  const imgUrl = useMemo(() => {
    const arr = []
    imgMaterialInfo?.map((item) => {
      arr.push(item.materialValue)
    })
    return arr
  }, [imgMaterialInfo])

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleDownload = async (urls) => {
    const zip = new JSZip()

    try {
      // 循环处理每个图片 URL
      for (let i = 0; i < urls.length; i++) {
        const response = await fetch(urls[i])
        const blob = await response.blob()

        const reader = new FileReader()

        // 将每个图片读取为 Base64，并添加到 ZIP 文件中
        await new Promise((resolve) => {
          reader.onloadend = function () {
            const base64Data = (reader.result as string).split(',')[1]
            zip.file(`${resourceName}${i + 1}.png`, base64Data, { base64: true })
            resolve({})
          }
          reader.readAsDataURL(blob)
        })
      }

      // 生成 ZIP 并触发下载
      zip.generateAsync({ type: 'blob' }).then((content) => {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(content)
        link.download = 'images.zip'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        console.log('ZIP file downloaded!')
      })
    } catch (error) {
      console.error('Error fetching the images:', error)
    }
  }

  return (
    <div>
      <span
        onClick={() => {
          setIsModalOpen(true)
        }}
        className="cursor-pointer text-[#1677FF]"
      >
        预览
      </span>
      <a className="ml-2 text-[#1677FF]" onClick={() => handleDownload(imgUrl)}>
        下载
      </a>
      <Modal
        width={800}
        title="素材预览"
        open={isModalOpen}
        children={
          <div className="reject-dialog">
            <div className="flex flex-row mb-2">
              <span>文字：</span>
              <div>
                {textMaterialInfo?.map((item) => {
                  return <p>{item?.materialValue}</p>
                })}
              </div>
            </div>
            <div>
              图片：
              <div className="flex flex-row flex-wrap">
                {imgMaterialInfo?.map((item) => {
                  return (
                    <div className="mb-10 mr-10">
                      <Image
                        alt={item?.materialName}
                        width={200}
                        height={200}
                        src={item?.materialValue}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        }
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </div>
  )
}
