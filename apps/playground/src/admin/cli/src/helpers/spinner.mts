import ora, { Ora } from 'ora'
import chalk from 'chalk'

export class Spinner {
  spinner: Ora

  constructor() {
    this.spinner = ora('')
  }

  // 开始加载
  start = (text?: string) => {
    const msg = `${text}...\n`
    this.spinner.start(msg)
    this.spinner.stopAndPersist({
      symbol: '✨',
      text: msg,
    })
  }

  // 加载成功
  succeed = (text?: string) => {
    this.spinner.stopAndPersist({
      symbol: '🎉',
      text: `${text}\n`,
    })
  }

  // 加载失败
  fail = (text?: string) => {
    this.spinner.fail(chalk.red(text))
  }
}

const spinner = new Spinner()
export default spinner
