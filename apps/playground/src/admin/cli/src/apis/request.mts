import fetch, { RequestInit, Response } from 'node-fetch'

interface FetchOptions extends RequestInit {
  url: string
}

async function fetchRequest<T>({ url, ...options }: FetchOptions): Promise<T> {
  try {
    const response: Response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = (await response.json()) as unknown as T

    return data
  } catch (error) {
    // 这里可以处理错误，例如记录日志或抛出更详细的错误
    throw new Error(`Fetch error: ${error}`)
  }
}

export function featchPostJson<T>(url, params) {
  return fetchRequest<T>({
    url,
    body: JSON.stringify(params),
    method: 'POST',
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-Language': 'zh-CN,zh;q=0.9',
      'cache-Control': 'no-cache',
      connection: 'keep-alive',
      'content-Type': 'application/json',
      origin: 'https://uoc.tsp.test.sankuai.com',
      referer: 'https://uoc.tsp.test.sankuai.com/zsptuoc-admin?tab=config',
    },
  })
}
