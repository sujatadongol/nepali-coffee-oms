import React from 'react'
import PlacedOrderList from '../PlacedOrderList'
import './report.css'

const OrderView = ({ orderDetail, filteredOrders }) => {
  return (
    <div className="order-wrapper">
      <div className="d-flex justify-content-between order-header">
        <div className="d-flex">
          Order:
          <div className="orderId">{orderDetail.orderId}</div>
        </div>
        <div className="d-flex">
          Total: <div className="total-amount">{orderDetail.total}</div>
        </div>
      </div>

      <div className="order-list-wrapper">
        <PlacedOrderList orderSummary={filteredOrders} viewOnly />
      </div>
    </div>
  )
}

export default OrderView
