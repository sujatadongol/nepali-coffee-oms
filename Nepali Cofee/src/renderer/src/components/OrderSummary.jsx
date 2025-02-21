import React, { useRef, useState } from 'react'
import { PrinterOutlined, CreditCardOutlined } from '@ant-design/icons'
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

  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "customer-bill"
  });
  

  return (
    <>
     <div className='row'>
      <div className="col">
      <h6>{getSelectedTableDetail(cafeTables, selectedTableId)?.name} </h6>
      <p>Order {selectedTableOrderId}</p>
      </div>
      {orderSummary.length > 0 && (
          <div className="col d-flex" style={{ gap: '10px' }}>
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
            <div className="d-flex justify-content-center align-items-center gap-2 pt-3">
              <img src={logo} style={{ width: '30px', objectFit: 'contain' }} alt="logo" />
              <h5>NEPALI COFFEE</h5>
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
          handlePrint()
          onBack()
        }}
      />
    </>
  )
}

export default OrderSummary
