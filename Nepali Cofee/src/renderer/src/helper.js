export const getSelectedTableDetail = (cafeTables, selectedTableId) => {
  return (
    cafeTables?.filter((single) => single.id === selectedTableId) &&
    cafeTables?.filter((single) => single.id === selectedTableId)[0]
  )
}

export const getSelectedTableOrders = (cafeTables, selectedTableId) => {
  return getSelectedTableDetail(cafeTables, selectedTableId)?.orderItems
}

export const checkIfOrderIsPlaced = (cafeTables, selectedTableId) => {
  return getSelectedTableOrders(cafeTables, selectedTableId)?.length > 0
}

export const getTotalAmount = (orderList) => {
  return orderList?.reduce((acc, item) => acc + item.price * item.quantity, 0)
}

export const getTransactionHistory = () => {
  const transactionStr = localStorage.getItem('transactionHistory')
  if (transactionStr) {
    return JSON.parse(transactionStr)
  }
}

export const getOrdersWithOrderId = (initialOrders, orderId) => {
  return initialOrders?.map((single) => {
    return { ...single, orderId }
  })
}
