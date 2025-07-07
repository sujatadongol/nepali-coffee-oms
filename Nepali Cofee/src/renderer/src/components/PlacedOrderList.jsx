import React, { useState } from 'react'
import '../../src/styles.css'
import { getTotalAmount } from '../helper'
import { NoData } from './elements/NoData'
import logo from '../assets/logo.png'

const PlacedOrderList = ({
  orderSummary,
  setOrderSummary,
  orderId,
  viewOnly,
  restaurantName = 'NEPALI COFFEE',
  restaurantLocation = 'Dillibazar, Kathmandu',
  restaurantPan = '621262502'
}) => {
  // --- New State for Customer Name ---
  const [customerName, setCustomerName] = useState('')
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempCustomerName, setTempCustomerName] = useState('')

  const handleRemoveOrder = (id) => {
    setOrderSummary((prevOrders) =>
      prevOrders
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0) // Remove only if quantity reaches 0
    )
  }

  // --- Handlers for Customer Name Feature ---
  const handleSaveCustomerName = () => {
    setCustomerName(tempCustomerName.trim())
    setIsEditingName(false)
  }

  const handleAddCustomerClick = () => {
    setTempCustomerName(customerName) // Pre-fill input with current name for editing
    setIsEditingName(true)
  }

  const { subTotal, vatAmount, grandTotal } = getTotalAmount(orderSummary)

  return (
      <div className="row justify-content-center m-2">
          <div style={{ 
            background: 'white',
            border: '1px solid #ddd',
            fontFamily: 'monospace',
            fontSize: '14px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            
            {/* Header */}
            <div style={{ 
              textAlign: 'center', 
              padding: '15px 20px',
              borderBottom: '1px solid #ddd'
            }}>
              <img 
                src={logo} 
                style={{ width: '40px', marginBottom: '8px' }} 
                alt="logo" 
              />
              <div style={{ 
                fontSize: '16px', 
                fontWeight: 'bold',
                marginBottom: '2px'
              }}>
                {restaurantName}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {restaurantLocation}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                9851097831 / 9851208087 | PAN: {restaurantPan}
              
              </div>
            </div>

            {/* Bill Details */}
            <div style={{ padding: '10px 20px', fontSize: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Bill No: #{Date.now().toString().slice(-6)}</span>
                <span>Date: {new Date().toLocaleDateString('en-GB')}</span>
              </div>
              <div style={{ borderBottom: '1px dashed #ccc', paddingBottom: '8px' }}>
                {isEditingName ? (
                  <div className="d-flex align-items-center non-printable" style={{ gap: '5px' }}>
                    <input
                      type="text"
                      value={tempCustomerName}
                      onChange={(e) => setTempCustomerName(e.target.value)}
                      placeholder="Customer name"
                      className="form-control form-control-sm"
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveCustomerName()}
                      style={{ fontSize: '14px', height: '24px' }}
                    />
                    <button 
                      className="btn btn-sm btn-success" 
                      onClick={handleSaveCustomerName}
                      style={{ fontSize: '14px', padding: '2px 6px' }}
                    >
                      Save
                    </button>
                    <button 
                      className="btn btn-sm btn-secondary" 
                      onClick={() => setIsEditingName(false)}
                      style={{ fontSize: '14px', padding: '2px 6px' }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>
                      Customer: {customerName || 'Walk-in'}
                    </span>
                    {!viewOnly && (
                      <button
                        className="btn btn-link btn-sm non-printable"
                        style={{
                          fontSize: '14px',
                          padding: '0',
                          textDecoration: 'underline',
                          color: '#666'
                        }}
                        onClick={handleAddCustomerClick}
                      >
                        {customerName ? 'Edit' : 'Add Name'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Items */}
            <div style={{ padding: '0 20px' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
                gap: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                borderBottom: '1px solid #ddd',
                paddingBottom: '5px',
                marginBottom: '8px'
              }}>
                <div>ITEM</div>
                <div style={{ textAlign: 'center' }}>QTY</div>
                <div style={{ textAlign: 'right' }}>PRICE</div>
                <div style={{ textAlign: 'right' }}>TOTAL</div>
                <div className="non-printable" hidden={viewOnly}></div>
              </div>
              
              {orderSummary.length > 0 ? (
                orderSummary.map((item, index) => (
                  <div key={index} style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
                    gap: '8px',
                    fontSize: '14px',
                    paddingBottom: '6px',
                    borderBottom: index < orderSummary.length - 1 ? '1px dotted #eee' : 'none'
                  }}>
                    <div className="d-flex align-items-center" style={{ gap: '6px' }}>
                      <img 
                        src={item.imgSrc} 
                        alt="item" 
                        className="non-printable"
                        style={{ 
                          width: '20px',
                          height: '20px',
                          borderRadius: '3px'
                        }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <div style={{ textAlign: 'center' }}>{item.quantity}</div>
                    <div style={{ textAlign: 'right' }}>{item.price.toFixed(2)}</div>
                    <div style={{ textAlign: 'right', fontWeight: '500' }}>
                      {(item.quantity * item.price).toFixed(2)}
                    </div>
                    <div className="non-printable" hidden={viewOnly}>
                      <button
                        className="btn btn-sm bg-dark text-white"
                        onClick={() => handleRemoveOrder(item.id)}
                        style={{ 
                          fontSize: '14px',
                          padding: '1px 4px',
                          color: '#dc3545'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <NoData />
              )}
            </div>

            {/* Totals */}
            <div style={{ 
              padding: '15px 20px',
              borderTop: '1px solid #ddd',
              marginTop: '10px'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '14px',
                marginBottom: '4px'
              }}>
                <span>Subtotal:</span>
                <span>Rs {subTotal.toFixed(2)}</span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '14px',
                marginBottom: '8px',
                color: '#666'
              }}>
                <span>VAT (13%):</span>
                <span>Rs {vatAmount.toFixed(2)}</span>
              </div>
              
              <div style={{ 
                borderTop: '1px dashed #333',
                paddingTop: '8px',
                marginTop: '8px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}>
                  <span>TOTAL:</span>
                  <span>Rs {grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div style={{ 
              textAlign: 'center', 
              padding: '15px 20px',
              borderTop: '1px solid #ddd',
              fontSize: '14px',
              color: '#666'
            }}>
              <div style={{ marginBottom: '5px' }}>
                Thank you! Please visit again.
              </div>
            </div>
            
          </div>
      </div>
  )
}

export default PlacedOrderList