import React from 'react'
import '../../src/styles.css'
import { getTotalAmount } from '../helper'
import { NoData } from './elements/NoData'

const PlacedOrderList = ({ orderSummary, setOrderSummary, orderId, viewOnly }) => {
  const handleRemoveOrder = (id) => {
    setOrderSummary(
      (prevOrders) =>
        prevOrders
          .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
          .filter((item) => item.quantity > 0) // Remove only if quantity reaches 0
    )
  }

  return (
    <>
      {orderId && <div className="order-id">Order {orderId}</div>}

      <table
        style={{
          background: 'inherit',
          width: '100%',
          padding: '6px',
          margin: '5px 0'
        }}
      >
        <thead style={{ borderBottom: '1px solid', fontSize: '12px' }}>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Amount</th>
            <th className="non-printable" hidden={viewOnly}>
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          {orderSummary.length > 0 ? (
            orderSummary.map((item, index) => (
              <tr key={index} style={{ fontSize: '12px' }}>
                <td>
                  <div className="d-flex align-items-center" style={{ gap: '6px' }}>
                    <div className="non-printable">
                      <img src={item.imgSrc} alt="coffee image" className="coffee-icon" />
                    </div>
                    <div>{item.name}</div>
                  </div>
                </td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.quantity * item.price}</td>
                <td className="non-printable" hidden={viewOnly}>
                  <button
                    className="btn btn-sm btn-dark"
                    onClick={() => handleRemoveOrder(item.id)}
                  >
                    {' '}
                    -{' '}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">
                <NoData />
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {!viewOnly && (
        <div className="text-end d-flex justify-content-between mt-4">
          <small className="me-5">
            <strong>Date:</strong>{' '}
            {new Date().toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </small>
          <small>
            <strong>Total: </strong> Rs {getTotalAmount(orderSummary)}
          </small>
        </div>
      )}
    </>
  )
}

export default PlacedOrderList
