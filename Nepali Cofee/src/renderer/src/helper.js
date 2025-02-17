export const getSelectedTableOrders = (cafeTables, selectedTable) => {
  return cafeTables?.filter((single) => single.id === selectedTable?.id)
}

export const checkIfOrderIsPlaced = (cafeTables, selectedTable) => {
  return getSelectedTableOrders(cafeTables, selectedTable)[0]?.orderItems?.length > 0
}

export const getTotalAmount = (orderList) => {
  return orderList.reduce((acc, item) => acc + item.price * item.quantity, 0)
}
