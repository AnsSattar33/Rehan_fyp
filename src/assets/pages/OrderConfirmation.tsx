import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './orderconfirmation.css';

interface OrderDetails {
  orderId: string;
  total: number;
  shippingAddress: string;
  paymentMethod: string;
}

const OrderConfirmation: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Fetch the order details from localStorage or API (example: localStorage)
    const order = localStorage.getItem('orderDetails');
    if (order) {
      setOrderDetails(JSON.parse(order));
    }
  }, []);

  return (
    <div className="container">
      <h1>Thank You for Your Purchase!</h1>
      <p>Your order has been confirmed and is being processed.</p>
      <p>We will send you an email with the order details and a tracking number once your order has been shipped.</p>

      <h2>Order Summary</h2>
      {orderDetails ? (
        <div className="order-summary">
          <p>Order ID: {orderDetails.orderId}</p>
          <p>Total: ${orderDetails.total.toFixed(2)} PKR</p>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}

      <div className="shipping-payment-info">
        {orderDetails ? (
          <>
            <h3>Shipping Information</h3>
            <p>{orderDetails.shippingAddress}</p>

            <h3>Payment Method</h3>
            <p>{orderDetails.paymentMethod}</p>
          </>
        ) : (
          <p>Loading shipping and payment info...</p>
        )}
      </div>

      <p>
        If you have any questions about your order, please contact our customer service at{' '}
        <a href="mailto:support@example.com">support@example.com</a>.
      </p>

      <Link to="/" className="">
        <button className="button !mt-10">Continue Shopping</button>
      </Link>
    </div>
  );
};

export default OrderConfirmation;
