export const appendParamsToUrl = (url: string, params: Record<string, any>) => {
  const searchParams = new URLSearchParams()
  Object.keys(params).forEach((e) => {
    if (!searchParams.get(e)) {
      searchParams.append(e, params[e])
    } else {
      searchParams.set(e, params[e])
    }
  })
  const newUrl = `${url}?${searchParams.toString()}`
  return newUrl
}
