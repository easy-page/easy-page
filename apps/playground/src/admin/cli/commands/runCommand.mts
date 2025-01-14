import logger from '../src/helpers/logger.mts'
import { getVersion } from '../src/utils/getVersion.mts'

export const runCommand = (command: () => void) => {
  if (Number(getVersion()[0]) < 18) {
    logger.warn(`Node version must >= 18, present version is ${getVersion()[0]}`)
    return
  }
  command()
}
