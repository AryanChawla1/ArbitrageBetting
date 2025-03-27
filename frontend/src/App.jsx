import { AuthProvider, useAuth } from "./context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SignUpPage from "./pages/SignUpPage";
import Landing from "./pages/Landing";

const PrivateRoute = ({ children }) => {
  const { session } = useAuth();
  return session ? children : <Navigate to="/login" replace />;
};

//TODO: Add Stripe
//TODO: fill in launch page content, make name, logo, etc, functional launch page button
//TODO: Change colours

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
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<AuthRedirect />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
