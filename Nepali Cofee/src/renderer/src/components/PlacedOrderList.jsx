import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import '../../src/styles.css'
import { getTotalAmount } from '../helper'

const PlacedOrderList = ({ orderSummary, setOrderSummary, viewOnly }) => {
  const printRef = useRef(null)

  const handlePrint = useReactToPrint({
    contentRef: printRef, // Use contentRef correctly
    documentTitle: 'customer-bill'
  })

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
              <th className="non-printable">Image</th>
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
            {orderSummary.map((item, index) => (
              <tr key={index} style={{ fontSize: '12px' }}>
                <td className="non-printable">
                  <img src={item.imgSrc} alt="coffee" className="coffee-icon" />
                </td>
                <td>{item.name}</td>
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
            ))}
          </tbody>
        </table>
      )}
      {!viewOnly && (
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
            <strong>Grand Total: Rs {getTotalAmount(orderSummary)}</strong>
          </h6>
        </div>
      )}
    </>
  )
}

export default PlacedOrderList
