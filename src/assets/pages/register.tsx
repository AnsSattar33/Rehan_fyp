import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

interface Admin {
  id: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const newAdmin: Admin = {
      id: Date.now().toString(), // Unique ID
      email,
      password,
    };

    // Store in local storage (mock database)
    const existingAdmins = JSON.parse(localStorage.getItem('admins') || '[]');
    localStorage.setItem('admins', JSON.stringify([...existingAdmins, newAdmin]));

    alert('Registration successful!');
    navigate('/login');
  };

  return (
    <div className='flex'>
      <div className='w-1/2'>
        <img src='/image/pharmacyLogin.jpg' alt='pharmacy' />
      </div>
      <div className="auth-container w-1/2 self-start">
        <h1>Admin Registration</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        <p onClick={() => navigate('/login')}>Already have an account? Login here.</p>
      </div>
    </div>
  );
};

export default Register;
