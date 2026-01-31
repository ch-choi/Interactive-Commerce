import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './csm/context/AdminContext';
import MainPage from './pages/MainPage';

// CSM Pages
import AdminLayout from './csm/layout/AdminLayout';
import DashboardPage from './csm/pages/DashboardPage';
import ProductManagePage from './csm/pages/ProductManagePage';
import OrderManagePage from './csm/pages/OrderManagePage';
import CustomerManagePage from './csm/pages/CustomerManagePage';

function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          {/* Client Side */}
          <Route
            path="/"
            element={
              <CartProvider>
                <MainPage />
              </CartProvider>
            }
          />

          {/* Admin Side */}
          <Route
            path="/admin"
            element={<AdminLayout />}
          >
            <Route index element={<DashboardPage />} />
            <Route path="products" element={<ProductManagePage />} />
            <Route path="orders" element={<OrderManagePage />} />
            <Route path="customers" element={<CustomerManagePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;
