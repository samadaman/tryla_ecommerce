import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tryla - Fashion Store',
  description: 'Discover the latest fashion trends',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
          <Toaster 
            position="top-center"
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#4CAF50',
                  secondary: 'white',
                },
              },
              error: {
                duration: 3000,
                iconTheme: {
                  primary: '#F44336',
                  secondary: 'white',
                },
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
