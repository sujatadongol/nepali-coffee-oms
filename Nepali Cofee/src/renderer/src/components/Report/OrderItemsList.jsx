import React from 'react';

const OrderItemsList = ({ orderDetail, filteredOrders }) => {
  // Don't render anything if there are no items for this order
  if (!filteredOrders || filteredOrders.length === 0) {
    return null;
  }

  return (
    <div style={styles.container}>
      {/* Order Header */}
      <div style={styles.header}>
        <span style={styles.orderId}>Order ID: {orderDetail.orderId}</span>
        <span style={styles.total}>Total: Rs {orderDetail.total.toFixed(2)}</span>
      </div>

      {/* Items Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Item</th>
            <th style={{ ...styles.th, ...styles.centerText }}>Qty</th>
            <th style={{ ...styles.th, ...styles.rightText }}>Price</th>
            <th style={{ ...styles.th, ...styles.rightText }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((item, index) => (
            <tr key={`${item.id}-${index}`} style={styles.tr}>
              <td>{item.name}</td>
              <td style={styles.centerText}>{item.quantity}</td>
              <td style={styles.rightText}>{item.price.toFixed(2)}</td>
              <td style={styles.rightText}>{(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- STYLES ---
const styles = {
  container: {
    border: '1px solid #e9ecef',
    borderRadius: '6px',
    margin: '10px 0',
    padding: '12px 15px',
    backgroundColor: '#fff',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: '14px',
    paddingBottom: '8px',
    borderBottom: '1px solid #dee2e6',
    marginBottom: '8px',
    color: '#495057'
  },
  orderId: {
    fontFamily: 'monospace'
  },
  total: {
    color: '#007bff'
  },
  table: {
    width: '100%',
    fontSize: '14px',
    borderCollapse: 'collapse'
  },
  th: {
    textAlign: 'left',
    color: '#6c757d',
    padding: '5px 0',
    fontWeight: '500'
  },
  tr: {
    borderTop: '1px solid #f1f3f5'
  },
  centerText: {
    textAlign: 'center'
  },
  rightText: {
    textAlign: 'right'
  }
};

export default OrderItemsList;