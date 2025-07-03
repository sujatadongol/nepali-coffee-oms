import React, { useRef, useState } from 'react'
import { CreditCardOutlined } from '@ant-design/icons'
import { useReactToPrint } from 'react-to-print'
import logo from '../assets/logo.png'
import '../../src/styles.css'
import {
  checkIfOrderIsPlaced,
  getOrdersWithOrderId,
  getSelectedTableDetail,
  getTotalAmount
} from '../helper'
import PaymentConfirmationModal from './PaymentConfirmationModal'
import { getFormattedDate } from '../utils'
import PlacedOrderList from './PlacedOrderList'
import { PrintButton } from './elements/PrintButton'

const OrderSummary = ({
  selectedTableId,
  cafeTables,
  setCafeTables,
  onBack,
  orderSummary,
  setOrderSummary,
  transactions,
  setTransactions,
  setPaymentConfirmationStatus,
  selectedTableOrderId
}) => {
  const [paymentConfirmationModal, setPaymentConfirmationModal] = useState(false)
  // New state for controlling VAT and Customer Name inclusion
  const [includeVatInBill, setIncludeVatInBill] = useState(false) // Default to false
  const [customerNameForBill, setCustomerNameForBill] = useState('')

  const handleOrderPlacement = () => {
    setCafeTables((prevTables) =>
      prevTables.map((t) =>
        t.id === selectedTableId ? { ...t, available: false, orderItems: orderSummary } : t
      )
    )
    // onBack() // Removed for now, as per previous discussions to stay on page
  }

  const clearOrder = () => {
    setCafeTables((prevTables) =>
      prevTables.map((t) =>
        t.id === selectedTableId ? { ...t, available: true, orderItems: [] } : t
      )
    )
    setOrderSummary([])
    // onBack() // Removed for now, as per previous discussions to stay on page
  }

  const printRef = useRef(null)

  const handlePrint = useReactToPrint({
    content: () => printRef.current, // Ensure content is a function that returns the ref
    documentTitle: 'customer-bill',
    // You can add more options here, like onAfterPrint
    onAfterPrint: () => {
      // Optional: Clear order or navigate back after printing
      // clearOrder();
      // onBack();
    },
  })

  // Calculate total amount for display and payment modal
  const currentTotalAmount = getTotalAmount(orderSummary);

  return (
    <>
      <div className="d-flex justify-content-between" style={{ marginBottom: '10px' }}>
        <h5 className="d-flex table-header">
          {getSelectedTableDetail(cafeTables, selectedTableId)?.name}
        </h5>
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
            {/* Print button will use the state of includeVatInBill and customerNameForBill */}
            <PrintButton handlePrint={handlePrint} />
          </div>
        )}
      </div>

      {/* Controls for VAT Bill and Customer Name (Moved here from PlacedOrderList) */}
      {orderSummary.length > 0 && ( // Only show controls if there's an order
        <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '8px', background: '#f9f9f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <input
              type="checkbox"
              id="includeVatCheckbox"
              checked={includeVatInBill}
              onChange={(e) => setIncludeVatInBill(e.target.checked)}
              style={{ marginRight: '10px' }}
            />
            <label htmlFor="includeVatCheckbox" style={{ fontWeight: 'bold', fontSize: '14px' }}>Include Customer Name & VAT in Bill</label>
          </div>

          {includeVatInBill && (
            <div>
              <label htmlFor="customerNameInput" style={{ display: 'block', marginBottom: '5px', fontSize: '12px', fontWeight: 'bold' }}>Customer Name:</label>
              <input
                type="text"
                id="customerNameInput"
                value={customerNameForBill}
                onChange={(e) => setCustomerNameForBill(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px' }}
                placeholder="Enter customer name"
              />
            </div>
          )}
        </div>
      )}

      <div
        style={{
          background: '#d8cfc66b',
          borderRadius: '8px',
          padding: '10px'
        }}
      >
        <div className="invoice" ref={printRef}>
          <div className="d-flex justify-content-center align-items-center">
            <img
              src={logo}
              style={{ width: '42px', objectFit: 'contain', margin: '6px 0 10px 0' }}
              alt="logo"
            />
          </div>
          {/* PlacedOrderList now receives the state from OrderSummary */}
          <PlacedOrderList
            orderId={selectedTableOrderId}
            orderSummary={orderSummary}
            setOrderSummary={setOrderSummary}
            viewOnly={true} // IMPORTANT: Bill for printing should always be viewOnly
            initialIncludeVat={includeVatInBill} // Pass the state controlling VAT inclusion
            initialCustomerName={customerNameForBill} // Pass the customer name state
          />
        </div>
      </div>

      <PaymentConfirmationModal
        openModal={paymentConfirmationModal}
        handleCancel={() => setPaymentConfirmationModal(false)}
        paymentAmount={currentTotalAmount} // Pass the calculated total
        orderSummary={orderSummary}
        setOrderSummary={setOrderSummary}
        orderId={selectedTableOrderId}
        handleOk={() => {
          const paidOrders = { ...transactions }
          if (paidOrders[getFormattedDate()]) {
            paidOrders[getFormattedDate()] = [
              ...paidOrders[getFormattedDate()],
              ...getOrdersWithOrderId(orderSummary, selectedTableOrderId)
            ]
          } else {
            paidOrders[getFormattedDate()] = [
              ...getOrdersWithOrderId(orderSummary, selectedTableOrderId)
            ]
          }
          setTransactions(paidOrders)
          localStorage.setItem('transactionHistory', JSON.stringify(paidOrders))
          setPaymentConfirmationModal(false)
          setPaymentConfirmationStatus(true)
          clearOrder()
          handlePrint() // Trigger print after payment confirmation
          onBack()
        }}
      />
    </>
  )
}

export default OrderSummary
