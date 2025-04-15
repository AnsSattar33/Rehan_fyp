import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import Header from './assets/components/header';
import Footer from './assets/components/footer';
import Nav from './assets/components/nav';
import HomePage from './assets/pages/HomePage';
import SignIn from './assets/pages/signin';
import SignOut from './assets/pages/signup';
import Login from './assets/pages/login';
import Register from './assets/pages/register';
import View from './assets/pages/view';
import Cart from './assets/pages/cart';
import Checkout from './assets/pages/Checkout';
import OrderConfirm from './assets/pages/OrderConfirmation';
import AddProduct from './assets/pages/add-product';
import Order from './assets/pages/orders';
import Message from './assets/pages/messages';
import Dashboard from './assets/pages/Dashboard';
const App: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <div>
      <Header />
      <Nav />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignOut />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/view/:productId" element={<View />} />
        <Route path="/login" element={<Login onLogin={(id) => setUserId(id)} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            userId ? (
              <Dashboard />
            ) : (
              <Login onLogin={(id) => setUserId(id)} />
            )
          }
        >
          {/* Nested routes for the dashboard */}
          <Route path="add-product" element={<AddProduct />} />
          <Route index element={<Order />} />
          <Route path="messages" element={<Message />} />
        </Route>
        <Route path="/orderConfirmation" element={<OrderConfirm />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
