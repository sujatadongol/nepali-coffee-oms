import React from 'react'
import ModalElement from './elements/Modal'
import PlacedOrderList from './PlacedOrderList'
import qr from '../assets/qr.jpg'

const PaymentConfirmationModal = ({
  openModal,
  handleOk,
  handleCancel,
  paymentAmount,
  orderSummary,
  setOrderSummary,
  orderId
}) => {
  return (
    <ModalElement
      width={750}
      openModal={openModal}
      handleCancel={handleCancel}
      modalBody={
        <div className="row">
          {/* Left Section: Order Summary */}
          <div
            className="col-6"
            style={{
              borderRight: '1px solid #ddd',
              display: 'flex',
              flexDirection: 'column',
              padding: '15px'
            }}
          >
            <PlacedOrderList
              orderId={orderId}
              orderSummary={orderSummary}
              setOrderSummary={setOrderSummary}
              viewOnly
            />
          </div>

          {/* Right Section: QR Code & Payment */}
          <div
            className="col-6"
            style={{
              padding: '15px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* QR Code Section */}
            <div
              style={{
                textAlign: 'center',
                position: 'relative',
                padding: '15px',
                borderRadius: '12px',
                display: 'inline-block'
              }}
            >
              {/* Corner Borders */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '15px',
                  height: '15px',
                  borderTop: '3px solid #c89f77',
                  borderLeft: '3px solid #c89f77',
                  borderRadius: '8px 0 0 0'
                }}
              ></div>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '15px',
                  height: '15px',
                  borderTop: '3px solid #c89f77',
                  borderRight: '3px solid #c89f77',
                  borderRadius: '0 8px 0 0'
                }}
              ></div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '15px',
                  height: '15px',
                  borderBottom: '3px solid #c89f77',
                  borderLeft: '3px solid #c89f77',
                  borderRadius: '0 0 0 8px'
                }}
              ></div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '15px',
                  height: '15px',
                  borderBottom: '3px solid #c89f77',
                  borderRight: '3px solid #c89f77',
                  borderRadius: '0 0 8px 0'
                }}
              ></div>

              {/* QR Code */}
              <img src={qr} alt="QR Code" style={{ width: '200px', borderRadius: '8px' }} />

              {/* Label */}
              <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#333', fontSize: '16px' }}>
                Scan to Pay via <span style={{ color: '#d81b60' }}>FonePay</span> App
              </p>
            </div>

            {/* Payment Amount */}
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ fontSize: '24px', marginBottom: '6px' }}
            >
              Your total is{' '}
              <span
                style={{ color: '#376af5', marginLeft: '4px', fontWeight: 600, fontSize: '28px' }}
              >
                {paymentAmount}
              </span>
            </div>

            {/* Confirmation Buttons */}
            <div
              className="d-flex justify-content-center"
              style={{
                flexDirection: 'column',
                background: '#f0f0f0',
                padding: '10px',
                borderRadius: '8px'
              }}
            >
              <p style={{ textAlign: 'center', fontSize: '16px', marginBottom: '6px' }}>
                Are you sure you want to confirm the payment?
              </p>
              <div className="d-flex justify-content-center" style={{ marginTop: '5px' }}>
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
