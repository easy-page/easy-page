export const getVersion = () => {
  const nodeVersion = process.version
  const versionArr = nodeVersion.substring(1).split('.')
  return versionArr
}
