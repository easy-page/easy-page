import { promises as fs } from 'fs'
import * as path from 'path'

/**
 * 读取路径信息
 * @param {string} path 路径
 */
async function getStat(dir) {
  try {
    const stat = await fs.stat(dir)
    return stat
  } catch (error) {
    return false
  }
}

/**
 * 创建路径
 * @param {string} dir 路径
 */
function mkdir(dir) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir)
      .then(function () {
        resolve(true)
      })
      .catch(function () {
        console.log('目标文件夹创建失败', dir)
        resolve(false)
      })
  })
}

/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
export async function mkdirRecursions(dir) {
  const isExists = await getStat(dir)

  //如果该路径且不是文件，返回true
  if (isExists && isExists.isDirectory()) {
    return true
  } else if (isExists) {
    return false
  }
  //如果该路径不存在，拿到上级路径
  const tempDir = path.parse(dir).dir
  //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
  const status = await mkdirRecursions(tempDir)
  let mkdirStatus
  if (status) {
    mkdirStatus = await mkdir(dir)
  }
  return mkdirStatus
}
