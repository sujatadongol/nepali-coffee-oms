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

// In your helper/utils.js file
export const getStandardizedDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  
  // getMonth() is 0-indexed (0 for Jan), so add 1
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  
  const day = String(today.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`; // Returns "2025-07-07"
};

export const getTransactionHistory = () => {
  const transactionStr = localStorage.getItem('transactionHistory')
  console.log(transactionStr);
  if (transactionStr) {
    return JSON.parse(transactionStr)
  }
}

export const getOrdersWithOrderId = (initialOrders, orderId) => {
  return initialOrders?.map((single) => {
    return { ...single, orderId, createdAt: new Date().getTime() }
  })
}

export const getOrderIdAndTotals = (dailyItemsArray) => {
  if (!dailyItemsArray || dailyItemsArray.length === 0) {
    return { grandTotal: [] }; // Return empty structure if no items
  }

  // 1. Group items by their orderId
  const orders = dailyItemsArray.reduce((acc, item) => {
    if (!acc[item.orderId]) {
      acc[item.orderId] = {
        items: [],
        createdAt: item.createdAt,
      };
    }
    acc[item.orderId].items.push(item);
    return acc;
  }, {});

  // 2. Create the final array with VAT-inclusive totals
  const grandTotal = Object.keys(orders).map(orderId => {
    const order = orders[orderId];
    
    // --- THIS IS THE KEY CHANGE ---
    // a. Calculate the subtotal for this specific order
    const orderSubTotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // b. Calculate the final total including 13% VAT
    const orderGrandTotal = orderSubTotal * 1.13;
    
    return {
      orderId: orderId,
      total: orderGrandTotal, // Use the new VAT-inclusive total here
      createdAt: order.createdAt,
    };
  });

  return { grandTotal };
};

// --- NEW ROBUST VERSION ---
export const getOrderById = (dailyItemsArray, orderId) => {
  if (!dailyItemsArray || !orderId) {
    return { grandTotal: [] }; // Return empty structure
  }
  
  // Filter the array to get only the items matching the requested orderId
  const grandTotal = dailyItemsArray.filter(item => item.orderId === orderId);

  return { grandTotal };
};

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
