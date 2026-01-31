import { createContext, useContext, useState, useEffect } from 'react';
import initialProducts from '../../data/products';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  // Load products from localStorage or fallback to initial data
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('admin_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Sync products to localStorage on change
  useEffect(() => {
    localStorage.setItem('admin_products', JSON.stringify(products));
  }, [products]);

  // Mock Data Initialization
  useEffect(() => {
    // Generate some mock customers
    const mockCustomers = Array.from({ length: 10 }).map((_, index) => ({
      id: index + 1,
      name: `Customer ${index + 1}`,
      email: `customer${index + 1}@example.com`,
      joinDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
      totalSpent: (Math.random() * 1000).toFixed(2),
    }));
    setCustomers(mockCustomers);

    // Generate some mock orders
    const mockOrders = Array.from({ length: 15 }).map((_, index) => ({
      id: `ORD-${1000 + index}`,
      customerId: Math.floor(Math.random() * 10) + 1,
      date: new Date(Date.now() - Math.floor(Math.random() * 5000000000)).toISOString().split('T')[0],
      status: ['Pending', 'Processing', 'Shipped', 'Delivered'][Math.floor(Math.random() * 4)],
      total: (Math.random() * 500).toFixed(2),
      items: Math.floor(Math.random() * 5) + 1,
    }));
    setOrders(mockOrders);
  }, []);

  // Product Actions
  const addProduct = (product) => {
    setProducts((prev) => [...prev, { ...product, id: prev.length + 1 }]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts((prev) => prev.map((p) => (Number(p.id) === Number(id) ? { ...p, ...updatedProduct } : p)));
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => Number(p.id) !== Number(id)));
  };

  // Order Actions
  const updateOrderStatus = (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const values = {
    products,
    orders,
    customers,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
  };

  return <AdminContext.Provider value={values}>{children}</AdminContext.Provider>;
}

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
