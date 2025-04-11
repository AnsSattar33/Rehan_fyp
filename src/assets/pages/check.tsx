import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Register from './register';
import AdminDashboard from './Dashboard';

const App: React.FC = () => {
  const [authenticatedUserId, setAuthenticatedUserId] = useState<string | null>(null);

  return (
    <BrowserRouter>
      <Routes>
        {/* Registration Page */}
        <Route path="/register" element={<Register />} />

        {/* Login Page */}
        <Route
          path="/login"
          element={<Login onLogin={(userId) => setAuthenticatedUserId(userId)} />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            authenticatedUserId ? (
              <AdminDashboard userId={authenticatedUserId} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to={authenticatedUserId ? "/admin-dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
