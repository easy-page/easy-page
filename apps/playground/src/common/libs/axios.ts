// import axiosWrapper, { Options } from '@nibfe/axios-wrapper'

import { message } from 'antd'
import axios, { AxiosRequestConfig } from 'axios'
import { reportManager } from '../reporter'
import { ReportError } from '../constants/reportor'
import { getBizLine } from './url'



export type RequestResult<T = any> = {
  data?: T
  msg?: string
  success: boolean
  code?: number
  traceid?: string
}

/**
 * - T 参数类型
 * - V 结果类型
 */
export type RequestHandler<T, V> = (params: T) => Promise<RequestResult<V>>

export type BaseRequestConfig = AxiosRequestConfig & {
  isSuccess?: (response: Response) => boolean
}

const baseConfig = {
  timeout: 300000,
  withCredentials: true,
  headers: {
    'x-requested-with': 'XMLHttpRequest',
  },
}

// let showNotice = false

const instance = axios.create({ ...baseConfig, responseType: 'json' })

instance.interceptors.response.use(
  response => {
    // 如果响应状态码为 200，则直接返回响应数据
    if (response.status === 200) {
      return response
    } else {
      // 否则，抛出异常并提示错误信息
      throw new Error(`请求失败，状态码：${response.status}`)
    }
  },
  error => {
    // 如果请求出错，则抛出异常并提示错误信息
    throw new Error(`请求出错：${error.message}`)
  },
)

const wrapperedAxios = instance as any

const request = async ({ isSuccess, ...rest }: BaseRequestConfig): Promise<RequestResult<any>> => {
  try {
    const responseFullInfo = (await wrapperedAxios.request(rest as any))
    const response = responseFullInfo?.data
    const traceid = responseFullInfo?.headers?.['m-traceid']
    if (response.code !== 0) {
      reportManager.owlReport(ReportError.API_ERROR, JSON.stringify({
        traceid: traceid,
        bizline: getBizLine(),
        msg: response?.msg,
        data: response?.data,
        params: rest
      }))
    }

    if (isSuccess?.(response) || response.code === 0) {
      return {
        success: true,
        data: response.data,
        traceid: traceid,
        msg: response?.msg,
      }
    }
    return {
      success: false,
      traceid: traceid,
      msg: response.msg || '网络异常，请稍后重试。',
    }
  } catch (error: any) {
    const errMsg = '网络异常，请稍后重试'
    console.error('request error:', error)
    message.error({ content: errMsg })
    return {
      success: false,
      msg: errMsg,
    }
  }
}

export type RequestConfig = Omit<BaseRequestConfig, 'url' | 'data' | 'method'>

export const postReq = (url: string, data: any, config: RequestConfig = {}) => {
  return request({
    url,
    data,
    method: 'POST',
    ...config,
  })
}
export const getReq = (url: string, data: any, config: RequestConfig = {}) => {
  return request({
    url,
    params: data,
    method: 'GET',
    ...config,
  })
}
