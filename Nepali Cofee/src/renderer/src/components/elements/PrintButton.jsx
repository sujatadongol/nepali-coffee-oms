import React from 'react'
import { PrinterOutlined } from '@ant-design/icons'

export const PrintButton = ({ handlePrint }) => {
  return (
    <button
      className="btn btn-sm summary-btn btn-outline-dark"
      onClick={handlePrint}
      style={{ width: '34px' }}
    >
      <PrinterOutlined />
    </button>
  )
}
