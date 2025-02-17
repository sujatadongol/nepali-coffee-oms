import React from 'react'
import { Modal } from 'antd'

const ModalElement = ({ openModal, modalTitle, modalBody, handleCancel, width }) => {
  return (
    <Modal title={modalTitle} open={openModal} footer={null} onCancel={handleCancel} width={width}>
      {modalBody}
    </Modal>
  )
}

export default ModalElement
