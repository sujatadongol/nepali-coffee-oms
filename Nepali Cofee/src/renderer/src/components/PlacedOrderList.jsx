import React from 'react'
import '../../src/styles.css'
import { getTotalAmount } from '../helper'

const PlacedOrderList = ({ orderSummary, setOrderSummary, viewOnly }) => {
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
        <table
          style={{
            background: 'inherit',
            width: '100%',
            padding: '6px',
            margin: '20px 0'
          }}
        >
          <thead style={{ borderBottom: '1px solid', fontSize: '12px' }}>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price (Rs)</th>
              {/* <th>Total (Rs)</th> */}
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
                <img src={item.imgSrc} alt="coffee" className="coffee-icon" />
              </div>
              <div>{item.name}</div>
            </div>
          </td>
          <td>{item.quantity}</td>
          <td>{item.price}</td>
          {/* <td>{item.price * item.quantity}</td> */}
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
        <td colSpan="4" style={{ textAlign: 'center', padding: '50px 0', fontSize: '14px'}}>
          No data
        </td>
      </tr>
    )}
          </tbody>
        </table>
    
      {!viewOnly && (
        <div className="text-end d-flex justify-content-between mt-4">
          <small className='me-5'>
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
