import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import html2pdf from 'html2pdf.js';
import { DownloadOutlined } from '@ant-design/icons';

import {
  getOrderById,
  getOrderIdAndTotals,
  getTotalAmount,
  getTransactionHistory,
} from '../../helper';
import OrderItemsList from './OrderItemsList';

// --- HELPER FUNCTIONS (unchanged) ---
const parseToYYYYMMDD = (dateStr) => {
  if (dateStr.includes('-')) return dateStr;
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  }
  return dateStr;
};
const buildDateFromYYYYMMDD = (dateString) => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};
const getStartOfWeek = (dateString) => {
  const date = buildDateFromYYYYMMDD(dateString);
  date.setDate(date.getDate() - date.getDay());
  return date.toISOString().split('T')[0];
};
const getYearMonth = (dateString) => {
  return dateString.substring(0, 7);
};
const formatPeriodLabel = (period, timeframe) => {
  try {
    if (timeframe === 'monthly') {
      const [year, month] = period.split('-');
      return new Date(year, month - 1).toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
      });
    }
    const dateObj = buildDateFromYYYYMMDD(period);
    const formattedDate = dateObj.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    if (timeframe === 'weekly') {
      return `Week of ${formattedDate}`;
    }
    return formattedDate;
  } catch (error) {
    console.error("Error formatting period label:", period, error);
    return period;
  }
};

const PrintableReport = React.forwardRef(({ data, timeframe }, ref) => {
  const timeframeTitle = timeframe.charAt(0).toUpperCase() + timeframe.slice(1);
  const sortedPeriods = Object.keys(data).sort((a, b) => a.localeCompare(b));

  return (
    <div ref={ref} style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>{timeframeTitle} Sales Report</h1>
        <p style={{ margin: 0, color: '#555' }}>
          Generated on: {new Date().toLocaleString('en-GB')}
        </p>
      </div>

      {sortedPeriods.map((periodKey) => (
        <div key={periodKey} style={{ pageBreakInside: 'avoid', marginBottom: '25px' }}>
          <div style={{ padding: '8px', background: '#f0f2f5', borderRadius: '4px', border: '1px solid #e8e8e8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>{formatPeriodLabel(periodKey, timeframe)}</h3>
              <div style={{ fontWeight: 'bold' }}>
                Total Sales: Rs. {getTotalAmount(data[periodKey]).grandTotal.toFixed(2)}
              </div>
            </div>
          </div>

          {getOrderIdAndTotals(data[periodKey])
            .grandTotal?.sort((a, b) => a.createdAt - b.createdAt)
            .map((singleOrder) => (
              <OrderItemsList
                key={singleOrder.orderId}
                orderDetail={singleOrder}
                filteredOrders={getOrderById(data[periodKey], singleOrder.orderId).grandTotal}
              />
            ))}
        </div>
      ))}
    </div>
  );
});

const SalesReport = () => {
  const [transactions] = useState(getTransactionHistory() || {});
  const [timeframe, setTimeframe] = useState('daily');
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const navigate = useNavigate();
  const pdfContentRef = useRef(null);

  const standardizedTransactions = useMemo(() => {
    if (!transactions) return {};
    const newTrans = {};
    for (const dateKey in transactions) {
      const yyyyMmDdKey = parseToYYYYMMDD(dateKey);
      if (!newTrans[yyyyMmDdKey]) {
        newTrans[yyyyMmDdKey] = [];
      }
      newTrans[yyyyMmDdKey].push(...transactions[dateKey]);
    }
    return newTrans;
  }, [transactions]);

  const aggregatedData = useMemo(() => {
    const aggregator = {};
    Object.entries(standardizedTransactions).forEach(([date, orders]) => {
      let key;
      if (timeframe === 'daily') key = date;
      else if (timeframe === 'weekly') key = getStartOfWeek(date);
      else if (timeframe === 'monthly') key = getYearMonth(date);
      if (key) {
        if (!aggregator[key]) aggregator[key] = [];
        aggregator[key].push(...orders);
      }
    });
    return aggregator;
  }, [standardizedTransactions, timeframe]);

  const filteredAggregatedData = useMemo(() => {
    if (!customStartDate || !customEndDate) return aggregatedData;
    const start = new Date(customStartDate);
    const end = new Date(customEndDate);
    return Object.fromEntries(
      Object.entries(aggregatedData).filter(([periodKey]) => {
        const date = buildDateFromYYYYMMDD(
          timeframe === 'monthly' ? `${periodKey}-01` : periodKey
        );
      return (
        date.getTime() >= new Date(customStartDate).setHours(0, 0, 0, 0) &&
        date.getTime() <= new Date(customEndDate).setHours(23, 59, 59, 999)
      );

      })
    );
  }, [aggregatedData, customStartDate, customEndDate, timeframe]);

  const graphData = useMemo(() =>
    Object.keys(aggregatedData)
      .map((period) => ({
        periodLabel: formatPeriodLabel(period, timeframe),
        rawPeriod: period,
        sales: getTotalAmount(aggregatedData[period]).grandTotal,
      }))
      .sort((a, b) => a.rawPeriod.localeCompare(b.rawPeriod)),
    [aggregatedData, timeframe]
  );

  const transactionsToShow = useMemo(() => {
    if (selectedPeriod) {
      return { [selectedPeriod]: aggregatedData[selectedPeriod] };
    }
    return aggregatedData;
  }, [selectedPeriod, aggregatedData]);

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    setSelectedPeriod(null);
  };

  const handleDownloadPDF = () => {
    setTimeout(() => {
      const element = pdfContentRef.current;
      const opt = {
        margin: 10,
        filename: `sales-report-${timeframe}-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().from(element).set(opt).save();
    }, 500);
  };

  return (
    <>
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <PrintableReport ref={pdfContentRef} data={filteredAggregatedData} timeframe={timeframe} />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div className="btn-group" role="group">
          <button type="button" className={`btn ${timeframe === 'daily' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleTimeframeChange('daily')}>Daily</button>
          <button type="button" className={`btn ${timeframe === 'weekly' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleTimeframeChange('weekly')}>Weekly</button>
          <button type="button" className={`btn ${timeframe === 'monthly' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleTimeframeChange('monthly')}>Monthly</button>
        </div>
        <div className="d-flex gap-2 mt-2 mt-md-0">
         
          <button onClick={handleDownloadPDF} className="btn btn-outline-dark">
            <DownloadOutlined /> PDF
          </button>
          <button onClick={() => navigate('/')} className="btn btn-outline-dark">
            Back to Table
          </button>
        </div>
      </div>

      <div className="d-flex ms-5 gap-4 float-end" >
          <input type="date" value={customStartDate} onChange={(e) => setCustomStartDate(e.target.value)} className="form-control bg-light" style={{width : '300px'}} />
          <input type="date" value={customEndDate} onChange={(e) => setCustomEndDate(e.target.value)} className="form-control" style={{width : '300px'}} />
      </div>
      <div className="sales-report-container">
        <h3 className="text-center mb-3">
          {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} Sales Overview
        </h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={graphData} onClick={(e) => { if (e && e.activePayload) { setSelectedPeriod(e.activePayload[0].payload.rawPeriod); } }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="periodLabel" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#376af5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {selectedPeriod && (
          <div className="text-center my-3">
            <button className="btn btn-secondary" onClick={() => setSelectedPeriod(null)}>
              Show All {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} Sales
            </button>
          </div>
        )}

        <div className="mt-4">
          {Object.keys(transactionsToShow)
            .sort((a, b) => b.localeCompare(a))
            .map((periodKey) => (
              <div key={periodKey} className="mb-4">
                <div className="p-2 rounded" style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                  <div className="d-flex justify-content-between">
                    <div style={{ fontWeight: 600 }}>{formatPeriodLabel(periodKey, timeframe)}</div>
                    <div style={{ fontWeight: 600 }}>
                      Total Sales:{' '}
                      <span style={{ color: '#376af5', fontWeight: 600 }}>
                        Rs. {getTotalAmount(transactionsToShow[periodKey]).grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                {getOrderIdAndTotals(transactionsToShow[periodKey])
                  .grandTotal?.sort((a, b) => b.createdAt - a.createdAt)
                  .map((singleOrder) => (
                    <OrderItemsList
                      key={singleOrder.orderId}
                      orderDetail={singleOrder}
                      filteredOrders={getOrderById(transactionsToShow[periodKey], singleOrder.orderId).grandTotal}
                    />
                  ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SalesReport;
