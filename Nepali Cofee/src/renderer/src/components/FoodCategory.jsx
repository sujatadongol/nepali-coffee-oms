import React, { useState, useEffect } from 'react';
import { Card, Button, InputNumber } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import coffeeImage from '../assets/coffee.png';
import '../../src/styles.css';
import OrderSummary from './OrderSummary';
import { getSelectedTableOrders } from '../helper';
import { Search } from './elements/Search/Search';
import { NoData } from './elements/NoData';
import coffeeCategories from '../dataModel';

const { Meta } = Card;

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
  const [searchValue, setSearchValue] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState(
    getSelectedTableOrders(cafeTables, selectedTableId) || []
  );
  const [selectedCategory, setSelectedCategory] = useState('');
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    // Build menu items from the imported coffeeCategories and attach a `category` field
    // so each item can be filtered by category in this component.
    const data = coffeeCategories.flatMap(category =>
      category.items.map(item => ({ ...item, category: category.key }))
    );

    // Set the derived items into state
    setMenuItems(data);

    // Set the first category as selected by default (use the first coffeeCategories key)
    const firstCategory = coffeeCategories[0]?.key || '';
    setSelectedCategory(firstCategory);
  }, []);

  const categories = [...new Set(menuItems.map(item => item.category))];

  const filteredItems = menuItems.filter(item =>
    (selectedCategory ? item.category === selectedCategory : true) &&
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleBack = () => {
    onBack();
  };

  const handleQuantityChange = (value, id) => {
    setQuantities(prev => ({ ...prev, [id]: value }));
  };

  const handleAddClick = (food) => {
    const quantity = quantities[food.id] || 1;
    setOrderSummary(prev => {
      const existingItem = prev.find(item => item.id === food.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === food.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...food, quantity }];
    });
  };

  return (
    <>
      <div className="d-flex gap-2">
        <Search
          searchValue={searchValue}
          setSearchValue={(value) => setSearchValue(value)}
        />
        <button onClick={handleBack} className="btn summary-btn btn-outline-dark">
          Back to Table
        </button>
      </div>

      {/* Category Chips */}
      <div className="d-flex gap-4 my-3 align-items-center" style={{ height: '40px' }}>
        {searchValue ? (
          <div>Showing results for: <strong>{searchValue}</strong></div>
        ) : (
          categories.map(category => (
            <div
              key={category}
              className={`rounded-pill category-card ${selectedCategory === category ? 'selected-category' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </div>
          ))
        )}
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="row" id="coffeeDisplay">
            {filteredItems.length > 0 ? (
              filteredItems.map((food) => (
                <div className="col-12 col-md-6 col-lg-4 mb-4" key={food.id}>
                  <Card
                    hoverable
                    className="coffee-card"
                    cover={
                      <img
                        className="food-image"
                        alt="food"
                        src={food.imgSrc || coffeeImage}
                      />
                    }
                  >
                    <Meta
                      title={<span className="coffee-title">{food.name}</span>}
                      description={<span className="price">Rs {food.price}</span>}
                    />
                    <div className="d-flex mt-4 justify-content-between">
                      <div className="d-flex align-items-center">
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
                        <InputNumber
                          min={1}
                          max={20}
                          style={{ width: '45px', borderRadius: 0 }}
                          value={quantities[food.id] || 1}
                          onChange={(value) => handleQuantityChange(value, food.id)}
                        />
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
                          style={{ background: '#4B2E2E', border: 'none' }}
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

        <div className="col-12 col-md-4">
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
  );
};

export default FoodCategory;
