import React, { useState, useRef } from 'react'
import { Card, Button, InputNumber } from 'antd'
import { PlusOutlined, PrinterOutlined, MinusOutlined } from '@ant-design/icons'
import { useReactToPrint } from 'react-to-print'
import coffeeImage from '../assets/coffee.png'
import logo from '../assets/logo.png'
import '../../src/styles.css'

import coffeeCategories from '../dataModel';


const { Meta } = Card


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

  const handleBack = () => {
    onBack();
  }

  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef, // Use contentRef correctly
    documentTitle: "customer-bill",
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
          item.id === food.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...food, quantity }];
    });
  };

  const handleRemoveOrder = (id) => {
    setOrderSummary((prevOrders) =>
      prevOrders
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // Remove only if quantity reaches 0
    );
  };
  

  return (
    <>
      {/* Coffee Theme Styles */}

      <div className="row text-end ">
        <div className="col">
          <button
            onClick={handleOrderPlacement}
            className="btn btn-success me-2"
          >
            Place Order
          </button>
          <button
            onClick={handleBack}
            className="btn btn-outline-dark"
          >
            Back to Table
          </button>
        </div>
      </div>
      {/* Category Labels */}
      <div className="col-6 d-flex gap-4 my-3">
        {coffeeCategories.map((category) => (
          <div
            key={category.key}
            className={`col rounded-pill py-2 category-card ${
              selectedCategory === category.key ? "selected-category" : ""
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
                    className="coffee-card"
                    cover={
                      <img
                        alt={food.name}
                        src={food.imgSrc ? food.imgSrc : coffeeImage}
                      />
                    }
                  >
                    <Meta
                      title={<span className="coffee-title">{food.name}</span>}
                      description={
                        <span className="price">Rs {food.price}</span>
                      }
                    />
                    <div
                      className="d-flex mt-4"
                      style={{ justifyContent: "space-between" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {/* Decrease Button */}
                        <Button
                          className="counter-btn"
                          icon={<MinusOutlined />}
                          onClick={() =>
                            handleQuantityChange(
                              Math.max((quantities[food.id] || 1) - 1, 1),
                              food.id
                            )
                          }
                          style={{ borderRadius: "6px 0 0 6px" }}
                        />

                        {/* Quantity Display */}
                        <InputNumber
                          min={1}
                          max={20}
                          style={{ width: "45px", borderRadius: 0 }}
                          value={quantities[food.id] || 1}
                          onChange={(value) =>
                            handleQuantityChange(value, food.id)
                          }
                        />

                        {/* Increase Button */}
                        <Button
                          className="counter-btn"
                          icon={<PlusOutlined />}
                          onClick={() =>
                            handleQuantityChange(
                              (quantities[food.id] || 1) + 1,
                              food.id
                            )
                          }
                          style={{ borderRadius: "0 6px 6px 0" }}
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <Button
                          type="primary"
                          style={{
                            background: "#4B2E2E",
                            border: "none",
                          }}
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

        <div className="col-12 col-xs-12 col-md-4 col-lg-4">
          <div
            className="d-flex"
            style={{
              justifyContent: "space-between",
              paddingBottom: "10px",
            }}
          >
            <div>
              <h6>{table.name} - Order</h6>
            </div>
            <div>
              <button
                className="btn btn-sm btn-outline-dark"
                onClick={handlePrint}
              >
                <PrinterOutlined />
                <span className="h6 mx-1">Print</span>
              </button>
            </div>
          </div>
          <div
            style={{
              background: "#d8cfc66b",
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            <div className="invoice" ref={printRef}>
            <div className="text-center">
              <div className="d-flex justify-content-center align-items-center gap-2">
                <img src={logo} style={{ height: '60px', width: '60px', objectFit: 'contain' }} alt="logo" />
                <h5>Nepali Coffee</h5>
              </div>
            </div>

              {/* Order Summary */}
              {orderSummary.length > 0 && (
                <table 
                  style={{
                    background: "inherit",
                    width: "100%",
                    padding: "6px",
                  }}
                >
                  <thead
                    style={{ borderBottom: "1px solid", fontSize: "12px" }}
                  >
                    <tr>
                      <th className="non-printable">Image</th>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price (Rs)</th>
                      {/* <th>Total (Rs)</th> */}
                      <th className="non-printable">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderSummary.map((item, index) => (
                      <tr key={index} style={{ fontSize: "12px" }}>
                        <td className="non-printable"><img src={item.imgSrc} alt="coffee" className="coffee-icon"/></td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        {/* <td>{item.price * item.quantity}</td> */}
                        <td className="non-printable"><button className="btn btn-sm btn-dark" onClick={()=>handleRemoveOrder(item.id)}> - </button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className="text-end d-flex justify-content-between mt-4">
                <small>
                  <strong>Date:</strong>{" "}
                  {new Date().toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </small>
                <h6>
                  <strong>
                    Grand Total: Rs{" "}
                    {orderSummary.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0
                    )}
                  </strong>
                </h6>
              </div>
              <p className="text-muted text-center" style={{ paddingBottom: "14px" }}>
                Thank you for your purchase!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodCategory
