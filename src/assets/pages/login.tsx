import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

interface LoginProps {
  onLogin: (userId: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const existingAdmins = JSON.parse(localStorage.getItem('admins') || '[]');
    const admin = existingAdmins.find(
      (admin: { email: string; password: string }) =>
        admin.email === email && admin.password === password
    );

    if (admin) {
      // Save admin data to localStorage
      localStorage.setItem('authToken', 'sample_token'); // Example token, replace with real token
      localStorage.setItem('user', JSON.stringify(admin)); // Save admin details to localStorage
      
      onLogin(admin.id); // Pass userId to App
      navigate('/dashboard');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className='flex'>
      <div className='w-1/2'>
        <img src='/image/pharmacyLogin.jpg' alt='pharmacy'/>
      </div>
      <div className="auth-container w-1/2 self-start">
      <h1>Admin Login</h1>
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
      <button onClick={handleLogin}>Login</button>
      <p onClick={() => navigate('/register')}>Don't have an account? Register here.</p>
    </div>
    </div>
  );
};

export default Login;



// import  { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Auth.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     setLoading(true);
  
//     try {
//       const response = await fetch('/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//         mode: 'cors',
//       });
  
//       if (!response.ok) {
//         throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
//       }
  
//       const data = await response.json();
  
//       // Store the token and userId in sessionStorage
//       sessionStorage.setItem('jwtToken', data.token);
//       sessionStorage.setItem('userId', data.userId);
  
//       // Redirect to the admin dashboard
//       navigate('/Dashboard');
//     } catch (error) {
//       console.error('Login error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className="auth-container">
//       <h1>Admin Login</h1>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin} disabled={loading}>
//         {loading ? 'Logging in...' : 'Login'}
//       </button>
//       <p onClick={() => navigate('/register')}>Don't have an account? Register here.</p>
//     </div>
//   );
// };

// export default Login;