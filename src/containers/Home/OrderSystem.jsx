import React, { useRef } from "react";
import { Table, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";


const OrderSystem = ({ selectedTable }) => {
  const printRef = useRef(null);

  // const handlePrint = () => {
  //   const printContent = printRef.current;
  //   const originalBody = document.body.innerHTML;

  //   document.body.innerHTML = printContent.innerHTML;
  //   window.print();

  //   document.body.innerHTML = originalBody;
  //   window.location.reload(); // Reload to restore event listeners
  // };

  const handlePrint = useReactToPrint({
    contentRef: printRef, // Use contentRef correctly
    documentTitle: 'customer-bill',
});

  // Calculate the total of all order items
  const totalSum = selectedTable
    ? selectedTable.orderItems.reduce((sum, item) => sum + item.total, 0)
    : 0;

  const columns = [
    { title: "Food Item", dataIndex: "name", key: "name" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    {
      title: "Price per Item",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Total Price",
      dataIndex: "total",
      key: "total",
      render: (total) => `$${total.toFixed(2)}`,
    },
  ];

  return (
    <div>
      
<style>
                {`
              @media print {
                @page {
                     size: auto;
                        margin: 0 auto;
                }

                body {
                    margin: 0;
                    padding: 0;
                }

                .print-container {
                    width: 100%; 
                    page-break-after: auto; /* Ensures content doesn't break unnecessarily */
                }

                .non-printable {
                    display: none; 
                }
            }
                `}
            </style>
      {selectedTable && (
        <>
          {/* Print Button */}
          <Button
            type="default"
            icon={<PrinterOutlined />}
            onClick={handlePrint}
            style={{ marginBottom: 10 }}>
            Print
          </Button>

          <div ref={printRef} className="print-container">
            <Table
              dataSource={selectedTable.orderItems.map((item, index) => ({
                ...item,
                key: index,
              }))}
              columns={columns}
              pagination={false}
              bordered
              footer={() => (
                <div style={{ textAlign: "right", fontWeight: "bold" }}>
                  Grand Total: ${totalSum.toFixed(2)}
                </div>
              )}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSystem;
