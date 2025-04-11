import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for programmatic navigation
import './Checkout.css';

const Checkout: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [billAmount] = useState<number>(150); // Replace with actual bill amount from cart
  const [prescriptionImage, setPrescriptionImage] = useState<File | null>(null);
  const navigate = useNavigate(); // To programmatically navigate to Order Confirmation page

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handlePrescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPrescriptionImage(event.target.files[0]);
    }
  };

  const validateForm = () => {
    if (!prescriptionImage) {
      alert('Prescription image is mandatory');
      return false;
    }
    return true;
  };

  const handleConfirmOrderClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the default action of the button

    if (validateForm()) {
      // Navigate to Order Confirmation page only if validation is successful
      navigate('/OrderConfirmation');
    }
  };

  return (
    <div className="checkout-container container">
      {/* Checkout Header */}
      <div className="admin-panel">
        <h1>Checkout</h1>

        <div className="order-review">
          <h2>Your Order</h2>
          <div className="text-2xl font-semibold">
            {/* Dynamically filled with cart contents */}
            <p>Order Summary (Item details should be displayed here)</p>
          </div>
        </div>
      </div>

      {/* Shipping Information Section */}
      <div className="shipping-info flex flex-col justify-center items-center">
        <h2>Shipping Information</h2>
        <form id="shippingForm" className='flex flex-col justify-center items-center w-1/2'>
          <input type="text" id="userName" name="name" placeholder="Full Name" required />
          <input type="text" name="address" placeholder="Shipping Address" required />
          <input type="text" name="city" placeholder="City" required />
          <input type="text" name="state" placeholder="State" required />
          <input type="text" name="zip" placeholder="Zip Code" required />
          <input type="tel" name="phone" placeholder="Phone Number" required />
          <input type="email" id="userEmail" name="email" placeholder="Email" required />
        </form>
        <div className="image-ship">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXVk2V37Nx7rEa9pp1Div0Wwditu7EBOcTwA&s"
            alt="Shipping"
          />
        </div>
      </div>

      {/* Prescription Image Section */}
      <div className="prescription-info">
        <h2>Prescription Image</h2>
        <label htmlFor="prescriptionImage">Please upload a valid prescription:</label>
        <input
          type="file"
          id="prescriptionImage"
          name="prescriptionImage"
          accept="image/*"
          required
          onChange={handlePrescriptionChange}
        />
        {prescriptionImage && <p>File selected: {prescriptionImage.name}</p>}
      </div>

      {/* Payment Information Section */}
      <div className="payment-info flex flex-col justify-around items-center">
        <div>
          <h2>Payment Method</h2>
          <label id="billAmount">${billAmount}</label>
        </div>

        {/* <div id="paymentDetailsContainer"> */}
        {/* This is where the payment method details will be displayed */}
        {/* </div> */}

        <form id="paymentForm" className='w-full flex flex-col justify-center items-center'>
          <div className='flex justify-around items-center w-1/2'>
            <label>
              <div>
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  required
                  onChange={handlePaymentMethodChange}
                />
                COD
              </div>
            </label>
            <label>
              <div>
                <input
                  type="radio"
                  name="payment"
                  value="Credit Card"
                  required
                  onChange={handlePaymentMethodChange}
                />
                Credit Card
              </div>
            </label>
            <label>
              <div>
                <input
                  type="radio"
                  name="payment"
                  value="PayPal"
                  onChange={handlePaymentMethodChange}
                />
                PayPal
              </div>
            </label>
          </div>

          <div>
            {paymentMethod === 'Credit Card' && (
              <div id="creditCardDetails">
                <label htmlFor="cardNumber">Card Number:</label>
                <input type="text" id="cardNumber" />
                <label htmlFor="expiryDate">Expiry Date:</label>
                <input type="date" id="expiryDate" />
                <label htmlFor="cvv">CVV:</label>
                <input type="text" id="cvv" />
                <button id="paybutton" type="button" onClick={handleConfirmOrderClick}>
                  Submit Payment
                </button>
              </div>
            )}

            {paymentMethod === 'PayPal' && (
              <div id="paypalDetails">
                <label htmlFor="paypalEmail">PayPal Email:</label>
                <input type="email" id="paypalEmail" />
                <label htmlFor="paypalAccount">PayPal Account:</label>
                <input type="text" id="paypalAccount" />
                <button id="paybutton" type="button" onClick={handleConfirmOrderClick}>
                  Submit Payment
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Confirmation Button */}
      <button id="confirmOrderButton" onClick={handleConfirmOrderClick}>
        <Link to="/OrderConfirmation" style={{ textDecoration: 'none', color: 'white' }}>
          Confirm Order
        </Link>
      </button>
    </div>
  );
};

export default Checkout;
