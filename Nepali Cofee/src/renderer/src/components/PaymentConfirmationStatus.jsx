import React from 'react'
import ModalElement from './elements/Modal'
import { FileDoneOutlined } from '@ant-design/icons'

const PaymentConfirmationStatus = ({ openModal, handleCancel }) => {
  return (
    <ModalElement
      openModal={openModal}
      handleCancel={handleCancel}
      modalBody={
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ fontSize: '24px', margin: '15px', flexDirection: 'column', gap: '10px' }}
        >
          <FileDoneOutlined style={{ fontSize: '44px', color: 'green' }} />
          <div>Your payment has been confirmed</div>
          <div style={{ fontSize: '14px', margin: '0 10px', textAlign: 'center' }}>
            Thank you for visiting! We hope you enjoyed your coffee ☕. Have a good time!
          </div>
        </div>
      }
    />
  )
}

export default PaymentConfirmationStatus
