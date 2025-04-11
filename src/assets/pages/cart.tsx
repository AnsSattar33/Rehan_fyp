import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [taxes, setTaxes] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is signed in
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      navigate('/signin'); // Redirect to sign-in page if not logged in
    } else {
      // Manually add sample cart data (or you could load it from localStorage)
      const cartItems: CartItem[] = [
        { name: 'Product 1', price: 100, quantity: 2 },
        { name: 'Product 2', price: 150, quantity: 1 },
        { name: 'Product 3', price: 250, quantity: 3 },
      ];
      localStorage.setItem('cart', JSON.stringify(cartItems)); // Save cart data to localStorage
      setCart(cartItems);
      calculateTotals(cartItems);
    }
  }, [navigate]);

  const calculateTotals = (cartItems: CartItem[]) => {
    let subtotalValue = 0;
    cartItems.forEach(item => {
      subtotalValue += item.price * item.quantity;
    });
    const taxesValue = subtotalValue * 0.1; // 10% tax
    const totalValue = subtotalValue + taxesValue;

    setSubtotal(subtotalValue);
    setTaxes(taxesValue);
    setTotal(totalValue);
  };

  const handleCheckout = () => {
    if (total <= 0) {
      alert('Your cart is empty!');
      return;
    }
    alert(`Proceeding to Checkout with a total of ${total.toFixed(2)} PKR`);
    navigate('/checkout');
  };

  return (
    <div className="container">
      <div className="admin-panel">
        <h1>Your Shopping Cart</h1>
        <div className="cart-head">
          <div className="inner-cart-head">
            <h3>Product Name</h3>
            <h3>Price</h3>
            <h3>Quantity</h3>
            <h3>Total</h3>
          </div>
        </div>
        <div className="cart-list">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <span>{item.name}</span>
              <span>{item.price} PKR</span>
              <span>{item.quantity}</span>
              <span>{(item.price * item.quantity).toFixed(2)} PKR</span>
            </div>
          ))}
        </div>
      </div>

      <div className="billing-info">
        <div className="flex flex-col items-center justify-center">
          <h3>Billing Information</h3>
          <p><strong>Subtotal:</strong> {subtotal.toFixed(2)} PKR</p>
          <p><strong>Taxes:</strong> {taxes.toFixed(2)} PKR</p>
          <p><strong>Total:</strong> {total.toFixed(2)} PKR</p>
          <div className=''>
            <button onClick={handleCheckout} id="checkoutButton">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
