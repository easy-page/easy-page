import chalk from 'chalk'

// 日志打印类，可以加入日志级别
export class Logger {
  warn(text: string) {
    console.log(chalk.yellow(`\n${text}\n`))
  }

  info(text: string) {
    console.log(chalk.cyan(`\n${text}\n`))
  }

  error(text: string) {
    console.log(chalk.red(`\n${text}\n`))
  }
}

const logger = new Logger()

export default logger
