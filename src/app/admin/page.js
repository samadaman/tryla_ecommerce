'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiBox, FiUsers, FiShoppingCart, FiDollarSign, FiPieChart, FiSettings, FiMenu, FiX } from 'react-icons/fi';
import styles from './admin.module.css';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    recentOrders: [],
    salesData: []
  });

  useEffect(() => {
    // In a real app, fetch this data from your API
    const fetchData = async () => {
      // Mock data - replace with actual API calls
      const mockData = {
        totalSales: 45231.89,
        totalOrders: 1289,
        totalProducts: 342,
        totalCustomers: 856,
        recentOrders: [
          { id: 1, customer: 'John Doe', amount: 129.99, status: 'Completed' },
          { id: 2, customer: 'Jane Smith', amount: 89.50, status: 'Processing' },
          { id: 3, customer: 'Robert Johnson', amount: 245.00, status: 'Shipped' },
        ],
        salesData: [
          { month: 'Jan', sales: 4000 },
          { month: 'Feb', sales: 3000 },
          { month: 'Mar', sales: 5000 },
          { month: 'Apr', sales: 2780 },
          { month: 'May', sales: 1890 },
          { month: 'Jun', sales: 2390 },
        ]
      };
      setDashboardData(mockData);
    };

    fetchData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
        <div className={styles.logo}>Tryla Admin</div>
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.navLink}>
            <FiPieChart /> <span>Dashboard</span>
          </Link>
          <Link href="/admin/products" className={styles.navLink}>
            <FiBox /> <span>Products</span>
          </Link>
          <Link href="/admin/orders" className={styles.navLink}>
            <FiShoppingCart /> <span>Orders</span>
          </Link>
          <Link href="/admin/customers" className={styles.navLink}>
            <FiUsers /> <span>Customers</span>
          </Link>
          <Link href="/admin/settings" className={styles.navLink}>
            <FiSettings /> <span>Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <button className={styles.menuButton} onClick={toggleSidebar}>
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <h1>Dashboard</h1>
          <div className={styles.userProfile}>
            <span>Admin User</span>
            <div className={styles.avatar}>AU</div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)' }}>
              <FiDollarSign style={{ color: '#10B981' }} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Total Sales</span>
              <span className={styles.statValue}>${dashboardData.totalSales.toLocaleString()}</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}>
              <FiShoppingCart style={{ color: '#6366F1' }} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Total Orders</span>
              <span className={styles.statValue}>{dashboardData.totalOrders}</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)' }}>
              <FiBox style={{ color: '#EC4899' }} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Total Products</span>
              <span className={styles.statValue}>{dashboardData.totalProducts}</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
              <FiUsers style={{ color: '#F59E0B' }} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Total Customers</span>
              <span className={styles.statValue}>{dashboardData.totalCustomers}</span>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Recent Orders</h2>
            <Link href="/admin/orders" className={styles.viewAllLink}>View All</Link>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customer}</td>
                    <td>${order.amount}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button className={styles.actionButton}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
