import React, { useState } from 'react'
import { Card, Button, InputNumber } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import coffeeImage from '../assets/coffee.png'
import '../../src/styles.css'
import coffeeCategories from '../dataModel'
import OrderSummary from './OrderSummary'
import { getItemsToDisplay, getSelectedTableOrders } from '../helper'
import { Search } from './elements/Search/Search'
import { NoData } from './elements/NoData'

const { Meta } = Card

const FoodCategory = ({
  selectedTableId,
  cafeTables,
  setCafeTables,
  onBack,
  transactions,
  setTransactions,
  setPaymentConfirmationStatus,
  selectedTableOrderId
}) => {
  const [searchValue, setSearchValue] = useState('')
  const [orderSummary, setOrderSummary] = useState(
    getSelectedTableOrders(cafeTables, selectedTableId) || []
  )
  const [selectedCategory, setSelectedCategory] = useState('Black Coffee')
  const [quantities, setQuantities] = useState({})

  const handleBack = () => {
    onBack()
  }

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
      <div className="d-flex gap-2">
        <Search
          searchValue={searchValue}
          setSearchValue={(value) => {
            setSearchValue(value)
          }}
        />
        <button onClick={handleBack} className="btn summary-btn btn-outline-dark">
          Back to Table
        </button>
      </div>
      {/* Category Labels (Category Chips) */}

      <div className="d-flex gap-4 my-3 align-items-center" style={{ height: '40px' }}>
        {searchValue ? (
          <div> Searched Items </div>
        ) : (
          coffeeCategories.map((category) => (
            <div
              key={category.key}
              className={`rounded-pill category-card ${
                selectedCategory === category.key ? 'selected-category' : ''
              }`}
              onClick={() => setSelectedCategory(category.key)}
            >
              {category.label}
            </div>
          ))
        )}
      </div>

      <div className="row">
        <div className="col-md-8">
          {/* Display food items */}
          <div className="row" id="coffeeDisplay">
            {getItemsToDisplay(coffeeCategories, selectedCategory, searchValue).length > 0 ? (
              getItemsToDisplay(coffeeCategories, selectedCategory, searchValue).map((food) => (
                <div className="col-12 col-md-6 col-lg-4 mb-4" key={food.id}>
                  <Card
                    hoverable
                    className="coffee-card"
                    cover={
                      <img
                        className="food-image"
                        alt="coffee image"
                        src={food.imgSrc ? food.imgSrc : coffeeImage}
                      />
                    }
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
              ))
            ) : (
              <NoData height={'100%'} />
            )}
          </div>
        </div>

        <div className="col-12 col-xs-12 col-md-4 col-lg-4">
          <OrderSummary
            selectedTableId={selectedTableId}
            cafeTables={cafeTables}
            setCafeTables={setCafeTables}
            onBack={onBack}
            orderSummary={orderSummary}
            setOrderSummary={setOrderSummary}
            transactions={transactions}
            setTransactions={setTransactions}
            setPaymentConfirmationStatus={setPaymentConfirmationStatus}
            selectedTableOrderId={selectedTableOrderId}
          />
        </div>
      </div>
    </>
  )
}

export default FoodCategory
