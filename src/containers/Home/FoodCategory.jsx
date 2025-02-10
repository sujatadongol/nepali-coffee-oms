import React, { useState, useRef } from "react";
import { Row, Col, Card, Button, InputNumber, List } from "antd";
import { PlusOutlined, PrinterOutlined, MinusOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";
import coffeeImage from "../../assets/coffee.png";
import Americano from "../../assets/americano.png";
import FlavoredAmericano from "../../assets/flavoredAmericano.png";
import Expresso from '../../assets/expresso.png'
import Macchiato from '../../assets/macchiato.png'




const { Meta } = Card;

const coffeeCategories = [
  {
    key: "Black Coffee",
    label: "Black Coffee",
    items: [
      { id: "c1", name: "Single/ Double Espresso", price: 110, imgSrc: Expresso },
      { id: "c2", name: "Espresso Macchiato", price: 140, imgSrc: Macchiato },
      { id: "c3", name: "Americano(Single/ Double)", price: 120, imgSrc: Americano },
      { id: "c4", name: "Flavored Americano", price: 150, imgSrc: FlavoredAmericano },
    ],
  },
  {
    key: "Milk Coffee",
    label: "Milk Coffee",
    items: [
      { id: "c5", name: "Cappuccino", price: 160,  },
      { id: "c6", name: "Latte", price: 170 },
      { id: "c7", name: "Mocha", price: 180 },
      { id: "c8", name: "Flat White", price: 175 },
    ],
  },
  {
    key: "Coffee Alternative",
    label: "Coffee Alternative",
    items: [
      { id: "c9", name: "Matcha Latte", price: 190 },
      { id: "c10", name: "Chai Latte", price: 180 },
      { id: "c11", name: "Turmeric Latte", price: 170 },
    ],
  },
  {
    key: "Cold Coffee",
    label: "Cold Coffee",
    items: [
      { id: "c12", name: "Iced Americano", price: 150 },
      { id: "c13", name: "Iced Latte", price: 160 },
      { id: "c14", name: "Cold Brew", price: 170 },
      { id: "c15", name: "Frappe", price: 180 },
    ],
  },
];

const FoodCategory = ({ table, setCafeTables, onBack }) => {
  const [orderSummary, setOrderSummary] = useState(table.orderItems || []);
  const [selectedCategory, setSelectedCategory] = useState("Black Coffee");
  const [quantities, setQuantities] = useState({});

  const handleOrderPlacement = () => {
    setCafeTables((prevTables) =>
      prevTables.map((t) =>
        t.id === table.id
          ? { ...t, available: false, orderItems: orderSummary }
          : t
      )
    );
    onBack();
  };



  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef, // Use contentRef correctly
    documentTitle: 'customer-bill',
  });


  const handleQuantityChange = (value, id) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddClick = (food) => {
    const quantity = quantities[food.id] || 1;
    setOrderSummary((prev) => {
      const existingItem = prev.find((item) => item.id === food.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...food, quantity }];
    });
  };

  return (
    <>
      {/* Coffee Theme Styles */}
      <style>
        {`
          .category-card {
            text-align: center;
            cursor: pointer;
            border: 2px solid transparent;
            transition: all 0.3s ease;
            background: #E6D5B8;
            margin-bottom: 10px;
          }
           
          .category-card:hover, .selected-category {
            border-color: #4B2E2E !important;
            background: #C89F77 !important;
            color: white;
            font-weight: bold;
          }

           img{
                height: 115px!important;
                object-fit: cover;
              }

          .coffee-card {
            background: #F8EDE3;
            border-radius: 8px;
            margin-bottom: 20px;
          }

          .coffee-title {
            color: #4B2E2E;
            font-weight: bold;
          }

          .price {
            color: #C89F77;
            font-weight: bold;
          }

          .counter-btn {
            background: #4B2E2E !important;
            color: white;
            border: none;
          }

          .counter-btn:hover {
            background: #614a40 !important;
          }

          .order-summary {
            background: #f8f0e3;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
          }

          .order-summary h3 {
            color: #4B2E2E;
          }

          .total-cost {
            font-size: 18px;
            font-weight: bold;
            color: #4B2E2E;
          }
#coffeeDisplay img{
margin-left:'80px!important';
}
        `}
      </style>

      <div className="row text-end ">

        <div className="col">
          <button onClick={handleOrderPlacement} className="btn btn-success me-2">Place Order</button>
          <button onClick={handleOrderPlacement} className="btn btn-outline-dark">Back</button>

        </div>

      </div>
      {/* Category Labels */}
      <div className="col-6 d-flex gap-4 my-3">
        {coffeeCategories.map((category) => (
          <div
            key={category.key}
            className={`col rounded-pill py-2 category-card ${selectedCategory === category.key ? "selected-category" : ""
              }`}
            onClick={() => setSelectedCategory(category.key)}
          >
            {category.label}
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-md-8">
          {/* Display food items */}
          <div className="row" id="coffeeDisplay">
            {coffeeCategories
              .find((category) => category.key === selectedCategory)
              ?.items.map((food) => (
                <div className="col-12 col-md-6 col-lg-4 mb-4" key={food.id}>
                  <Card
                    hoverable
                    className="coffee-card text-center pt-3"
                    cover={<img alt={food.name} src={food.imgSrc ? food.imgSrc : coffeeImage} />}
                  >
                    <Meta title={<span className="coffee-title">{food.name}</span>} description={<span className="price">Rs {food.price}</span>} />
                    <div className="row d-flex mt-4">
                      <div className="col mt-2" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {/* Decrease Button */}
                        <Button
                          className="counter-btn"
                          icon={<MinusOutlined />}
                          onClick={() => handleQuantityChange(Math.max((quantities[food.id] || 1) - 1, 1), food.id)}
                        />

                        {/* Quantity Display */}
                        <InputNumber
                          min={1}
                          max={20}
                          style={{ width: '45px' }}
                          value={quantities[food.id] || 1}
                          onChange={(value) => handleQuantityChange(value, food.id)}
                        />

                        {/* Increase Button */}
                        <Button
                          className="counter-btn"
                          icon={<PlusOutlined />}
                          onClick={() => handleQuantityChange((quantities[food.id] || 1) + 1, food.id)}
                        />
                      </div>
                      <div className="col d-flex justify-content-center">
                        <Button
                          type="primary"
                          style={{ marginTop: "10px", background: "#4B2E2E", border: "none" }}
                          icon={<PlusOutlined />}
                          onClick={() => handleAddClick(food)}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
          </div>
        </div>

        <div className="col-4 pt-4"  style={{ background: '#f8f0e3'}}>
          <div className="row mb-3 d-flex">
            <div className="col">
              <h5>{table.name} - Order</h5>
            </div>
            <div className="col text-end">
              <button className="btn btn-sm btn-outline-dark" onClick={handlePrint}>
                <PrinterOutlined />
                <span className="h6 mx-1">Print</span>
              </button>
            </div>
          </div>

          {/* Order Summary */}
          {orderSummary.length > 0 && (
  <div className="invoice p-4" ref={printRef}>
    <h4 className="text-center">NEPALI COFFEE</h4>
      <p className="text-muted text-center mb-4">Thank you for your purchase!</p>


    <table className="table border">
      <thead className="bg-light">
        <tr>
          <th>Item</th>
          <th>Qty</th>
          <th>Price (Rs)</th>
          <th>Total (Rs)</th>
        </tr>
      </thead>
      <tbody>
        {orderSummary.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
            <td>{item.price * item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="text-end d-flex justify-content-between mt-3">
    <small><strong>Date:</strong> {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</small>
    <h5><strong>Grand Total: Rs {orderSummary.reduce((acc, item) => acc + item.price * item.quantity, 0)}</strong></h5>
    </div>



  </div>
)}

        </div>
      </div>

    </>
  );
};

export default FoodCategory;
