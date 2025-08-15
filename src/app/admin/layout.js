import { Inter } from 'next/font/google'
import './global.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin Dashboard | Tryla E-commerce',
  description: 'Admin dashboard for managing Tryla E-commerce platform',
}

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="admin-container">
          {children}
        </div>
      </body>
    </html>
  )
}
