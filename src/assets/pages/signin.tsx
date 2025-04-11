import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signin.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Simulating user data check (for demo purpose, use localStorage)
      const storedUser = JSON.parse(localStorage.getItem('user') || '[]');
      const user = storedUser?.find((user: { email: string; password: string }) => user.email === email && user.password === password);
      console.log('storedUser = ', storedUser, 'user = ', user)
      if (user) {
        // Store user login state
        localStorage.setItem('users', JSON.stringify([user]));
        // Login successful: Redirect to homepage or cart page
        navigate('/');
      } else {
        // Handle errors like invalid credentials
        setError('Invalid login details.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="body flex justify-between">
      <div className='w-1/2'>
        <img src='/image/pharmacyLogin.jpg' className='' alt='pharmacy' />
      </div>
      <div className="signin-container w-1/3 self-start">
        <div className="signin-form">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Account:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="btn-signin">
              Sign in
            </button>
            <div className="signin-options">
              <a href="/signup" className="mobile-signin">
                Create Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
