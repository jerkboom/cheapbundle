
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import Bundles from './pages/Bundles';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import Dashboard from './pages/Dashboard';
import BecomeSeller from './pages/BecomeSeller';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCallback from './pages/PaymentCallback';
import PaymentFailed from './pages/PaymentFailed';
import Profile from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/bundles" element={<Bundles />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/track-order" element={<OrderTracking />} />
            <Route path="/become-a-seller" element={<BecomeSeller />} />
            <Route path="/payment/callback" element={<PaymentCallback />} />
            <Route path="/order-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
