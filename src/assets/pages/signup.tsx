import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

interface SignUpFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false); // Track form submission state
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Track error messages
  const navigate = useNavigate(); // Initialize navigate function

  // Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page refresh
    setLoading(true);
    setErrorMessage(null); // Clear previous error messages

    // Collect form data
    const form = event.target as HTMLFormElement;
    const formData: SignUpFormData = {
      email: form.email.value,
      password: form.password.value,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      phoneNumber: form.phoneNumber.value,
    };

    // Store the user data in localStorage
    localStorage.setItem('user', JSON.stringify(formData));

    // Show success message and reset the form
    alert('User registered successfully!');
    form.reset(); // Clear the form fields

    // Navigate to the home page after registration
    navigate('/signin');

    setLoading(false);
  };

  return (
    <div className="signup-body flex justify-between items-center">
      <div className='w-1/2'>
        <img src='/image/pharmacyLogin.jpg' className='' alt='pharmacy' />
      </div>
      <div className="signup-container  self-start ">
        <form id="signupForm w-1/3" onSubmit={handleSubmit}>
          <h2>Register</h2>

          {errorMessage && (
            <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
              {errorMessage}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">* Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">* Login Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Set the login password"
              required
            />
          </div>

          <div className="form-group">
            <label>* Full Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Please enter your first name"
              required
            />
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Please enter your last name"
              required
            />
          </div>

          <div className="form-group">
            <label>* Tel:</label>
            <div className="tel-group">
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone number"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <input type="checkbox" id="agreement" name="agreement" required />
            <label htmlFor="agreement">
              I agree to (a) <a href="#">Free Membership Agreement</a>, (b) <a href="#">Terms of Use</a>,
              and (c) <a href="#">Privacy Policy</a>. I agree to receive more information from this site.
            </label>
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Registering...' : 'Agree and Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
