export const formatUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})


export const formatUSDWhole = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
}) 