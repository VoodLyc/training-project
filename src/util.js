export const capitalizeText = (text) => {
  // Returns a text with every first letter of each word capitalized
  return text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')
}

export const removeNonNumericCharacters = (text) => {
  let nonNumericCharacters = ''

  if (text) {
    nonNumericCharacters = text.replace(/[^\d]/g, '')
  }
  return nonNumericCharacters
}

export const formatCurrency = (value) => {
  // Format the value as a currency (0 -> $0.00)
  return Number(value).toLocaleString('fullwide', { maximumFractionDigits: 2, style: 'currency', currency: 'USD', useGrouping: true })
}

export const isNumeric = (value) => {
  // Checks if the value contains only numbers
  return /^[0-9]$/i.test(value)
}

export const isLetterOrSymbol = (value) => {
  // Checks if the value contains only letters or symbols
  return /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]+$/g.test(value)
}