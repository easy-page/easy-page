import * as path from 'path'
import * as handlebars from 'handlebars'
import inquirer from 'inquirer'
import logger from '../../helpers/logger.mts'
import spinner from '../../helpers/spinner.mts'
import chalk from 'chalk'
import fs from 'fs-extra'
import { mkdirRecursions } from '../../utils/dir.mts'
import { getAllActConfig } from '../../apis/getAllActConfig.mts'
import { getFieldsConfig } from '../../apis/getFieldsConfig.mts'
import { toJson } from '../../../../../common/libs/json.ts'
import {
  Basic_Act_Path,
  CloneFileObjParamType,
} from './createFile/constant.mts'
import { createFileUtils } from './createFile/createFileUtils.mts'
import { prepareFieldConfig } from '../../../../../admin/pages/editCliConfig/utils/prepareFieldConfig.ts'

const __dirname = path.resolve()

// 处理用户输入
export interface IQuestion {
  templateId: string
}

// 获取用户输入
const getRemoteSettingQuestions = async (
  actTypeOptions
): Promise<IQuestion> => {
  return await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'templateId',
      message: `请选择新建活动类型`,
      choices: actTypeOptions,
    },
  ] as any)
}

// 检查活动是否已经存在
const checkProjectExist = async (actName) => {
  if (fs.existsSync(path.join(__dirname, `${Basic_Act_Path}/${actName}`))) {
    logger.warn(`活动${actName}已经存在`)
    return true
  }
  return false
}

const createAction = async () => {
  try {
    const resData = await getAllActConfig()

    const { configs } = resData

    const actTypeOptions = configs.map((item, index) => {
      return {
        name: item.name,
        value: index,
      }
    })

    const { templateId } = await getRemoteSettingQuestions(actTypeOptions)

    const actConfig = configs.find((_item, index) =>
      templateId.includes(index as any)
    )

    if (!actConfig) {
      spinner.fail('未获取到可用的远程配置，请重试～')
      return
    }

    const { crudConfig, config, bizLine, name: actName } = actConfig || {}
    const { actFactorInfo, actType } = toJson(config as unknown as string)

    const {
      actPrefix,
      fields,
      fileName,
      needPnCheck,
      template,
      belong,
      fieldsConfig,
    } = toJson(crudConfig as unknown as string)

    const transformFieldsConfig = prepareFieldConfig({
      template,
      belong,
      configs: fieldsConfig,
      fieldIds: fields,
    })

    // 检查活动是否存在
    if (!(await checkProjectExist(fileName))) {
      spinner.start(`开始创建目标文件夹 ${chalk.cyan(fileName)}`)
      // 创建新文件夹
      await mkdirRecursions(
        path.join(__dirname, `${Basic_Act_Path}/${fileName}/fields`)
      )
      spinner.succeed(`目标文件创建完成 ${chalk.yellow(fileName)}\n`)

      const createFileObjParams: CloneFileObjParamType = {
        fileName,
        fieldsConfig: transformFieldsConfig,
        actPrefix,
        actFactorInfo,
        bizLine,
        needPnCheck,
        actType,
        actName,
      }

      for (const createFileUtil of createFileUtils) {
        await createFileUtil(createFileObjParams)
      }
    }
  } catch (err) {
    spinner.fail(err)
    return
  }
}

export default createAction
