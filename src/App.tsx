
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import { LoginPage, OrderPage, ErrorBoundary } from './components';
import { OrderProvider } from './context';
import { ThemeProvider } from './components/Reusable-ui/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <OrderProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/orderPage/:inputName" element={<OrderPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#fff',
                color: '#333',
                fontSize: '14px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </OrderProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App
