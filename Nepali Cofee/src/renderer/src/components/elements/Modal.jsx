import React from 'react'
import { Modal } from 'antd'

const ModalElement = ({ openModal, modalTitle, modalBody, footer, handleCancel }) => {
  return (
    <Modal title={modalTitle} open={openModal} footer={footer} onCancel={handleCancel}>
      {modalBody}
    </Modal>
  )
}

export default ModalElement
