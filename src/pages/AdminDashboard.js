

import React, { useState } from 'react';
import './AdminDashboard.css';
import { FaBox, FaUsers, FaMoneyBillWave, FaClipboardList, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminDashboard = () => {
  const [tab, setTab] = useState('dashboard');

  const products = [
    { id: 1, name: 'Smart Watch', price: 149.99 },
    { id: 2, name: 'Laptop Stand', price: 29.99 },
  ];

  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
  ];

  const orders = [
    { id: 101, user: 'Alice', total: 199.99, status: 'Shipped' },
    { id: 102, user: 'Bob', total: 59.99, status: 'Processing' },
  ];

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Admin</h2>
        <nav>
          <button onClick={() => setTab('dashboard')}>Dashboard</button>
          <button onClick={() => setTab('products')}>Products</button>
          <button onClick={() => setTab('users')}>Users</button>
          <button onClick={() => setTab('orders')}>Orders</button>
        </nav>
      </aside>

      <main>
        {tab === 'dashboard' && (
          <div className="overview-cards">
            <div className="card"><FaBox /> <h3>12 Products</h3></div>
            <div className="card"><FaClipboardList /> <h3>8 Orders</h3></div>
            <div className="card"><FaUsers /> <h3>5 Users</h3></div>
            <div className="card"><FaMoneyBillWave /> <h3>$2,034 Revenue</h3></div>
          </div>
        )}

        {tab === 'products' && (
          <div className="tab-content">
            <h2>Manage Products <button className="add-btn"><FaPlus /> Add</button></h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th><th>Price</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>${p.price.toFixed(2)}</td>
                    <td>
                      <button className="edit"><FaEdit /></button>
                      <button className="delete"><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'users' && (
          <div className="tab-content">
            <h2>User List</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th><th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td><td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'orders' && (
          <div className="tab-content">
            <h2>Recent Orders</h2>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th><th>User</th><th>Total</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td><td>{order.user}</td>
                    <td>${order.total.toFixed(2)}</td><td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
