function getDayMonthYear(dateValue = new Date()) {
  const day = dateValue.getDate()
  const month = dateValue.getMonth() + 1 // Months are zero-based, so add 1
  const year = dateValue.getFullYear()

  return { day, month, year }
}

export function getFormattedDate() {
  const { day, month, year } = getDayMonthYear()
  return `${day}/${month}/${year}`
}
