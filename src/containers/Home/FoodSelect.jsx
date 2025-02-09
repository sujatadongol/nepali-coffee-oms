import React, { useState } from "react";
import { Row, Col, InputNumber, Card, Button } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import FoodCategory from "./FoodCategory";

const { Meta } = Card;

const FoodSelect = ({ foodItems, onChange, makeOrder }) => {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (value, foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: value,
    }));
  };

  const handleAddClick = (food) => {
    const quantity = quantities[food.id] || 1; // Get the quantity directly from the state
    onChange({ ...food, quantity });
    makeOrder();
  };

  return (
    <div>
      {/* <FoodCategory /> */}
      <Row gutter={[16, 16]}>
        {foodItems.map((food) => (
          <Col span={8} key={food.id}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={<img alt={food.name} src="https://via.placeholder.com/150" />}
            >
              <Meta
                title={food.name}
                description={<span className="fw-bold" style={{ color: '#614beb' }}>Rs {food.price}</span>}
              />

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <InputNumber
                  min={1}
                  max={10}
                  value={quantities[food.id] || 1} 
                  onChange={(value) => handleQuantityChange(value, food.id)} 
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => handleAddClick(food)}
                >
                  Add
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FoodSelect;
