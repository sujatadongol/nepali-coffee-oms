import React, { useRef, useState } from 'react'
import { PrinterOutlined, CreditCardOutlined } from '@ant-design/icons'
import { useReactToPrint } from 'react-to-print'
import logo from '../assets/logo.png'
import '../../src/styles.css'
import { checkIfOrderIsPlaced, getSelectedTableDetail, getTotalAmount } from '../helper'
import PaymentConfirmationModal from './PaymentConfirmationModal'
import { getFormattedDate } from '../utils'
import PlacedOrderList from './PlacedOrderList'

const OrderSummary = ({
  selectedTableId,
  cafeTables,
  setCafeTables,
  onBack,
  orderSummary,
  setOrderSummary,
  transactions,
  setTransactions,
  setPaymentConfirmationStatus
}) => {
  const [paymentConfirmationModal, setPaymentConfirmationModal] = useState(false)
  const handleOrderPlacement = () => {
    setCafeTables((prevTables) =>
      prevTables.map((t) =>
        t.id === selectedTableId ? { ...t, available: false, orderItems: orderSummary } : t
      )
    )
    // onBack()
  }

  const clearOrder = () => {
    setCafeTables((prevTables) =>
      prevTables.map((t) =>
        t.id === selectedTableId ? { ...t, available: true, orderItems: [] } : t
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
          <h6>{getSelectedTableDetail(cafeTables, selectedTableId)?.name} - Order</h6>
        </div>
        {orderSummary.length > 0 && (
          <div className="d-flex" style={{ gap: '10px' }}>
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

            {checkIfOrderIsPlaced(cafeTables, selectedTableId) ? (
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
          <PlacedOrderList orderSummary={orderSummary} setOrderSummary={setOrderSummary} />
        </div>
      </div>

      <PaymentConfirmationModal
        openModal={paymentConfirmationModal}
        handleCancel={() => setPaymentConfirmationModal(false)}
        paymentAmount={getTotalAmount(orderSummary)}
        orderSummary={orderSummary}
        setOrderSummary={setOrderSummary}
        handleOk={() => {
          const paidOrders = { ...transactions }
          if (paidOrders[getFormattedDate()]) {
            paidOrders[getFormattedDate()] = [...paidOrders[getFormattedDate()], ...orderSummary]
          } else {
            paidOrders[getFormattedDate()] = [...orderSummary]
          }
          setTransactions(paidOrders)
          setPaymentConfirmationModal(false)
          setPaymentConfirmationStatus(true)
          clearOrder()
          onBack()
        }}
      />
    </>
  )
}

export default OrderSummary
