import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

const PrivateRoute = ({ children }) => {
  const { session } = useAuth();
  return session ? children : <Navigate to="/login" replace />;
};

//TODO: Make login page functional with sign-up
//TODO: Make use of log out within components as well as useAuth
//TODO: Add Stripe
//TODO: Make a home page rather then redirecting

const AuthRedirect = () => {
  const { session } = useAuth();
  return session ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<AuthRedirect />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
