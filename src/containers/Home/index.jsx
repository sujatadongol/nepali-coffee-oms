import React from "react";
import useHomeHooks from "./useHomeHooks";
import styled from "styled-components";
import { Select } from "antd";
import FoodSelect from "./FoodSelect";
import OrderSystem from "./OrderSystem";
import {  UserOutlined  } from "@ant-design/icons";

const { Option } = Select;

const HomeWrapper = styled.div`
  .list-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  padding: 30px;
  .one-table {
    padding: 20px;
    display: flex;
    align-items: center;
    text-align: center;
    border: 1px solid grey;
    cursor: pointer;
    &:hover {
      background-color: #f7e7b3;
    }
  }
`;
const Home = () => {
  const {
    cafeTables,
    selectedTable,
    setSelectedTable,
    selectOrderFunc,
    foodItems,
    makeOrder,
  } = useHomeHooks();
  return (
    <HomeWrapper>
      {selectedTable ? (
        <>
          <button className="btn btn-dark" onClick={() => setSelectedTable(undefined)}>Close</button>
          <div><h3 className="my-3">{selectedTable?.name}</h3></div>
          <div className="row d-flex">
            <div className="col-6">
              <FoodSelect
                onChange={(item) => selectOrderFunc(item)}
                foodItems={foodItems}
                makeOrder={makeOrder}
              />
            </div>
            <div className="col-6">
              <OrderSystem
                selectedTable={cafeTables?.find(
                  (tab) => tab?.id === selectedTable?.id
                )}
              />
            </div>
          </div>
         
          
        </>
      ) : (
        <div className="list-wrapper">
        <h2>Nepali Coffee</h2>
        <div className="row">
          {cafeTables?.map((one) => (
            <div
              key={one?.id}
              className='col-md-3 m-4' // Adds different background color based on availability
              onClick={() => setSelectedTable(one)}
              style={{
                padding: '20px',
                width: '300px',
                height: '150px',
                textAlign: 'center',
                cursor: 'pointer',
                borderRadius: '8px',
                background: !one.available ? '#cbcbcb' : '#88a3f2',
                border: !one.available ? '1px solidrgb(0, 97, 32)' : '1px solid #604be8',
              }}
            >
              <h5>{one?.name}</h5>
              <span>{one.available ? 'Available' : 'Occupied'}</span>
              <div><UserOutlined /> {one.capacity}</div>
            </div>
          ))}
        </div>
      </div>
      
      )}
    </HomeWrapper>
  );
};

export default Home;
