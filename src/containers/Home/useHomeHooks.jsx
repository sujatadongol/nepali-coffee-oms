import { useState } from "react";

export default function useHomeHooks() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(undefined);

  const [cafeTables, setCafeTables] = useState([
    { id: 1, name: "Table 1", capacity: 2, available: true, orderItems: [] },
    { id: 2, name: "Table 2", capacity: 4, available: true, orderItems: [] },
    { id: 3, name: "Table 3", capacity: 2, available: true, orderItems: [] },
    { id: 4, name: "Table 4", capacity: 6, available: true, orderItems: [] },
    { id: 5, name: "Table 5", capacity: 4, available: true, orderItems: [] },
    { id: 6, name: "Table 6", capacity: 2, available: true, orderItems: [] },
  ]);

  const foodItems = [
    { id: "f1", name: "Pizza", price: 120,  },
    { id: "f2", name: "Burger", price: 200 },
    { id: "f3", name: "Pasta", price: 150 },
    { id: "f4", name: "Sushi", price: 100 },
    { id: "f5", name: "Salad", price: 80 },
    { id: "f6", name: "Sandwich", price: 200 },
  ];

  const selectOrderFunc = (item) => {
    setSelectedOrder(item);
    console.log("Selected Order:", item);
  };

  const makeOrder = (quantity) => {
    if (!selectedTable || !selectedOrder) {
      console.log("Please select a table and a food item.");
      return;
    }

    setCafeTables((prevTables) =>
      prevTables.map((table) =>
        table.id === selectedTable.id
          ? {
              ...table,
              orderItems: [
                ...table.orderItems,
                {
                  ...selectedOrder,
                  quantity: selectedOrder?.quantity,
                  total: selectedOrder.price * selectedOrder?.quantity,
                },
              ],
              available: false, //mark the table as occupied
            }
          : table
      )
    );

    console.log(
      `Order placed: ${selectedOrder.name} x ${selectedOrder?.quantity}`
    );
    setSelectedOrder(undefined); // Reset selected order after placing it
  };

  return {
    cafeTables,
    selectedTable,
    setSelectedTable,
    foodItems,
    makeOrder,
    selectOrderFunc,
  };
}
