export const getLeafIds = (ids: number[][]) => {
  return ids.map((x) => x[x.length - 1])
}
