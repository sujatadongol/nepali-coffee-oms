import React, { useRef, useState } from 'react'
import PlacedOrderList from '../PlacedOrderList'
import {
  getOrderById,
  getOrderIdAndTotals,
  getTotalAmount,
  getTransactionHistory
} from '../../helper'
import { formatDateInReadableFormat, sortByDate } from '../../utils'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { useNavigate } from 'react-router-dom'
import OrderView from './OrderView'
import { useReactToPrint } from 'react-to-print'
import { PrinterOutlined } from '@ant-design/icons'
import { PrintButton } from '../elements/PrintButton'

const SalesReport = () => {
  const [transactions, setTransactions] = useState(getTransactionHistory() || {})
  const [selectedDate, setSelectedDate] = useState(null)
  const navigate = useNavigate()
  const printRef = useRef(null)

  // Convert transactions into sales data for the graph
  const salesData = Object.keys(transactions)
    .map((date) => ({
      date: formatDateInReadableFormat(date),
      rawDate: date,
      sales: getTotalAmount(transactions[date])
    }))
    .sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate))

  // Filter transactions based on selected date
  const filteredTransactions = selectedDate
    ? { [selectedDate]: transactions[selectedDate] }
    : transactions

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'customer-bill'
  })

  return (
    <>
      <div className="d-flex justify-content-end gap-2">
        <PrintButton handlePrint={handlePrint} />

        <button onClick={() => navigate('/')} className="btn summary-btn btn-outline-dark">
          Back to Table
        </button>
      </div>

      <div
        ref={printRef}
        className="d-flex"
        style={{ flexDirection: 'column', padding: '10px 3rem' }}
      >
        {/* Graph Section */}
        <h3 className="text-center" style={{ marginBottom: '15px' }}>
          Daily Sales Overview
        </h3>
        <div className="line-graph-wrapper">
          <ResponsiveContainer height={300}>
            <LineChart
              data={salesData}
              onClick={(e) => {
                if (e && e.activeLabel) {
                  const clickedDate = Object.keys(transactions).find(
                    (key) => formatDateInReadableFormat(key) === e.activeLabel
                  )
                  setSelectedDate(clickedDate || null)
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#376af5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {selectedDate && (
          <button
            className="btn btn-primary"
            onClick={() => setSelectedDate(null)}
            style={{
              padding: '5px 10px',
              backgroundColor: '#376af5',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              width: 'fit-content'
            }}
          >
            Show All Sales
          </button>
        )}

        {/* Sales Table */}
        <div style={{ width: '100%', marginTop: '20px' }}>
          {sortByDate(Object.keys(filteredTransactions))?.map((single) => (
            <div key={single}>
              <div className="d-flex justify-content-between" style={{ paddingTop: '15px' }}>
                <div style={{ fontWeight: 600 }}>{formatDateInReadableFormat(single)}</div>
                <div style={{ fontWeight: 600 }}>
                  Sales:{' '}
                  <span style={{ color: '#376af5', fontWeight: 600 }}>
                    {getTotalAmount(filteredTransactions[single])}
                  </span>
                </div>
              </div>
              {getOrderIdAndTotals(filteredTransactions[single])
                ?.sort((a, b) => b.createdAt - a.createdAt)
                .map((singleOrder) => (
                  <OrderView
                    orderDetail={singleOrder}
                    filteredOrders={getOrderById(filteredTransactions[single], singleOrder.orderId)}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SalesReport
