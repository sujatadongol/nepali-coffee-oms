import React from 'react'
import ModalElement from './elements/Modal'
import { CreditCardOutlined } from '@ant-design/icons'
import PlacedOrderList from './PlacedOrderList'

const PaymentConfirmationModal = ({
  openModal,
  handleOk,
  handleCancel,
  paymentAmount,
  orderSummary,
  setOrderSummary
}) => {
  return (
    <ModalElement
      width={750}
      openModal={openModal}
      handleCancel={handleCancel}
      modalBody={
        <div className="row">
          <div
            className="col-6"
            style={{
              borderRight: '1px solid',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <PlacedOrderList
              orderSummary={orderSummary}
              setOrderSummary={setOrderSummary}
              viewOnly
            />
          </div>
          <div
            className="col-6"
            style={{
              padding: '15px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <CreditCardOutlined style={{ fontSize: '48px', color: '#b4b4b4' }} />
            </div>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ fontSize: '24px', marginBottom: '10px' }}
            >
              Your total is{' '}
              <span
                style={{ color: '#376af5', marginLeft: '4px', fontWeight: 600, fontSize: '28px' }}
              >
                {paymentAmount}
              </span>
            </div>

            <div className="d-flex justify-content-center" style={{ flexDirection: 'column' }}>
              <div>Are you sure you want to confirm the payment?</div>
              <div className="d-flex justify-content-center" style={{ marginTop: '10px' }}>
                <button
                  onClick={() => {
                    handleOk(true)
                  }}
                  className="btn btn-success"
                  style={{ marginRight: '10px', width: '100px' }}
                >
                  Yes
                </button>

                <button
                  onClick={() => {
                    handleCancel(true)
                  }}
                  className="btn btn-outline-dark"
                  style={{ width: '100px' }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}

export default PaymentConfirmationModal
