import React, { useState } from "react";
import ModalElement from "../elements/Modal";
import PlacedOrderList from "../PlacedOrderList";
import { getTotalAmount } from "../../helper";
import { formatDateInReadableFormat } from "../../utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ReportModal = ({ openModal, handleCancel, transactions }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Convert transactions into sales data for the graph
  const salesData = Object.keys(transactions)
    .map((date) => ({
      date: formatDateInReadableFormat(date),
      rawDate: date, 
      sales: getTotalAmount(transactions[date]),
    }))
    .sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));

  // Filter transactions based on selected date
  const filteredTransactions = selectedDate
    ? { [selectedDate]: transactions[selectedDate] }
    : transactions;


  return (
    <ModalElement
      width={750}
      openModal={openModal}
      handleCancel={handleCancel}
      modalBody={
        <div style={{ marginTop: "20px" }}>
          {/* Graph Section */}
          <h3 className="text-center">Daily Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={salesData}
              onClick={(e) => {
                if (e && e.activeLabel) {
                  const clickedDate = Object.keys(transactions).find(
                    (key) => formatDateInReadableFormat(key) === e.activeLabel
                  );
                  setSelectedDate(clickedDate || null);
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

          {/* Reset Button */}
          {selectedDate && (
            <button
              onClick={() => setSelectedDate(null)}
              style={{
                margin: "10px 0",
                padding: "5px 10px",
                backgroundColor: "#376af5",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Show All Sales
            </button>
          )}

          {/* Sales Table */}
          <div>
            {Object.keys(filteredTransactions).map((single) => (
              <div key={single}>
                <div
                  className="d-flex justify-content-between"
                  style={{ paddingTop: "15px" }}
                >
                  <div style={{ fontWeight: 600 }}>
                    {formatDateInReadableFormat(single)}
                  </div>
                  <div style={{ fontWeight: 600 }}>
                    Sales:{" "}
                    <span style={{ color: "#376af5", fontWeight: 600 }}>
                      {getTotalAmount(filteredTransactions[single])}
                    </span>
                  </div>
                </div>
                <PlacedOrderList
                  orderSummary={filteredTransactions[single]}
                  viewOnly
                />
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
};

export default ReportModal;
