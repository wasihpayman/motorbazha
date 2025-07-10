import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CarProvider } from './contexts/CarContext';
import { ReceiptProvider } from './contexts/ReceiptContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import CarList from './pages/CarList';
import CarDetail from './pages/CarDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import PostCar from './pages/PostCar';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCars from './pages/admin/AdminCars';
import AdminSubscriptions from './pages/admin/AdminSubscriptions';
import AdminReceipts from './pages/admin/AdminReceipts';
import AdminSubscriptionActions from './pages/admin/AdminSubscriptionActions';
import NotFound from './pages/NotFound';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <ReceiptProvider>
        <CarProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cars" element={<CarList />} />
                <Route path="/cars/:id" element={<CarDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/post-car" element={<PostCar />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/cars" element={<AdminCars />} />
                <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
                <Route path="/admin/receipts" element={<AdminReceipts />} />
                <Route path="/admin/actions" element={<AdminSubscriptionActions />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Router>
        </CarProvider>
      </ReceiptProvider>
    </AuthProvider>
  );
}

export default App;