import React, { useState } from 'react'
import '../../src/styles.css' // Assuming this contains your base styles
import { getTotalAmount } from '../helper' // Assumed to calculate subtotal
import { NoData } from './elements/NoData' // Assuming this component exists

const PlacedOrderList = ({
  orderSummary,
  setOrderSummary,
  orderId,
  viewOnly,
  restaurantName = 'Nepali Coffee', 
  restaurantLocation = 'Dillibazar, Kathmandu',
  restaurantPan = '621262502',
  vatPercentage = 13, // Default VAT percentage for Nepal
  // Renamed prop to clarify it's an initial value, not a direct control
  initialCustomerName = '', 
  initialIncludeVat = true, // CHANGED: Default to true to show VAT/Customer by default
}) => {
  // Internal state for controlling VAT bill options
  const [showVatBill, setShowVatBill] = useState(initialIncludeVat)
  const [customerInputName, setCustomerInputName] = useState(initialCustomerName)

  const handleRemoveOrder = (id) => {
    setOrderSummary(
      (prevOrders) =>
        prevOrders
          .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
          .filter((item) => item.quantity > 0) // Remove only if quantity reaches 0
    )
  }

  // Calculate subtotal using the helper
  const subTotal = getTotalAmount(orderSummary)
  
  // Conditionally calculate VAT amount based on internal state
  const vatAmount = showVatBill ? subTotal * (vatPercentage / 100) : 0
  
  // Calculate Grand Total
  const grandTotal = subTotal + vatAmount

  return (
    <div
      style={{
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: '400px', // Constrain width for a bill-like appearance
        margin: '20px auto', // Center the bill
        fontFamily: 'sans-serif', // Ensure a clean font
      }}
    >
      {/* Restaurant Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '1px dashed #ccc', paddingBottom: '15px' }}>
        <h2 style={{ margin: '0', fontSize: '20px', color: '#333' }}>{restaurantName}</h2>
        <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#666' }}>{restaurantLocation}</p>
        {showVatBill && <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#666' }}>PAN: {restaurantPan}</p>} {/* Conditionally display PAN */}
        {orderId && <p style={{ margin: '10px 0 0', fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Order ID: {orderId}</p>}
        {showVatBill && customerInputName && <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#666' }}>Customer: {customerInputName}</p>} {/* Conditionally display Customer Name */}
        <p style={{ margin: '5px 0 0', fontSize: '11px', color: '#666' }}>Date: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
      </div>

      <table
        style={{
          background: 'inherit',
          width: '100%',
          padding: '6px',
          margin: '5px 0',
          borderCollapse: 'collapse', // Ensure borders collapse nicely
        }}
      >
        <thead style={{ borderBottom: '1px solid #ddd', fontSize: '12px', color: '#555' }}>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px 0' }}>Item</th>
            <th style={{ textAlign: 'center', padding: '8px 0' }}>Qty</th>
            <th style={{ textAlign: 'right', padding: '8px 0' }}>Price</th>
            <th style={{ textAlign: 'right', padding: '8px 0' }}>Amount</th>
            <th className="non-printable" hidden={viewOnly} style={{ textAlign: 'center', padding: '8px 0' }}>
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          {orderSummary.length > 0 ? (
            orderSummary.map((item) => (
              <tr key={item.id} style={{ fontSize: '12px', borderBottom: '1px dashed #eee' }}>
                <td style={{ textAlign: 'left', padding: '8px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div className="non-printable">
                      {/* Assuming coffee-icon class styles the image */}
                      <img src={item.imgSrc} alt="coffee icon" className="coffee-icon" style={{ width: '20px', height: '20px', borderRadius: '4px' }} />
                    </div>
                    <div>{item.name}</div>
                  </div>
                </td>
                <td style={{ textAlign: 'center', padding: '8px 0' }}>{item.quantity}</td>
                <td style={{ textAlign: 'right', padding: '8px 0' }}>Rs {item.price.toFixed(2)}</td>
                <td style={{ textAlign: 'right', padding: '8px 0' }}>Rs {(item.quantity * item.price).toFixed(2)}</td>
                <td className="non-printable" hidden={viewOnly} style={{ textAlign: 'center', padding: '8px 0' }}>
                  <button
                    className="btn btn-sm btn-dark" // Assuming these classes provide basic button styling
                    onClick={() => handleRemoveOrder(item.id)}
                    style={{
                      background: '#dc3545', // Red for remove
                      color: 'white',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '10px',
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px 0' }}>
                <NoData />
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Summary Section */}
      <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px dashed #ccc', fontSize: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span>Subtotal:</span>
          <span style={{ fontWeight: 'bold' }}>Rs {subTotal.toFixed(2)}</span>
        </div>
        {showVatBill && ( // Conditionally display VAT line
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span>VAT ({vatPercentage}%):</span>
            <span style={{ fontWeight: 'bold' }}>Rs {vatAmount.toFixed(2)}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
          <span>Grand Total:</span>
          <span>Rs {grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Controls for VAT Bill and Customer Name */}
      {!viewOnly && ( // Only show controls if not in view-only mode
        <div style={{ marginTop: '30px', paddingTop: '15px', borderTop: '1px solid #eee', textAlign: 'center' }}>
          <button
            onClick={() => setShowVatBill(!showVatBill)}
            style={{
              background: showVatBill ? '#ffc107' : '#007bff', // Toggle color
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
            }}
          >
            {showVatBill ? 'Hide VAT Bill Options' : 'Generate VAT Bill'}
          </button>

          {showVatBill && (
            <div style={{ marginTop: '15px' }}>
              <label htmlFor="customerNameInput" style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: 'bold' }}>Customer Name:</label>
              <input
                type="text"
                id="customerNameInput"
                value={customerInputName}
                onChange={(e) => setCustomerInputName(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px' }}
                placeholder="Enter customer name"
              />
            </div>
          )}
        </div>
      )}

      {/* Footer / Thank You message */}
      <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '12px', color: '#666' }}>
        <p>Thank you for your order!</p>
        <p>Please visit us again.</p>
      </div>
    </div>
  )
}

export default PlacedOrderList
