import React, { useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Card, Tag } from 'antd'
import FoodCategory from './FoodCategory'

export default function TableList() {
  const [cafeTables, setCafeTables] = useState([
    { id: 1, name: 'Table 1', capacity: 2, available: true, orderItems: [] },
    { id: 2, name: 'Table 2', capacity: 4, available: true, orderItems: [] },
    { id: 3, name: 'Table 3', capacity: 2, available: true, orderItems: [] },
    { id: 4, name: 'Table 4', capacity: 6, available: true, orderItems: [] },
    { id: 5, name: 'Table 5', capacity: 4, available: true, orderItems: [] },
    { id: 6, name: 'Table 6', capacity: 2, available: true, orderItems: [] }
  ])

  const [selectedTable, setSelectedTable] = useState(null)

  return (
    <>
      <h2
        className="text-center"
        style={{
          color: '#4B2E2E',
          borderBottom: '1px solid',
          padding: '1rem',
          marginBottom: '2rem'
        }}
      >
        Nepali Coffee
      </h2>

      {selectedTable ? (
        <FoodCategory
          table={selectedTable}
          setCafeTables={setCafeTables}
          onBack={() => setSelectedTable(null)}
        />
      ) : (
        <div className="mt-5" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {cafeTables.map((item) => (
            <Card
              key={item.id}
              title={item.name}
              hoverable
              headStyle={{ background: '#d8cfc66b' }}
              style={{ width: '48%', textAlign: 'center' }}
              onClick={() => setSelectedTable(item)}
            >
              <p>
                <UserOutlined /> <strong>{item.capacity}</strong>
              </p>
              <Tag color={item.available ? 'green' : 'red'}>
                {item.available ? 'Available' : 'Occupied'}
              </Tag>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
