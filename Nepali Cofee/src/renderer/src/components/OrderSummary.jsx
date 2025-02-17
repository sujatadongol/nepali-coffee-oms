import React, { useRef, useState } from 'react'
import { PrinterOutlined, CreditCardOutlined, FileDoneOutlined } from '@ant-design/icons'
import { useReactToPrint } from 'react-to-print'
import logo from '../assets/logo.png'
import '../../src/styles.css'
import { checkIfOrderIsPlaced, getTotalAmount } from '../helper'
import PaymentConfirmationModal from './PaymentConfirmationModal'
import { getFormattedDate } from '../utils'

const OrderSummary = ({
  table,
  cafeTables,
  setCafeTables,
  onBack,
  orderSummary,
  setOrderSummary,
  transactions,
  setTransactions
}) => {
  const [paymentConfirmationModal, setPaymentConfirmationModal] = useState(false)
  const handleOrderPlacement = () => {
    setCafeTables((prevTables) =>
      prevTables.map((t) =>
        t.id === table.id ? { ...t, available: false, orderItems: orderSummary } : t
      )
    )
    // onBack()
  }

  const clearOrder = () => {
    setCafeTables((prevTables) =>
      prevTables.map((t) =>
        t.id === table.id ? { ...t, available: true, hasPaid: false, orderItems: [] } : t
      )
    )
    setOrderSummary([])
    // onBack()
  }

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
      <div
        className="d-flex"
        style={{
          justifyContent: 'space-between',
          paddingBottom: '10px'
        }}
      >
        <div>
          <h6>{table.name} - Order</h6>
        </div>
        {orderSummary.length > 0 && (
          <div className="d-flex" style={{ gap: '10px' }}>
            {console.log({ cafeTables, table })}
            {orderSummary.hasPaid ? (
              <button
                onClick={() => {
                  setPaymentConfirmationModal(true)
                }}
                className="btn d-flex summary-btn btn-success"
                style={{ gap: '8px', minWidth: '80px' }}
              >
                <div>
                  <FileDoneOutlined />
                </div>{' '}
                <div>Paid</div>
              </button>
            ) : (
              <button
                onClick={() => {
                  setPaymentConfirmationModal(true)
                }}
                className="btn d-flex summary-btn btn-primary"
                style={{ gap: '8px', minWidth: '80px' }}
              >
                <div>
                  <CreditCardOutlined />
                </div>{' '}
                <div>Pay</div>
              </button>
            )}
            {checkIfOrderIsPlaced(cafeTables, table) ? (
              <button onClick={clearOrder} className="btn summary-btn btn-danger ">
                Clear Order
              </button>
            ) : (
              <button onClick={handleOrderPlacement} className="btn summary-btn btn-primary">
                Place Order
              </button>
            )}
            <button
              className="btn btn-sm summary-btn btn-outline-dark"
              onClick={handlePrint}
              style={{ width: '34px' }}
            >
              <PrinterOutlined />
            </button>
          </div>
        )}
      </div>
      <div
        style={{
          background: '#d8cfc66b',
          borderRadius: '8px',
          padding: '10px'
        }}
      >
        <div className="invoice" ref={printRef}>
          <div className="text-center">
            <div className="d-flex justify-content-center align-items-center gap-2">
              <img src={logo} style={{ width: '30px', objectFit: 'contain' }} alt="logo" />
              <h5>Nepali Coffee</h5>
            </div>
          </div>

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
                  <th className="non-printable">Image</th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price (Rs)</th>
                  {/* <th>Total (Rs)</th> */}
                  <th className="non-printable">Remove</th>
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
                    <td className="non-printable">
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
          <p className="text-muted text-center" style={{ paddingBottom: '14px' }}>
            Thank you for your purchase!
          </p>
        </div>
      </div>

      <PaymentConfirmationModal
        openModal={paymentConfirmationModal}
        handleCancel={() => setPaymentConfirmationModal(false)}
        paymentAmount={getTotalAmount(orderSummary)}
        handleOk={() => {
          const paidOrders = { ...transactions }
          if (paidOrders[getFormattedDate()]) {
            paidOrders[getFormattedDate()] = [...paidOrders[getFormattedDate()], ...orderSummary]
          } else {
            paidOrders[getFormattedDate()] = [...orderSummary]
          }
          setTransactions(paidOrders)
          setPaymentConfirmationModal(false)
          setCafeTables((prevTables) =>
            prevTables.map((t) => (t.id === table.id ? { ...t, hasPaid: true } : t))
          )
          setOrderSummary({ ...prevOrders, hasPaid: true })
        }}
      />
    </>
  )
}

export default OrderSummary
