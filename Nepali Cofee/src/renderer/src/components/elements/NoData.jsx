import React from 'react'
import noData from './../../assets/exclamation.png'

export const NoData = ({ height }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        flexDirection: 'column',
        minHeight: '180px',
        fontSize: '14px',
        height: height
      }}
    >
      <img src={noData} alt="No data found" style={{ width: '50px', height: '50px' }} />
      <div className="text-muted">No item found</div>
    </div>
  )
}
