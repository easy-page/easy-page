import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom'

export class ParamsTask {
  /** 存的是即将修改的参数 */
  private tasks: Record<string, string>[] = []

  private isRunning: boolean = false

  private appendParamsToUrl(navigate: NavigateFunction) {
    if (this.tasks.length === 0) {
      this.isRunning = false
      return
    }
    this.isRunning = true
    const searchParams = new URLSearchParams(location.search)
    const params = this.tasks.shift()
    if (params) {
      Object.keys(params).forEach((e) => {
        if (params[e]) {
          if (!searchParams.has(e)) {
            searchParams.append(e, params[e])
          } else {
            searchParams.set(e, params[e])
          }
        }
      })
    }
    const newUrl = `${location.pathname}?${searchParams.toString()}`
    console.log('current tab: new Url', newUrl)
    navigate(newUrl)
    /** 继续下一个 */
    setTimeout(() => {
      this.appendParamsToUrl(navigate)
    }, 10)
  }

  runTask({
    navigate,
    task,
  }: {
    navigate: NavigateFunction
    task: Record<string, string>
  }) {
    this.tasks.push(task)
    if (this.isRunning) {
      return
    }
    this.appendParamsToUrl(navigate)
  }
}

const paramsTask = new ParamsTask()

// const filterUndefind = (obj: Record<string, any>) => {
//   const result = {}
//   Object.keys(obj).forEach((x) => {
//     if (obj[x] !== 'undefined') {
//       result[x] = obj[x]
//     }
//   })

//   return result
// }

/** 获取路径上参数 */
export const useParamsInfo = <T = Record<string, string>>() => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const navigate = useNavigate()
  return {
    params: (Object.fromEntries(queryParams.entries()) || {}) as T,
    navigate,
    location,
    /** 添加 params 到当前路由 */
    appendParamToUrl: (params: Record<string, string>) => {
      paramsTask.runTask({ navigate, task: params })
    },
  }
}
