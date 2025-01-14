// export const S3_URL = 'https://s3plus.meituan.net/zspt-fe-prod/zspt'
export const S3_URL = 'https://s3plus.meituan.net/zspt-fe/zspt'
export const getS3Url = (path: string) => {
  return `${S3_URL}/${path}`
}
