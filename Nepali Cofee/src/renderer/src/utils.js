function getDayMonthYear(dateValue = new Date()) {
  const day = dateValue.getDate()
  const month = dateValue.getMonth() + 1 // Months are zero-based, so add 1
  const year = dateValue.getFullYear()

  return { day, month, year }
}

export function getFormattedDate() {
  const { day, month, year } = getDayMonthYear()
  return `${day}/${month}/${year}`

  // return `18/02/2025`
}

export function formatDateInReadableFormat(dateStr) {
  const [day, month, year] = dateStr.split('/').map(Number)
  const date = new Date(year, month - 1, day) // Month is zero-based in JS
  const options = { day: 'numeric', month: 'short', year: 'numeric' }

  return date.toLocaleDateString('en-GB', options).replace(',', '')
}

export function generateOrderId() {
  const randomNum = Math.floor(1000 + Math.random() * 9000) // Generate a 4-digit random number
  const now = new Date()

  const dateTime = now
    .toISOString()
    .replace(/[-T:.Z]/g, '')
    .slice(0, 12) // Format: YYYYMMDDHHMM

  return `#${randomNum}-${dateTime}`
}
