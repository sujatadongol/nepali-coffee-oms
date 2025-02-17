import React from 'react'
import ModalElement from '../elements/Modal'
import PlacedOrderList from '../PlacedOrderList'
import { getTotalAmount } from '../../helper'
import { formatDateInReadableFormat } from '../../utils'

const ReportModal = ({ openModal, handleCancel, transactions }) => {
  return (
    <ModalElement
      width={750}
      openModal={openModal}
      handleCancel={handleCancel}
      modalBody={
        <div style={{ marginTop: '20px' }}>
          <div>
            {Object.keys(transactions).map((single) => (
              <div>
                <div className="d-flex justify-content-between" style={{ paddingTop: '15px' }}>
                  <div style={{ fontWeight: 600 }}>{formatDateInReadableFormat(single)}</div>
                  <div style={{ fontWeight: 600 }}>
                    Sales:{' '}
                    <span style={{ color: '#376af5', fontWeight: 600 }}>
                      {getTotalAmount(transactions[single])}
                    </span>
                  </div>
                </div>
                <PlacedOrderList orderSummary={transactions[single]} viewOnly />
              </div>
            ))}
          </div>
        </div>
      }
    />
  )
}

export default ReportModal
