import { fileName } from './../../../../../pages/editCliConfig/fields/fileName'
import * as path from 'path'
import {
  BIZ_TYPE_MAP_TO_STR,
  canPreviewComponentConfig,
  canPreviewComponentList,
  FieldBelongToTitleEnum,
} from '../../../constant/index.mts'
import { mkdirRecursions } from '../../../utils/dir.mts'
import { capitalizeFirstLetter, replaceContent } from '../../../utils/index.mts'
import fs from 'fs-extra'
import logger from '../../../helpers/logger.mts'
import spinner from '../../../helpers/spinner.mts'
import chalk from 'chalk'
import {
  Basic_Act_Path,
  Basic_Temp_Path,
  CloneFileObjParamType,
} from './constant.mts'
import { FieldConfig } from '../../../apis/getFieldsConfig.mts'

const __dirname = path.resolve()

let idCache: string[] = []

enum FieldTypeEnum {
  Container = 'container',
  Field = 'field',
  SubForm = 'subForm',
  FieldOption = 'fieldOption',
  OpSence = 'opSence', // 编辑、创建、查看、复制
}

const fieldTypeMapToTemp = {
  [FieldTypeEnum.Container]: 'baseContainer',
  [FieldTypeEnum.Field]: 'baseField',
  [FieldTypeEnum.SubForm]: 'baseSubForm',
  [FieldTypeEnum.FieldOption]: 'baseFieldOption',
  [FieldTypeEnum.OpSence]: 'baseOpSence',
}

enum OperationTypeToEnd {
  CREATE = 'Create', // 新建
  COPY = 'Copy', // 复制
  VIEW = 'View', // 预览
  EDIT = 'Edit', // 编辑
}

function matchStringEnding(str: string): string | undefined {
  const endings = ['Create', 'Edit', 'View', 'Copy']

  const matchedEnding = endings.find((ending) => str.endsWith(ending))

  return matchedEnding
}

function snakeCaseToCamelCase(str: string): string {
  // 使用正则表达式匹配下划线后跟字母的序列，并使用replace函数进行替换
  // 替换逻辑是：移除下划线，并将紧随其后的字母转换为大写
  // 注意：使用$1来引用正则表达式中的第一个捕获组（即下划线后面的字母）
  return str.replace(/_([a-z])/g, (match, p1) => p1.toUpperCase())
}

const getMappingImportInfo = (mappingType: string) => {
  let infoStr = ''
  let importStr = ''
  if (mappingType === 'common') {
    importStr = `import { commonActConfigsInfo } from '@/pages/actsCrud/ActsCrudInfo/fields/common/mappings'`
    infoStr = 'commonActConfigsInfo'
  } else if (mappingType === 'sg') {
    importStr = `import { commonSgActConfigsInfo } from '@/pages/actsCrud/ActsCrudInfo/fields/commonSg/mappings'`
    infoStr = 'commonSgActConfigsInfo'
  } else {
    importStr = `import { ${snakeCaseToCamelCase(
      mappingType
    )}ActConfigsInfo } from '@/pages/actsCrud/ActsCrudInfo/actsPages/${snakeCaseToCamelCase(
      mappingType
    )}/mappings/index.ts'`
    infoStr = `${snakeCaseToCamelCase(mappingType)}ActConfigsInfo`
  }
  return [importStr, infoStr]
}

const createFieldMapToAct = async ({
  fieldToComponentStr,
  fieldToComponentImportStr,
  fileName,
  actPrefix,
}) => {
  // 生成map文件
  const fildsMapContent = await fs.readFileSync(
    path.join(__dirname, `${Basic_Temp_Path}/fieldsMap.temp`),
    'utf-8'
  )

  // 生成map文件
  const newFildsMapContent = replaceContent(fildsMapContent, [
    {
      target: '${{import}}',
      replace: fieldToComponentImportStr,
    },
    {
      target: '${{name}}',
      replace: capitalizeFirstLetter(actPrefix) + 'FieldsMap',
    },

    {
      target: '${{children}}',
      replace: fieldToComponentStr,
    },
  ])

  // 创建新文件
  await fs.writeFileSync(
    path.join(__dirname, `${Basic_Act_Path}/${fileName}/mappings/fields.ts`),
    newFildsMapContent,
    'utf8'
  )

  logger.info(`创建文件${Basic_Act_Path}/${fileName}/mappings/fields.ts 成功`)
}

const createSubFormMapToAct = async ({
  subFormToComponentStr,
  subFormToComponentImportStr,
  fileName,
  actPrefix,
}) => {
  // 生成map文件
  const fildsMapContent = await fs.readFileSync(
    path.join(__dirname, `${Basic_Temp_Path}/subFormMap.temp`),
    'utf-8'
  )

  // 生成map文件
  const newFildsMapContent = replaceContent(fildsMapContent, [
    {
      target: '${{import}}',
      replace: subFormToComponentImportStr,
    },
    {
      target: '${{name}}',
      replace: capitalizeFirstLetter(actPrefix) + 'SubFormMap',
    },

    {
      target: '${{children}}',
      replace: subFormToComponentStr,
    },
  ])

  // 创建新文件
  await fs.writeFileSync(
    path.join(__dirname, `${Basic_Act_Path}/${fileName}/mappings/subForms.ts`),
    newFildsMapContent,
    'utf8'
  )

  logger.info(`创建文件${Basic_Act_Path}/${fileName}/mappings/subForms.ts 成功`)
}

const createMappingIndex = async ({ actPrefix, fileName }) => {
  // 生成map文件
  const fildsMapContent = await fs.readFileSync(
    path.join(__dirname, `${Basic_Temp_Path}/mappingIndex.temp`),
    'utf-8'
  )
  // 生成map文件
  const newFildsMapContent = replaceContent(fildsMapContent, [
    {
      target: '${{fieldsMap}}',
      replace: capitalizeFirstLetter(actPrefix) + 'FieldsMap',
    },
    {
      target: '${{subFormsMap}}',
      replace: capitalizeFirstLetter(actPrefix) + 'SubFormMap',
    },
    {
      target: '${{defaultValues}}',
      replace: `get${capitalizeFirstLetter(actPrefix)}ActDefaultValues`,
    },
    {
      target: '${{editableConfig}}',
      replace: `get${capitalizeFirstLetter(actPrefix)}EditableConfig`,
    },
    {
      target: '${{name}}',
      replace: actPrefix + 'ActConfigsInfo',
    },
  ])

  // 创建新文件
  await fs.writeFileSync(
    path.join(__dirname, `${Basic_Act_Path}/${fileName}/mappings/index.ts`),
    newFildsMapContent,
    'utf8'
  )

  logger.info(`创建文件${Basic_Act_Path}/${fileName}/mappings/index.ts 成功`)
}

const updateFieldTemplateFile = async (newFieldTemplateStr: string) => {
  // 更新templateId文件
  const actTemplateFileContent = await fs.readFileSync(
    path.join(
      __dirname,
      `src/admin/pages/editCliConfig/constants/templateIdMap.ts`
    ),
    'utf-8'
  )

  const newActTemplateFileContent = replaceContent(actTemplateFileContent, [
    {
      target: '//${{appendAct}}',
      replace: `[${newFieldTemplateStr} ], ` + '\n' + '//${{appendAct}}',
    },
  ])

  // 创建新文件
  await fs.writeFileSync(
    path.join(
      __dirname,
      `src/admin/pages/editCliConfig/constants/templateIdMap.ts`
    ),
    newActTemplateFileContent,
    'utf8'
  )

  logger.info(
    `更新文件 src/admin/pages/editCliConfig/constants/templateIdMap.ts 成功`
  )
}

// 克隆活动组件
const cloneActComponents = async (
  createFileObjParams: CloneFileObjParamType
) => {
  spinner.start(`开始创建活动字段...`)
  const { fieldsConfig, fileName, actPrefix, actType } = createFileObjParams
  console.log('fieldsConfigAAA', fieldsConfig)

  // 用于生成Field映射
  let fieldToComponentStr = ''
  let fieldToComponentImportStr = ''
  // 用于生成Field映射
  let subFormToComponentStr = ''
  let subFormToComponentImportStr = ''
  // 用于写入字段配置
  let actIdToFieldInfoStr = ''

  const presentPath = `${Basic_Act_Path}/${fileName}`

  const cloneActComp = async (field: FieldConfig, appendPath: string) => {
    const { id, fieldType, config, children = [], fullId, belong } = field

    const [mappingImportStr, mappingInfoStr] = getMappingImportInfo(belong)

    const basePath = path.join(__dirname, presentPath + appendPath + '/' + id)

    // 构建路径文件夹
    await mkdirRecursions(basePath)

    // OpScene的container要单独处理
    if (
      fieldType === FieldTypeEnum.Container &&
      children.some((child) => child.fieldType === FieldTypeEnum.OpSence)
    ) {
      // 读取模版文件
      const fileContent = await fs.readFileSync(
        path.join(__dirname, `${Basic_Temp_Path}/baseOpSceneContainer.temp`),
        'utf-8'
      )

      let importStr = ''
      let childrenStr = ''
      let createScene = ''
      let eidtScene = ''
      let copyScene = ''
      let viewScene = ''
      const nameStr = actPrefix + capitalizeFirstLetter(id)
      const componentIdStr = id

      // 循环得到子组件引入
      for (let i = 0; i < children.length; i++) {
        const { id: secondId } = children[i]

        importStr =
          importStr +
          `import {${
            actPrefix + capitalizeFirstLetter(secondId)
          }} from './fields/${secondId}' \n`

        if (matchStringEnding(secondId) === OperationTypeToEnd.COPY) {
          copyScene = actPrefix + capitalizeFirstLetter(secondId)
        } else if (matchStringEnding(secondId) === OperationTypeToEnd.CREATE) {
          createScene = actPrefix + capitalizeFirstLetter(secondId)
        } else if (matchStringEnding(secondId) === OperationTypeToEnd.EDIT) {
          eidtScene = actPrefix + capitalizeFirstLetter(secondId)
        } else if (matchStringEnding(secondId) === OperationTypeToEnd.VIEW) {
          viewScene = actPrefix + capitalizeFirstLetter(secondId)
        } else {
          childrenStr =
            childrenStr + `${actPrefix + capitalizeFirstLetter(secondId)},\n`
        }

        await cloneActComp(children[i], appendPath + '/' + id + '/fields')
      }

      // 替换文件内容
      const newFileContent = replaceContent(fileContent, [
        {
          target: '${{name}}',
          replace: nameStr,
        },
        {
          target: '${{componentId}}',
          replace: `'${componentIdStr}'`,
        },
        {
          target: '${{import}}',
          replace: importStr,
        },
        {
          target: '${{children}}',
          replace: childrenStr,
        },

        {
          target: '${{configParams}}',
          replace: JSON.stringify(config) || '{}',
        },
        {
          target: '${{create}}',
          replace: createScene,
        },
        {
          target: '${{edit}}',
          replace: eidtScene,
        },
        {
          target: '${{view}}',
          replace: viewScene,
        },
        {
          target: '${{copy}}',
          replace: copyScene,
        },
        {
          target: '${{mappingImport}}',
          replace: mappingImportStr,
        },
        {
          target: '${{mappingInfo}}',
          replace: mappingInfoStr,
        },
      ])

      // 创建新文件
      await fs.writeFileSync(`${basePath}/index.ts`, newFileContent, 'utf8')

      logger.info(`创建文件${basePath}/index.ts 成功`)
    } else if (
      [
        FieldTypeEnum.Field,
        FieldTypeEnum.Container,
        FieldTypeEnum.FieldOption,
        FieldTypeEnum.OpSence,
      ].includes(fieldType as any)
    ) {
      // 读取模版文件
      const fileContent = await fs.readFileSync(
        path.join(
          __dirname,
          `${Basic_Temp_Path}/${fieldTypeMapToTemp[fieldType]}.temp`
        ),
        'utf-8'
      )

      let importStr = ''
      let childrenStr = ''
      const nameStr = actPrefix + capitalizeFirstLetter(id)
      const componentIdStr = id

      if (fieldType === FieldTypeEnum.Field && !idCache.includes(id)) {
        idCache.push(id)

        fieldToComponentStr =
          fieldToComponentStr +
          `[FieldIds.${capitalizeFirstLetter(
            id
          )}]: () => ${actPrefix}${capitalizeFirstLetter(id)},\n`
        fieldToComponentImportStr =
          fieldToComponentImportStr +
          `import {${actPrefix}${capitalizeFirstLetter(
            id
          )}} from '..${appendPath}/${id}'\n`

        actIdToFieldInfoStr =
          actIdToFieldInfoStr +
          `{ id: ${actPrefix}${capitalizeFirstLetter(id)}, fullId: ${fullId} },`
      }

      // 循环得到子组件引入
      for (let i = 0; i < children.length; i++) {
        const { id: secondId } = children[i]

        importStr =
          importStr +
          `import {${
            actPrefix + capitalizeFirstLetter(secondId)
          }} from './fields/${secondId}' \n`

        childrenStr =
          childrenStr + `${actPrefix + capitalizeFirstLetter(secondId)},\n`

        await cloneActComp(children[i], appendPath + '/' + id + '/fields')
      }

      // 替换文件内容
      const newFileContent = replaceContent(fileContent, [
        {
          target: '${{name}}',
          replace: nameStr,
        },
        {
          target: '${{componentId}}',
          replace: `'${componentIdStr}'`,
        },
        {
          target: '${{import}}',
          replace: importStr,
        },
        {
          target: '${{children}}',
          replace: childrenStr,
        },

        {
          target: '${{configParams}}',
          replace: JSON.stringify((config || {})) || '{}',
        },

        {
          target: '${{mappingImport}}',
          replace: mappingImportStr,
        },
        {
          target: '${{mappingInfo}}',
          replace: mappingInfoStr,
        },
      ])

      // 创建新文件
      await fs.writeFileSync(`${basePath}/index.ts`, newFileContent, 'utf8')

      logger.info(`创建文件${basePath}/index.ts 成功`)
    } else {
      subFormToComponentStr =
        subFormToComponentStr +
        `[SubFormIds.${capitalizeFirstLetter(id)}]: () => ${
          actPrefix + capitalizeFirstLetter(id)
        },\n`
      subFormToComponentImportStr =
        subFormToComponentImportStr +
        `import {${
          actPrefix + capitalizeFirstLetter(id)
        }} from '..${appendPath}/${id}'\n`

      // 读取模版文件
      const fileContent = await fs.readFileSync(
        path.join(
          __dirname,
          `${Basic_Temp_Path}/${fieldTypeMapToTemp[fieldType]}.temp`
        ),
        'utf-8'
      )

      // 子表单类型，需要先构建pageInfo文件
      const pageInfoContent = await fs.readFileSync(
        path.join(__dirname, `${Basic_Temp_Path}/basePageInfo.temp`),
        'utf-8'
      )

      let importStr = ''
      let childrenStr = ''
      const nameStr = actPrefix + capitalizeFirstLetter(id)
      const componentIdStr = id
      const basePath = path.join(__dirname, presentPath + appendPath + '/' + id)

      // 循环得到子组件引入
      for (let i = 0; i < children.length; i++) {
        const { id: secondId } = children[i]

        importStr =
          importStr +
          `import {${
            actPrefix + capitalizeFirstLetter(secondId)
          }} from './fields/${secondId}' \n`

        childrenStr =
          childrenStr + `${actPrefix + capitalizeFirstLetter(secondId)},\n`

        await cloneActComp(children[i], appendPath + '/' + id + '/fields')
      }

      // 替换文件内容
      const newPageInfoFileContent = replaceContent(pageInfoContent, [
        {
          target: '${{name}}',
          replace: nameStr,
        },
        {
          target: '${{componentId}}',
          replace: `'${componentIdStr}'`,
        },
        {
          target: '${{import}}',
          replace: importStr,
        },
        {
          target: '${{children}}',
          replace: childrenStr,
        },

        {
          target: '${{configParams}}',
          replace: JSON.stringify(config),
        },

        {
          target: '${{mappingImport}}',
          replace: mappingImportStr,
        },
        {
          target: '${{mappingInfo}}',
          replace: mappingInfoStr,
        },
      ])

      // 创建pageInfo文件
      await fs.writeFileSync(
        `${basePath}/pageInfo.ts`,
        newPageInfoFileContent,
        'utf8'
      )

      logger.info(`创建文件${basePath}/pageInfo.ts 成功`)

      const subFormImportStr = `import {${
        actPrefix + capitalizeFirstLetter(id) + 'PageInfo'
      }} from './pageInfo.ts' \n`

      // 然后创建subForm文件
      // 替换文件内容
      const newFileContent = replaceContent(fileContent, [
        {
          target: '${{name}}',
          replace: nameStr,
        },
        {
          target: '${{componentId}}',
          replace: `'${componentIdStr}'`,
        },
        {
          target: '${{import}}',
          replace: subFormImportStr,
        },
        {
          target: '${{pageInfo}',
          replace: `${actPrefix + capitalizeFirstLetter(id) + 'PageInfo'}`,
        },

        {
          target: '${{mappingImport}}',
          replace: mappingImportStr,
        },
        {
          target: '${{mappingInfo}}',
          replace: mappingInfoStr,
        },
      ])

      // 创建pageInfo文件
      await fs.writeFileSync(`${basePath}/index.ts`, newFileContent, 'utf8')

      logger.info(`创建文件${basePath}/index.ts 成功`)
    }
  }

  for (let i = 0; i < fieldsConfig.length; i++) {
    await cloneActComp(fieldsConfig[i], '/fields')
  }

  spinner.succeed(`活动字段创建完成...`)

  // 构建路径文件夹
  await mkdirRecursions(
    path.join(__dirname, `${Basic_Act_Path}/${fileName}/mappings`)
  )

  //创建fieldMap字段
  await createFieldMapToAct({
    fieldToComponentStr,
    fieldToComponentImportStr,
    fileName,
    actPrefix,
  })

  //创建fieldMap字段
  await createSubFormMapToAct({
    subFormToComponentStr,
    subFormToComponentImportStr,
    fileName,
    actPrefix,
  })

  // 创建mapping的index字段
  await createMappingIndex({
    fileName,
    actPrefix,
  })

  //更新fieldTemplate文件
  await updateFieldTemplateFile(actIdToFieldInfoStr)
}

// 克隆根目录下的pageInfo文件
const cloneActRootPageInfo = async (
  createFileObjParams: CloneFileObjParamType
) => {
  const { fieldsConfig, fileName, actPrefix, bizLine } = createFileObjParams
  spinner.start(`开始创建活动pageInfo.ts`)

  //获取所有组件大类
  const belongArr = fieldsConfig.map((item) => item.id)

  let importInfo = ``
  let anchorInfo = ``
  let componentInfo = ``

  for (let i = 0; i < belongArr.length; i++) {
    const blockName = belongArr[i]

    console.log('blockName', blockName)

    importInfo =
      importInfo +
      `import { ${actPrefix}${capitalizeFirstLetter(
        blockName
      )} } from './fields/${blockName}'\n`
    componentInfo =
      componentInfo + `${actPrefix}${capitalizeFirstLetter(blockName)},`
    anchorInfo = anchorInfo + `${FieldBelongToTitleEnum[blockName]},\n`
  }

  // 读取配置模版文件内容
  const fileContent = await fs.readFileSync(
    path.join(__dirname, `${Basic_Temp_Path}/pageInfo.temp`),
    'utf-8'
  )

  // 替换文件内容
  const newFileContent = replaceContent(fileContent, [
    {
      target: '${{import}}',
      replace: importInfo,
    },
    {
      target: '${{component}}',
      replace: componentInfo,
    },
    {
      target: '${{name}}',
      replace: actPrefix,
    },
    {
      target: '${{anchor}}',
      replace: anchorInfo,
    },

    {
      target: '${{bizLineEnum}}',
      replace: BIZ_TYPE_MAP_TO_STR[bizLine],
    },
  ])

  // 创建新文件
  await fs.writeFileSync(
    path.join(__dirname, `${Basic_Act_Path}/${fileName}/pageInfo.ts`),
    newFileContent,
    'utf8'
  )

  logger.info(`创建文件${Basic_Act_Path}/${fileName}/pageInfo.ts 成功`)
  spinner.succeed(`活动pageInfo.ts创建完成...`)
}

// 克隆活动interface文件
const cloneActRootInterface = async (
  createFileObjParams: CloneFileObjParamType
) => {
  const { fieldsConfig, fileName, actPrefix } = createFileObjParams
  spinner.start(`开始创建活动整体interface ${chalk.cyan(fileName)}`)

  // 读取配置模版文件内容
  const fileContent = await fs.readFileSync(
    path.join(__dirname, `${Basic_Temp_Path}/interface.temp`),
    'utf-8'
  )

  // 替换文件内容
  const newFileContent = replaceContent(fileContent, [
    {
      target: '${{name-uppercase}}',
      replace: capitalizeFirstLetter(actPrefix),
    },
  ])

  // 创建新文件
  await fs.writeFileSync(
    path.join(__dirname, `${Basic_Act_Path}/${fileName}/interface.ts`),
    newFileContent,
    'utf8'
  )

  logger.info(`创建文件${Basic_Act_Path}/${fileName}/interface.ts 成功`)
  spinner.succeed(`活动整体interface创建完成...`)
}

// 克隆活动lib目录
const cloneActLibDir = async (createFileObjParams: CloneFileObjParamType) => {
  const {
    fieldsConfig,
    fileName,
    actPrefix,
    actFactorInfo = {
      factorCodes: [],
    },
    actType,
  } = createFileObjParams
  spinner.start(`开始创建活动lib目录`)

  const { factorCodes } = actFactorInfo

  await mkdirRecursions(
    path.join(__dirname, `${Basic_Act_Path}/${fileName}/lib`)
  )

  const files = await fs.readdirSync(
    path.join(__dirname, `${Basic_Temp_Path}/lib`)
  )

  let factorCodeStr = ''
  factorCodes.map(
    (item) => (factorCodeStr = `factorCodeStr` + ',' + `"${item}"` + '\n')
  )

  // 为了避免ts检测，保存的都是temp文件，这里复制过去需要修改文件后缀
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const filePath = path.join(
      __dirname,
      `${Basic_Act_Path}/${fileName}/lib`,
      file
    )
    // 获取文件的原始文件名（不含后缀）
    const originalFileName = path.basename(filePath, path.extname(filePath))

    // 读取配置模版文件内容
    const fileContent = await fs.readFileSync(
      path.join(__dirname, `${Basic_Temp_Path}/lib/${originalFileName}.temp`),
      'utf-8'
    )

    // 替换文件内容
    const newFileContent = replaceContent(fileContent, [
      {
        target: '${{name-uppercase}}',
        replace: capitalizeFirstLetter(actPrefix),
      },
      {
        target: '${{factor}}',
        replace: factorCodeStr,
      },
      {
        target: '${{actType-allUppercase}}',
        replace: actType.toUpperCase(),
      },
    ])

    // 构造新的文件路径
    const newFilePath = path.join(
      __dirname,
      `${Basic_Act_Path}/${fileName}/lib`,
      `${originalFileName}.ts`
    )

    // 创建新文件
    await fs.writeFileSync(newFilePath, newFileContent, 'utf8')

    logger.info(`创建文件${Basic_Act_Path}/${fileName}/interface.ts 成功`)

    // 重命名文件
    // await fs.renameSync(filePath, newFilePath)

    logger.info(`创建文件${newFilePath} 成功`)
    spinner.succeed(`活动lib目录创建完成...`)
  }
}

// 克隆活动根目录下的index文件
const cloneActRootIndex = async (
  createFileObjParams: CloneFileObjParamType
) => {
  const {
    fieldsConfig,
    fileName,
    actPrefix,
    needPnCheck,
    actType,
    actName,
    bizLine,
  } = createFileObjParams
  spinner.start(`开始创建活动index.tsx文件`)

  let previewComponentStr = ``
  let lowercaseName = ``
  let uppercaseName = ``
  const actTypeEnum = `ActTypeEnum.${actType.toUpperCase()}`

  lowercaseName = actPrefix
  uppercaseName = capitalizeFirstLetter(actPrefix)
  for (let i = 0; i < idCache.length; i++) {
    const field = idCache[i]
    if (canPreviewComponentList.includes(field)) {
      previewComponentStr =
        previewComponentStr + `${canPreviewComponentConfig[field]},\n`
    }
  }

  // 读取配置模版文件内容
  const fileContent = await fs.readFileSync(
    path.join(__dirname, `${Basic_Temp_Path}/index.temp`),
    'utf-8'
  )

  const pnAuditfileContent = await fs.readFileSync(
    path.join(__dirname, `${Basic_Temp_Path}/needOtherOrgPnAudit.temp`),
    'utf-8'
  )

  // 替换文件内容
  let newFileContent = replaceContent(fileContent, [
    {
      target: '${{name-lowercase}}',
      replace: lowercaseName,
    },
    {
      target: '${{name-uppercase}}',
      replace: uppercaseName,
    },
    {
      target: '${{previewComponent}}',
      replace: previewComponentStr,
    },
    {
      target: '${{actType-enum}}',
      replace: actTypeEnum,
    },
    {
      target: '${{actType}}',
      replace: actType,
    },
    {
      target: '${{actType-allUppercase}}',
      replace: actType.toUpperCase(),
    },
    {
      target: '${{bizLineEnum}}',
      replace: BIZ_TYPE_MAP_TO_STR[bizLine],
    },
    {
      target: '${{actPrefix}}',
      replace: capitalizeFirstLetter(actPrefix),
    },
  ])

  if (needPnCheck) {
    newFileContent = replaceContent(newFileContent, [
      {
        target: '${{pnAudit}}',
        replace: pnAuditfileContent,
      },
    ])
  } else {
    newFileContent = replaceContent(newFileContent, [
      {
        target: '${{pnAudit}}',
        replace: '',
      },
    ])
  }

  // 创建新文件
  await fs.writeFileSync(
    path.join(__dirname, `${Basic_Act_Path}/${fileName}/index.tsx`),
    newFileContent,
    'utf8'
  )

  logger.info(`创建文件${Basic_Act_Path}/${fileName}/index.tsx 成功`)
  spinner.succeed(`活动index.tsx文件创建完成...`)

  idCache = []
}

const appendActTypeToFile = async (
  createFileObjParams: CloneFileObjParamType
) => {
  spinner.start(`开始新增促销类型枚举`)
  const { actType, actName } = createFileObjParams

  const actTypeFileContent = await fs.readFileSync(
    path.join(__dirname, `/src/common/constants/actTemplateIds.ts`),
    'utf-8'
  )

  const newFileContent = replaceContent(actTypeFileContent, [
    {
      target: '//${{appendActType}}',
      replace:
        `/** ${actName} */
          ${actType.toUpperCase()} = '${actType}',` +
        '\n' +
        '//${{appendActType}}',
    },
  ])

  // 创建新文件
  await fs.writeFileSync(
    path.join(__dirname, `/src/common/constants/actTemplateIds.ts`),
    newFileContent,
    'utf8'
  )
  spinner.succeed(`新增促销类型枚举完成...`)
}

const appendActComponentToFile = async (
  createFileObjParams: CloneFileObjParamType
) => {
  spinner.start(`开始新增活动组件映射`)
  const { actType, actName, actPrefix } = createFileObjParams

  const actTypeFileContent = await fs.readFileSync(
    path.join(__dirname, `src/pages/actsCrud/index.tsx`),
    'utf-8'
  )

  const newFileContent = replaceContent(actTypeFileContent, [
    {
      target: '//${{import}}',
      replace: `${capitalizeFirstLetter(actPrefix)}Form, \n` + '//${{import}}',
    },
    {
      target: '//${{ActComponent}}',
      replace:
        `[ActTypeEnum.${actType.toUpperCase()}]: <${`${capitalizeFirstLetter(
          actPrefix
        )}Form`} />, \n` + '//${{ActComponent}}',
    },
  ])

  // 创建新文件
  await fs.writeFileSync(
    path.join(__dirname, `src/pages/actsCrud/index.tsx`),
    newFileContent,
    'utf8'
  )

  spinner.succeed(`新增新增活动组件映射成功...`)
}

const appendActComponentExportToFile = async (
  createFileObjParams: CloneFileObjParamType
) => {
  spinner.start(`开始导出活动组件...`)

  const { actType, actName, actPrefix, fileName } = createFileObjParams

  const actTypeFileContent = await fs.readFileSync(
    path.join(__dirname, `src/pages/actsCrud/ActsCrudInfo/actsPages/index.ts`),
    'utf-8'
  )

  const newFileContent = replaceContent(actTypeFileContent, [
    {
      target: '//${{export}}',
      replace: `export * from './${fileName}' \n` + '//${{export}}',
    },
  ])

  // 创建新文件
  await fs.writeFileSync(
    path.join(__dirname, `src/pages/actsCrud/ActsCrudInfo/actsPages/index.ts`),
    newFileContent,
    'utf8'
  )

  spinner.succeed(`导出活动组件映射成功...`)
}

const appendMappingOptionsToFile = async (
  createFileObjParams: CloneFileObjParamType
) => {
  spinner.start(`开始新增mapping选项...`)

  const { actType, actName, actPrefix, fileName } = createFileObjParams

  const actTypeFileContent = await fs.readFileSync(
    path.join(
      __dirname,
      `src/admin/pages/editCliConfig/constants/templateIdMap.ts`
    ),
    'utf-8'
  )

  const newFileContent = replaceContent(actTypeFileContent, [
    {
      target: '//${{import}}',
      replace:
        `import { ${actPrefix}ActConfigsInfo } from '@/pages/actsCrud/ActsCrudInfo/actsPages/${fileName}/mappings'\n` +
        '//${{import}}',
    },
    {
      target: '//${{actTemplateMap}}',
      replace:
        `[ActTypeEnum.${actType.toUpperCase()}]: ${actPrefix}ActConfigsInfo,` +
        '//${{actTemplateMap}}',
    },
  ])

  // 创建新文件
  await fs.writeFileSync(
    path.join(
      __dirname,
      `src/admin/pages/editCliConfig/constants/templateIdMap.ts`
    ),
    newFileContent,
    'utf8'
  )

  spinner.succeed(`新增mapping选项成功...`)
}

export const createFileUtils = [
  cloneActComponents,
  cloneActRootPageInfo,
  cloneActRootInterface,
  cloneActLibDir,
  cloneActRootIndex,
  appendActTypeToFile,
  appendActComponentToFile,
  appendActComponentExportToFile,
  appendMappingOptionsToFile,
]
