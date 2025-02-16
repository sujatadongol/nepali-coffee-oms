import React, { useState, useRef } from 'react'
import { Card, Button, InputNumber } from 'antd'
import { PlusOutlined, PrinterOutlined, MinusOutlined } from '@ant-design/icons'
import { useReactToPrint } from 'react-to-print'
import coffeeImage from '../assets/coffee.png'
import espresso from '../assets/espresso.jpg'
import espressoMachiato from '../assets/espressoMacchiato.jpg'
import americano from '../assets/americano.jpeg'
import flovouredAmericano from '../assets/flovouredAmericano.jpeg'
import cafelatte from '../assets/cafelatte.jpg'
import masalalattee from '../assets/masalalattee.png'
import caramelLatte from '../assets/caramelLatte.jpeg'
import honeylatte from '../assets/honeylatte.jpeg'
import capuccino from '../assets/capuccino.jpeg'


const { Meta } = Card

const coffeeCategories = [
  {
    key: "Black Coffee",
    label: "Black Coffee",
    items: [
      { id: "c1", name: "Single Shot Espresso", price: 110, imgSrc: espresso },
      { id: "c2", name: "Double Shot Espresso", price: 140, imgSrc: espresso },
      { id: "c3", name: "Espresso Macchiato", price: 140, imgSrc: espressoMachiato },
      { id: "c4", name: "Single Shot Americano", price: 120, imgSrc: americano },
      { id: "c5", name: "Double Shot Americano", price: 140, imgSrc: americano },
      { id: "c6", name: "Flavored Americano", price: 180, imgSrc: flovouredAmericano }
    ]
  },
  {
    key: "Milk Coffee",
    label: "Milk Coffee",
    items: [
      { id: "c7", name: "Cafe Latte", price: 165, imgSrc: cafelatte },
      { id: "c8", name: "Masala Latte", price: 190, imgSrc: masalalattee },
      { id: "c9", name: "Caramel Latte", price: 225, imgSrc: caramelLatte },
      { id: "c10", name: "Honey Latte", price: 225, imgSrc: honeylatte },
      { id: "c11", name: "Cappuccino", price: 155, imgSrc: capuccino },
      { id: "c12", name: "Flavored Cappuccino", price: 195, imgSrc: coffeeImage },
      { id: "c13", name: "Cafe Mocha", price: 210, imgSrc: coffeeImage },
      { id: "c14", name: "Caramel Macchiato", price: 190, imgSrc: coffeeImage },
      { id: "c15", name: "Mocha Madness", price: 265, imgSrc: coffeeImage },
      { id: "c16", name: "French Latte", price: 265, imgSrc: coffeeImage }
    ]
  },
  {
    key: "Coffee Alternatives",
    label: "Alternatives",
    items: [
      { id: "c17", name: "Hot Chocolate", price: 195, imgSrc: coffeeImage },
      { id: "c18", name: "Hot Lemon", price: 60, imgSrc: coffeeImage },
      { id: "c19", name: "Honey Hot Lemon", price: 160, imgSrc: coffeeImage },
      { id: "c20", name: "Ginger Hot Lemon", price: 95, imgSrc: coffeeImage },
      { id: "c21", name: "Ginger Honey Hot Lemon", price: 170, imgSrc: coffeeImage },
      { id: "c22", name: "Steamed Milk", price: 105, imgSrc: coffeeImage },
      { id: "c23", name: "Milk Tea", price: 80, imgSrc: coffeeImage },
      { id: "c24", name: "Black Tea", price: 50, imgSrc: coffeeImage },
      { id: "c25", name: "Green Tea", price: 70, imgSrc: coffeeImage }
    ]
  },
  {
    key: "Cold Coffee",
    label: "Cold Coffee",
    items: [
      { id: "c26", name: "Iced Americano", price: 190, imgSrc: coffeeImage },
      { id: "c27", name: "Iced Flavored Americano", price: 205, imgSrc: coffeeImage },
      { id: "c28", name: "Iced Latte", price: 199, imgSrc: coffeeImage },
      { id: "c29", name: "Iced Flavored Latte", price: 220, imgSrc: coffeeImage },
      { id: "c30", name: "Iced Flavored Macchiato", price: 220, imgSrc: coffeeImage },
      { id: "c31", name: "Blended Mocha", price: 285, imgSrc: coffeeImage },
      { id: "c32", name: "Blended Vanilla Mocha", price: 325, imgSrc: coffeeImage },
      { id: "c33", name: "Flavoured Blended Mocha", price: 325, imgSrc: coffeeImage }
    ]
  }
];

const FoodCategory = ({ table, setCafeTables, onBack }) => {
  const [orderSummary, setOrderSummary] = useState(table.orderItems || [])
  const [selectedCategory, setSelectedCategory] = useState('Black Coffee')
  const [quantities, setQuantities] = useState({})

  const handleOrderPlacement = () => {
    setCafeTables((prevTables) =>
      prevTables.map((t) =>
        t.id === table.id ? { ...t, available: false, orderItems: orderSummary } : t
      )
    )
    onBack()
  }

  const printRef = useRef(null)

  const handlePrint = useReactToPrint({
    contentRef: printRef, // Use contentRef correctly
    documentTitle: 'customer-bill'
  })

  const handleQuantityChange = (value, id) => {
    setQuantities((prev) => ({ ...prev, [id]: value }))
  }

  const handleAddClick = (food) => {
    const quantity = quantities[food.id] || 1
    setOrderSummary((prev) => {
      const existingItem = prev.find((item) => item.id === food.id)
      if (existingItem) {
        return prev.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...prev, { ...food, quantity }]
    })
  }

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
          <button onClick={handleOrderPlacement} className="btn btn-success me-2">
            Place Order
          </button>
          <button onClick={handleOrderPlacement} className="btn btn-outline-dark">
            Back
          </button>
        </div>
      </div>
      {/* Category Labels */}
      <div className="col-6 d-flex gap-4 my-3">
        {coffeeCategories.map((category) => (
          <div
            key={category.key}
            className={`col rounded-pill py-2 category-card ${selectedCategory === category.key ? 'selected-category' : ''
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
                    cover={<img alt={food.name} src={food.imgSrc ? food.imgSrc : coffeeImage} />}
                  >
                    <Meta
                      title={<span className="coffee-title">{food.name}</span>}
                      description={<span className="price">Rs {food.price}</span>}
                    />
                    <div className="d-flex mt-4" style={{ justifyContent: 'space-between' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
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
                          style={{ borderRadius: '6px 0 0 6px' }}
                        />

                        {/* Quantity Display */}
                        <InputNumber
                          min={1}
                          max={20}
                          style={{ width: '45px', borderRadius: 0 }}
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
                          style={{ borderRadius: '0 6px 6px 0' }}
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <Button
                          type="primary"
                          style={{
                            background: '#4B2E2E',
                            border: 'none'
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

        <div className="col-4 ">
          <div
            className="d-flex"
            style={{
              justifyContent: 'space-between',
              paddingBottom: '10px'
            }}
          >
            <div>
              <h5>{table.name} - Order</h5>
            </div>
            <div>
              <button className="btn btn-sm btn-outline-dark" onClick={handlePrint}>
                <PrinterOutlined />
                <span className="h6 mx-1">Print</span>
              </button>
            </div>
          </div>
          <div
            style={{
              background: '#d8cfc66b',
              borderRadius: '8px',
              padding: '10px'
            }}
          >
            <div className="invoice" ref={printRef}>
              <h5 className="text-center">NEPALI COFFEE</h5>
              <p className="text-muted text-center " style={{ paddingBottom: '14px' }}>
                Thank you for your purchase!
              </p>
              {/* Order Summary */}
              {orderSummary.length > 0 && (
                <table
                  style={{
                    background: 'inherit',
                    width: '100%',
                    padding: '6px'
                  }}
                >
                  <thead style={{ borderBottom: '1px solid', fontSize: '12px' }}>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price (Rs)</th>
                      <th>Total (Rs)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderSummary.map((item, index) => (
                      <tr key={index} style={{ fontSize: '12px' }}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className="text-end d-flex justify-content-between mt-4">
                <small>
                  <strong>Date:</strong>{' '}
                  {new Date().toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </small>
                <h6>
                  <strong>
                    Grand Total: Rs{' '}
                    {orderSummary.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                  </strong>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FoodCategory
