import React, { useState } from "react";
import { Row, Col, Card, Button, InputNumber } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const { Meta } = Card;

const coffeeCategories = [
  {
    key: "Black Coffee",
    label: "Black Coffee",
    items: [
      { id: "c1", name: "Single Espresso", price: 110 },
      { id: "c2", name: "Double Espresso", price: 140 },
      { id: "c3", name: "Espresso Macchiato", price: 130 },
      { id: "c4", name: "Flavored Americano", price: 150 },
    ],
  },
  {
    key: "Milk Coffee",
    label: "Milk Coffee",
    items: [
      { id: "c5", name: "Cappuccino", price: 160 },
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

const FoodCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState("Black Coffee");
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (value, id) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddClick = (food) => {
    console.log("Added:", food.name, "Quantity:", quantities[food.id] || 1);
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
            background: #E6D5B8; /* Coffee Foam */
          }

          .category-card:hover, .selected-category {
            border-color: #4B2E2E !important;
            background: #C89F77 !important; /* Golden */
            color: white;
          }

          .coffee-card {
            background: #F8EDE3;
            border-radius: 8px;
            box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
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
        `}
      </style>

      {/* Custom Cards for Categories */}
      <div className="row d-flex gap-4 my-3">
        {coffeeCategories.map((category) => (
          
              <div className={`col rounded-pill py-2 category-card ${selectedCategory === category.key ? "selected-category" : ""}`} onClick={() => setSelectedCategory(category.key)}>{category.label}</div>
           
        ))}
        </div>

      {/* Display food items */}
      <Row gutter={[16, 16]}>
        {coffeeCategories
          .find((category) => category.key === selectedCategory)
          ?.items.map((food) => (
            <Col span={8} key={food.id}>
              <Card
                hoverable
                className="coffee-card"
                cover={<img alt={food.name} src="https://via.placeholder.com/150" />}
              >
                <Meta
                  title={<span className="coffee-title">{food.name}</span>}
                  description={
                    <span className="price">Rs {food.price}</span>
                  }
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                    alignItems: "center",
                  }}
                >
                  {/* Decrease Button */}
                  <Button
                    className="counter-btn"
                    icon={<MinusOutlined />}
                    onClick={() =>
                      handleQuantityChange(Math.max((quantities[food.id] || 1) - 1, 1), food.id)
                    }
                  />

                  {/* Quantity Display */}
                  <InputNumber
                    min={1}
                    max={10}
                    value={quantities[food.id] || 1}
                    onChange={(value) => handleQuantityChange(value, food.id)}
                  />

                  {/* Increase Button */}
                  <Button
                    className="counter-btn"
                    icon={<PlusOutlined />}
                    onClick={() =>
                      handleQuantityChange((quantities[food.id] || 1) + 1, food.id)
                    }
                  />
                </div>
                <Button
                  type="primary"
                  style={{
                    marginTop: "10px",
                    background: "#4B2E2E",
                    border: "none",
                  }}
                  icon={<PlusOutlined />}
                  onClick={() => handleAddClick(food)}
                >
                  Add to Cart
                </Button>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default FoodCategory;
