import React from "react";

export default function Admin({ orders = [] }) {
  return (
    <div className="admin-container">
      <style>{`
        .admin-container {
          min-height: 100vh;
          background-color: #FFF2F4;
          padding: clamp(20px, 5vw, 40px);
          font-family: 'Playfair Display', serif;
          box-sizing: border-box;
        }

        .admin-title {
          color: #C05A5A;
          font-size: clamp(2rem, 5vw, 3rem);
          margin-bottom: 30px;
        }

        .table-wrapper {
          background: #FFF;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.03);
          overflow-x: auto;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }

        .admin-table th, .admin-table td {
          padding: 14px;
          text-align: left;
          border-bottom: 1px solid #FFF2F4;
        }

        .admin-table th {
          color: #C05A5A;
          font-size: 1.1rem;
        }
      `}</style>

      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", color: "#666" }}>
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer?.name || "N/A"}</td>
                  <td>₹{order.total}</td>
                  <td>{order.paymentMethod}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}