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
  if (!orderList || orderList.length === 0) {
    return {
      subTotal: 0,
      vatAmount: 0,
      grandTotal: 0
    };
  }

  const subTotal = orderList.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const vatAmount = subTotal * 0.13; // 13% VAT
  const grandTotal = subTotal + vatAmount;

  return { subTotal, vatAmount, grandTotal };
};

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

export const getItemsToDisplay = (coffeeCategories, selectedCategory, searchedValue) => {
  if (searchedValue) {
    const searchedItems = []
    coffeeCategories?.forEach((singleCategory) =>
      singleCategory.items.forEach((singleItem) => {
        if (singleItem.name.toLowerCase().includes(searchedValue.toLowerCase())) {
          searchedItems.push(singleItem)
        }
      })
    )
    return searchedItems
  }
  return coffeeCategories.find((category) => category.key === selectedCategory)?.items
}
