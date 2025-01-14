export const isEmptyMtChargeAmt = (mtChargeAmt?: string) => {
  return !mtChargeAmt || mtChargeAmt === '0'
}
