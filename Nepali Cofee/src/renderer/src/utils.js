function getDayMonthYear(dateValue = new Date()) {
  const day = dateValue.getDate()
  const month = dateValue.getMonth() + 1 // Months are zero-based, so add 1
  const year = dateValue.getFullYear()

  return { day, month, year }
}

export function getFormattedDate() {
  const { day, month, year } = getDayMonthYear()
  // return `${day}/${month}/${year}`

  return `19/02/2025`
}

export function formatDateInReadableFormat(dateStr) {
  const [day, month, year] = dateStr.split('/').map(Number)
  const date = new Date(year, month - 1, day) // Month is zero-based in JS
  const options = { day: 'numeric', month: 'short', year: 'numeric' }

  return date.toLocaleDateString('en-GB', options).replace(',', '')
}
