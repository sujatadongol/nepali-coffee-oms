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
  
  return `${year}-${month}-${day}`; // Returns "2024-08-07"
};

export const getTransactionHistory = () => {
  const transactionStr = localStorage.getItem('transactionHistory')
  console.log(transactionStr);
  if (transactionStr) {
    return JSON.parse(transactionStr)
  }
}

// export const getTransactionHistory = () => {
//   return {
//     "2025-07-05": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2025-07-21": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2025-07-22": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2025-07-25": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2025-07-27": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2025-07-28": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2025-07-01": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2025-07-06": [
//       {
//         id: "c3",
//         name: "Espresso Macchiato",
//         price: 140,
//         imgSrc: "/src/assets/espressoMacchiato.jpg",
//         quantity: 3,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       },
//       {
//         id: "c35",
//         name: "Cho Danish",
//         price: 100,
//         imgSrc: "/src/assets/chodanish.jpeg",
//         quantity: 2,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       },
//       {
//         id: "c39",
//         name: "Mini Lava",
//         price: 80,
//         imgSrc: "/src/assets/minilava.jpeg",
//         quantity: 1,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       }
//     ],
//     "2025-07-07": [
//       {
//         id: "c6",
//         name: "Flavored Americano",
//         price: 180,
//         imgSrc: "/src/assets/flovouredAmericano.jpeg",
//         quantity: 2,
//         orderId: "#1109-202507071200",
//         createdAt: 1751863200000
//       },
//       {
//         id: "c4",
//         name: "Single Shot Americano",
//         price: 120,
//         imgSrc: "/src/assets/americano.jpeg",
//         quantity: 2,
//         orderId: "#1109-202507071200",
//         createdAt: 1751863200000
//       }
//     ],
//     "2025-07-08": [
//       {
//         id: "c5",
//         name: "Iced Latte",
//         price: 199,
//         imgSrc: "/src/assets/iced-latte.jpg",
//         quantity: 2,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       },
//       {
//         id: "c36",
//         name: "Choco Bun",
//         price: 130,
//         imgSrc: "/src/assets/chcobun.jpeg",
//         quantity: 1,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       },
//       {
//         id: "c37",
//         name: "Coconut Bun",
//         price: 130,
//         imgSrc: "/src/assets/coconutbun.jpeg",
//         quantity: 1,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       }
//     ],
//     "2025-07-09": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c38",
//         name: "Cinamon Donut",
//         price: 80,
//         imgSrc: "/src/assets/cinamondonut.jpeg",
//         quantity: 3,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c34",
//         name: "Cookies",
//         price: 150,
//         imgSrc: "/src/assets/cookies.jpeg",
//         quantity: 2,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       }
//     ],
//     "2025-07-10": [
//       {
//         id: "c3",
//         name: "Espresso Macchiato",
//         price: 140,
//         imgSrc: "/src/assets/espressoMacchiato.jpg",
//         quantity: 3,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       },
//       {
//         id: "c35",
//         name: "Cho Danish",
//         price: 100,
//         imgSrc: "/src/assets/chodanish.jpeg",
//         quantity: 2,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       },
//       {
//         id: "c39",
//         name: "Mini Lava",
//         price: 80,
//         imgSrc: "/src/assets/minilava.jpeg",
//         quantity: 1,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       }
//     ],
//     "2025-07-11": [
//       {
//         id: "c6",
//         name: "Flavored Americano",
//         price: 180,
//         imgSrc: "/src/assets/flovouredAmericano.jpeg",
//         quantity: 2,
//         orderId: "#1109-202507071200",
//         createdAt: 1751863200000
//       },
//       {
//         id: "c4",
//         name: "Single Shot Americano",
//         price: 120,
//         imgSrc: "/src/assets/americano.jpeg",
//         quantity: 2,
//         orderId: "#1109-202507071200",
//         createdAt: 1751863200000
//       }
//     ],
//     "2025-07-12": [
//       {
//         id: "c5",
//         name: "Iced Latte",
//         price: 199,
//         imgSrc: "/src/assets/iced-latte.jpg",
//         quantity: 2,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       },
//       {
//         id: "c36",
//         name: "Choco Bun",
//         price: 130,
//         imgSrc: "/src/assets/chcobun.jpeg",
//         quantity: 1,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       },
//       {
//         id: "c37",
//         name: "Coconut Bun",
//         price: 130,
//         imgSrc: "/src/assets/coconutbun.jpeg",
//         quantity: 1,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       }
//     ],
//     "2025-07-13": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c38",
//         name: "Cinamon Donut",
//         price: 80,
//         imgSrc: "/src/assets/cinamondonut.jpeg",
//         quantity: 3,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c34",
//         name: "Cookies",
//         price: 150,
//         imgSrc: "/src/assets/cookies.jpeg",
//         quantity: 2,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       }
//     ],
//      "2025-07-22": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2025-07-25": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2025-07-27": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2025-07-28": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2025-07-01": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2025-08-06": [
//       {
//         id: "c3",
//         name: "Espresso Macchiato",
//         price: 140,
//         imgSrc: "/src/assets/espressoMacchiato.jpg",
//         quantity: 3,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       },
//       {
//         id: "c35",
//         name: "Cho Danish",
//         price: 100,
//         imgSrc: "/src/assets/chodanish.jpeg",
//         quantity: 2,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       },
//       {
//         id: "c39",
//         name: "Mini Lava",
//         price: 80,
//         imgSrc: "/src/assets/minilava.jpeg",
//         quantity: 1,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       }
//     ],
//     "2025-08-07": [
//       {
//         id: "c6",
//         name: "Flavored Americano",
//         price: 180,
//         imgSrc: "/src/assets/flovouredAmericano.jpeg",
//         quantity: 2,
//         orderId: "#1109-202507071200",
//         createdAt: 1751863200000
//       },
//       {
//         id: "c4",
//         name: "Single Shot Americano",
//         price: 120,
//         imgSrc: "/src/assets/americano.jpeg",
//         quantity: 2,
//         orderId: "#1109-202507071200",
//         createdAt: 1751863200000
//       }
//     ],
//     "2025-08-08": [
//       {
//         id: "c5",
//         name: "Iced Latte",
//         price: 199,
//         imgSrc: "/src/assets/iced-latte.jpg",
//         quantity: 2,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       },
//       {
//         id: "c36",
//         name: "Choco Bun",
//         price: 130,
//         imgSrc: "/src/assets/chcobun.jpeg",
//         quantity: 1,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       },
//       {
//         id: "c37",
//         name: "Coconut Bun",
//         price: 130,
//         imgSrc: "/src/assets/coconutbun.jpeg",
//         quantity: 1,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       }
//     ],
//     "2025-08-09": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c38",
//         name: "Cinamon Donut",
//         price: 80,
//         imgSrc: "/src/assets/cinamondonut.jpeg",
//         quantity: 3,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c34",
//         name: "Cookies",
//         price: 150,
//         imgSrc: "/src/assets/cookies.jpeg",
//         quantity: 2,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       }
//     ],
//     "2025-08-10": [
//       {
//         id: "c3",
//         name: "Espresso Macchiato",
//         price: 140,
//         imgSrc: "/src/assets/espressoMacchiato.jpg",
//         quantity: 3,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       },
//       {
//         id: "c35",
//         name: "Cho Danish",
//         price: 100,
//         imgSrc: "/src/assets/chodanish.jpeg",
//         quantity: 2,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       },
//       {
//         id: "c39",
//         name: "Mini Lava",
//         price: 80,
//         imgSrc: "/src/assets/minilava.jpeg",
//         quantity: 1,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       }
//     ],
//     "2025-08-11": [
//       {
//         id: "c6",
//         name: "Flavored Americano",
//         price: 180,
//         imgSrc: "/src/assets/flovouredAmericano.jpeg",
//         quantity: 2,
//         orderId: "#1109-202507071200",
//         createdAt: 1751863200000
//       },
//       {
//         id: "c4",
//         name: "Single Shot Americano",
//         price: 120,
//         imgSrc: "/src/assets/americano.jpeg",
//         quantity: 2,
//         orderId: "#1109-202507071200",
//         createdAt: 1751863200000
//       }
//     ],
//     "2025-08-12": [
//       {
//         id: "c5",
//         name: "Iced Latte",
//         price: 199,
//         imgSrc: "/src/assets/iced-latte.jpg",
//         quantity: 2,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       },
//       {
//         id: "c36",
//         name: "Choco Bun",
//         price: 130,
//         imgSrc: "/src/assets/chcobun.jpeg",
//         quantity: 1,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       },
//       {
//         id: "c37",
//         name: "Coconut Bun",
//         price: 130,
//         imgSrc: "/src/assets/coconutbun.jpeg",
//         quantity: 1,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       }
//     ],
//     "2025-08-13": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c38",
//         name: "Cinamon Donut",
//         price: 80,
//         imgSrc: "/src/assets/cinamondonut.jpeg",
//         quantity: 3,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c34",
//         name: "Cookies",
//         price: 150,
//         imgSrc: "/src/assets/cookies.jpeg",
//         quantity: 2,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       }
//     ],
//         "2024-07-05": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2024-07-21": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2024-07-22": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2024-07-25": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2024-07-27": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2024-07-28": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2024-07-01": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2024-07-06": [
//       {
//         id: "c3",
//         name: "Espresso Macchiato",
//         price: 140,
//         imgSrc: "/src/assets/espressoMacchiato.jpg",
//         quantity: 3,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       },
//       {
//         id: "c35",
//         name: "Cho Danish",
//         price: 100,
//         imgSrc: "/src/assets/chodanish.jpeg",
//         quantity: 2,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       },
//       {
//         id: "c39",
//         name: "Mini Lava",
//         price: 80,
//         imgSrc: "/src/assets/minilava.jpeg",
//         quantity: 1,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       }
//     ],
//     "2024-07-07": [
//       {
//         id: "c6",
//         name: "Flavored Americano",
//         price: 180,
//         imgSrc: "/src/assets/flovouredAmericano.jpeg",
//         quantity: 2,
//         orderId: "#1109-202507071200",
//         createdAt: 1751863200000
//       },
//       {
//         id: "c4",
//         name: "Single Shot Americano",
//         price: 120,
//         imgSrc: "/src/assets/americano.jpeg",
//         quantity: 2,
//         orderId: "#1109-202507071200",
//         createdAt: 1751863200000
//       }
//     ],
//     "2024-07-08": [
//       {
//         id: "c5",
//         name: "Iced Latte",
//         price: 199,
//         imgSrc: "/src/assets/iced-latte.jpg",
//         quantity: 2,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       },
//       {
//         id: "c36",
//         name: "Choco Bun",
//         price: 130,
//         imgSrc: "/src/assets/chcobun.jpeg",
//         quantity: 1,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       },
//       {
//         id: "c37",
//         name: "Coconut Bun",
//         price: 130,
//         imgSrc: "/src/assets/coconutbun.jpeg",
//         quantity: 1,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       }
//     ],
//     "2024-07-09": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c38",
//         name: "Cinamon Donut",
//         price: 80,
//         imgSrc: "/src/assets/cinamondonut.jpeg",
//         quantity: 3,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c34",
//         name: "Cookies",
//         price: 150,
//         imgSrc: "/src/assets/cookies.jpeg",
//         quantity: 2,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       }
//     ],
//     "2024-07-10": [
//       {
//         id: "c3",
//         name: "Espresso Macchiato",
//         price: 140,
//         imgSrc: "/src/assets/espressoMacchiato.jpg",
//         quantity: 3,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       },
//       {
//         id: "c35",
//         name: "Cho Danish",
//         price: 100,
//         imgSrc: "/src/assets/chodanish.jpeg",
//         quantity: 2,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       },
//       {
//         id: "c39",
//         name: "Mini Lava",
//         price: 80,
//         imgSrc: "/src/assets/minilava.jpeg",
//         quantity: 1,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       }
//     ],
//     "2024-07-11": [
//       {
//         id: "c6",
//         name: "Flavored Americano",
//         price: 180,
//         imgSrc: "/src/assets/flovouredAmericano.jpeg",
//         quantity: 2,
//         orderId: "#1109-202507071200",
//         createdAt: 1751863200000
//       },
//       {
//         id: "c4",
//         name: "Single Shot Americano",
//         price: 120,
//         imgSrc: "/src/assets/americano.jpeg",
//         quantity: 2,
//         orderId: "#1109-202507071200",
//         createdAt: 1751863200000
//       }
//     ],
//     "2024-07-12": [
//       {
//         id: "c5",
//         name: "Iced Latte",
//         price: 199,
//         imgSrc: "/src/assets/iced-latte.jpg",
//         quantity: 2,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       },
//       {
//         id: "c36",
//         name: "Choco Bun",
//         price: 130,
//         imgSrc: "/src/assets/chcobun.jpeg",
//         quantity: 1,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       },
//       {
//         id: "c37",
//         name: "Coconut Bun",
//         price: 130,
//         imgSrc: "/src/assets/coconutbun.jpeg",
//         quantity: 1,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       }
//     ],
//     "2024-07-13": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c38",
//         name: "Cinamon Donut",
//         price: 80,
//         imgSrc: "/src/assets/cinamondonut.jpeg",
//         quantity: 3,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c34",
//         name: "Cookies",
//         price: 150,
//         imgSrc: "/src/assets/cookies.jpeg",
//         quantity: 2,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       }
//     ],
//      "2024-07-22": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2024-07-25": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2024-07-27": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2024-07-28": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2024-07-01": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 2,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1001-202507050930",
//         createdAt: 1751688600000
//       }
//     ],
//     "2024-08-06": [
//       {
//         id: "c3",
//         name: "Espresso Macchiato",
//         price: 140,
//         imgSrc: "/src/assets/espressoMacchiato.jpg",
//         quantity: 3,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       },
//       {
//         id: "c35",
//         name: "Cho Danish",
//         price: 100,
//         imgSrc: "/src/assets/chodanish.jpeg",
//         quantity: 2,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       },
//       {
//         id: "c39",
//         name: "Mini Lava",
//         price: 80,
//         imgSrc: "/src/assets/minilava.jpeg",
//         quantity: 1,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       }
//     ],
//     "2024-08-07": [
//       {
//         id: "c6",
//         name: "Flavored Americano",
//         price: 180,
//         imgSrc: "/src/assets/flovouredAmericano.jpeg",
//         quantity: 2,
//         orderId: "#1109-202507071200",
//         createdAt: 1751863200000
//       },
//       {
//         id: "c4",
//         name: "Single Shot Americano",
//         price: 120,
//         imgSrc: "/src/assets/americano.jpeg",
//         quantity: 2,
//         orderId: "#1109-202507071200",
//         createdAt: 1751863200000
//       }
//     ],
//     "2024-08-08": [
//       {
//         id: "c5",
//         name: "Iced Latte",
//         price: 199,
//         imgSrc: "/src/assets/iced-latte.jpg",
//         quantity: 2,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       },
//       {
//         id: "c36",
//         name: "Choco Bun",
//         price: 130,
//         imgSrc: "/src/assets/chcobun.jpeg",
//         quantity: 1,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       },
//       {
//         id: "c37",
//         name: "Coconut Bun",
//         price: 130,
//         imgSrc: "/src/assets/coconutbun.jpeg",
//         quantity: 1,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       }
//     ],
//     "2024-08-09": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c38",
//         name: "Cinamon Donut",
//         price: 80,
//         imgSrc: "/src/assets/cinamondonut.jpeg",
//         quantity: 3,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c34",
//         name: "Cookies",
//         price: 150,
//         imgSrc: "/src/assets/cookies.jpeg",
//         quantity: 2,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       }
//     ],
//     "2024-08-10": [
//       {
//         id: "c3",
//         name: "Espresso Macchiato",
//         price: 140,
//         imgSrc: "/src/assets/espressoMacchiato.jpg",
//         quantity: 3,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       },
//       {
//         id: "c35",
//         name: "Cho Danish",
//         price: 100,
//         imgSrc: "/src/assets/chodanish.jpeg",
//         quantity: 2,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       },
//       {
//         id: "c39",
//         name: "Mini Lava",
//         price: 80,
//         imgSrc: "/src/assets/minilava.jpeg",
//         quantity: 1,
//         orderId: "#1023-202507061045",
//         createdAt: 1751775900000
//       }
//     ],
//     "2024-08-11": [
//       {
//         id: "c6",
//         name: "Flavored Americano",
//         price: 180,
//         imgSrc: "/src/assets/flovouredAmericano.jpeg",
//         quantity: 2,
//         orderId: "#1109-202507071200",
//         createdAt: 1751863200000
//       },
//       {
//         id: "c4",
//         name: "Single Shot Americano",
//         price: 120,
//         imgSrc: "/src/assets/americano.jpeg",
//         quantity: 2,
//         orderId: "#1109-202507071200",
//         createdAt: 1751863200000
//       }
//     ],
//     "2024-08-12": [
//       {
//         id: "c5",
//         name: "Iced Latte",
//         price: 199,
//         imgSrc: "/src/assets/iced-latte.jpg",
//         quantity: 2,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       },
//       {
//         id: "c36",
//         name: "Choco Bun",
//         price: 130,
//         imgSrc: "/src/assets/chcobun.jpeg",
//         quantity: 1,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       },
//       {
//         id: "c37",
//         name: "Coconut Bun",
//         price: 130,
//         imgSrc: "/src/assets/coconutbun.jpeg",
//         quantity: 1,
//         orderId: "#1220-202507081430",
//         createdAt: 1751951400000
//       }
//     ],
//     "2024-08-13": [
//       {
//         id: "c1",
//         name: "Single Shot Espresso",
//         price: 110,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c2",
//         name: "Double Shot Espresso",
//         price: 140,
//         imgSrc: "/src/assets/espresso.jpg",
//         quantity: 1,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c38",
//         name: "Cinamon Donut",
//         price: 80,
//         imgSrc: "/src/assets/cinamondonut.jpeg",
//         quantity: 3,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       },
//       {
//         id: "c34",
//         name: "Cookies",
//         price: 150,
//         imgSrc: "/src/assets/cookies.jpeg",
//         quantity: 2,
//         orderId: "#1351-202507091015",
//         createdAt: 1752039300000
//       }
//     ]
//   };
// };



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
