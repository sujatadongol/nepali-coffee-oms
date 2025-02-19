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
    return { ...single, orderId, createdAt: new Date().getTime() }
  })
}

export function getOrderIdAndTotals(data) {
  const orderMap = new Map()

  data.forEach((item) => {
    if (orderMap.has(item.orderId)) {
      let existingOrder = orderMap.get(item.orderId)
      existingOrder.total += item.price * item.quantity
    } else {
      orderMap.set(item.orderId, {
        orderId: item.orderId,
        total: item.price * item.quantity,
        createdAt: item.createdAt
      })
    }
  })

  return Array.from(orderMap.values())
}

export function getOrderById(data, orderId) {
  return data.filter((item) => item.orderId === orderId)
}
