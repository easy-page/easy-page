
const acceptFileTypeDefault = [
  'application/pdf',
  'application/ppt',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]

export const checkFile = (file: File, options: {
  maxFileSize: number; // MB
  accept?: string[];
}) => {
  const { maxFileSize, accept } = options;

  if (file.size > maxFileSize * 1024 * 1024) {
    return { success: false, errorMsg: `文件大小不可超过${maxFileSize}M` }
  }
  if (!(accept || acceptFileTypeDefault).includes(file.type!)) {
    return { success: false, errorMsg: `上传文件不符合规定格式` }
  }
  return { success: true }
}