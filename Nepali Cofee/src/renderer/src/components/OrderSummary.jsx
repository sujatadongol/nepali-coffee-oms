import React, { useRef, useState } from 'react'
import { CreditCardOutlined } from '@ant-design/icons'
import { useReactToPrint } from 'react-to-print'
import logo from '../assets/logo.png'
import '../../src/styles.css'
import {
  checkIfOrderIsPlaced,
  getOrdersWithOrderId,
  getSelectedTableDetail,
  getStandardizedDate,
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
    contentRef: printRef,
    documentTitle: 'customer-bill'
  })

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
            <PrintButton handlePrint={handlePrint} />
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
        
          {/* Order Summary */}
          <PlacedOrderList
            orderId={selectedTableOrderId}
            orderSummary={orderSummary}
            setOrderSummary={setOrderSummary}
          />
        </div>
      </div>

      <PaymentConfirmationModal
        openModal={paymentConfirmationModal}
        handleCancel={() => setPaymentConfirmationModal(false)}
        paymentAmount={getTotalAmount(orderSummary)}
        orderSummary={orderSummary}
        setOrderSummary={setOrderSummary}
        orderId={selectedTableOrderId}
        handleOk={() => {
          const paidOrders = { ...transactions };
          
          // Use the new, reliable date function
          const todayKey = getStandardizedDate();

          console.log({todayKey});
          if (paidOrders[todayKey]) {
              paidOrders[todayKey] = [
                  ...paidOrders[todayKey],
                  ...getOrdersWithOrderId(orderSummary, selectedTableOrderId)
              ];
          } else {
              paidOrders[todayKey] = [
                  ...getOrdersWithOrderId(orderSummary, selectedTableOrderId)
              ];
          }
          
          setTransactions(paidOrders);
          localStorage.setItem('transactionHistory', JSON.stringify(paidOrders));
          setPaymentConfirmationModal(false);
          setPaymentConfirmationStatus(true);
          clearOrder();
          handlePrint();
          onBack();
        }}
      />
    </>
  )
}

export default OrderSummary
