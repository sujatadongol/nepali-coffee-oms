import React, { useEffect, useState } from 'react'
import { UserOutlined, FundViewOutlined } from '@ant-design/icons'
import { Card, Tag } from 'antd'
import FoodCategory from './FoodCategory'
import logo from '../assets/logo.png'
import PaymentConfirmationStatus from './PaymentConfirmationStatus'
import ReportModal from './Report/ReportModal'
import { getTransactionHistory } from '../helper'
import { useNavigate } from 'react-router-dom'; // Import useNavigate


export default function TableList() {
  const [cafeTables, setCafeTables] = useState([
    { id: 1, name: 'Table 1', capacity: 0, available: true, orderItems: [], hasPaid: false },
    { id: 2, name: 'Table 2', capacity: 0, available: true, orderItems: [], hasPaid: false },
    { id: 3, name: 'Table 3', capacity: 0, available: true, orderItems: [], hasPaid: false },
    { id: 4, name: 'Table 4', capacity: 0, available: true, orderItems: [], hasPaid: false },
    { id: 5, name: 'Table 5', capacity: 0, available: true, orderItems: [], hasPaid: false },
    { id: 6, name: 'Table 6', capacity: 0, available: true, orderItems: [], hasPaid: false }
  ])

  const [selectedTableId, setSelectedTableId] = useState(null)
  const [transactions, setTransactions] = useState(getTransactionHistory() || {})
  const [paymentConfirmationStatus, setPaymentConfirmationStatus] = useState(false)
  const [openReportModal, setOpenReportModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <h2
        className="text-center"
        style={{
          color: '#4B2E2E',
          borderBottom: '2px solid',
          paddingBottom: '1rem',
          marginBottom: '2rem'
        }}
      >
        <img src={logo} style={{ width: '60px', objectFit: 'contain' }} alt="logo" /> Nepali Coffee
      </h2>

      {selectedTableId ? (
        <FoodCategory
          selectedTableId={selectedTableId}
          cafeTables={cafeTables}
          setCafeTables={setCafeTables}
          onBack={() => setSelectedTableId(null)}
          transactions={transactions}
          setTransactions={setTransactions}
          setPaymentConfirmationStatus={setPaymentConfirmationStatus}
        />
      ) : (
        <>
          <div className="d-flex justify-content-end">
            <button
              onClick={() => {
                navigate('/salesreport');
              }}
              className="btn d-flex summary-btn btn-primary"
              style={{ gap: '8px', minWidth: '80px' }}
            >
              <div>
                <FundViewOutlined />
              </div>
              <div>Report</div>
            </button>
          </div>
          <div className="mt-5" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {cafeTables.map((item) => (
              <Card
                key={item.id}
                title={item.name}
                hoverable
                headStyle={{ background: '#d8cfc66b' }}
                style={{ width: '48%', textAlign: 'center' }}
                onClick={() => setSelectedTableId(item.id)}
              >
                <p>
                  <UserOutlined />
                </p>
                <Tag color={item.available ? 'green' : 'red'}>
                  {item.available ? 'Available' : 'Occupied'}
                </Tag>
              </Card>
            ))}
          </div>
        </>
      )}

      <PaymentConfirmationStatus
        openModal={paymentConfirmationStatus}
        handleCancel={() => setPaymentConfirmationStatus(false)}
      />
      {/* <ReportModal
        openModal={openReportModal}
        handleCancel={() => setOpenReportModal(false)}
        transactions={transactions}
      /> */}
    </>
  )
}
