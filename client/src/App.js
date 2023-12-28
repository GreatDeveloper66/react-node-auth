/**
 * The App function sets up the routing for different pages in a React application and wraps it with an
 * authentication provider.
 * @returns The App component is being returned.
 */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" component={LoginPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/register" component={RegistrationPage} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
