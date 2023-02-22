export const capitalizeText = (text) => {
  // Returns a text with every first letter of each word capitalized
  return text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')
}

export const removeNonNumericCharacters = (text) => {
  let nonNumericCharacters = ''
  if(text) {
    nonNumericCharacters = text.replace(/[^\d]/g, '')
  }

  return nonNumericCharacters
}

export const formatCurrency = (value) => {
  return Number(value).toLocaleString('fullwide', { maximumFractionDigits: 2, style: 'currency', currency: 'USD', useGrouping: true })
}