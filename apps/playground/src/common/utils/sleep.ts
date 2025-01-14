export const sleep = (time: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), time * 1000)
  })
}