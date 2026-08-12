
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import { AuthProvider } from './contexts/AuthContext';

// Lazy-load all pages except the homepage to minimize the initial JS bundle.
// This is critical for mobile Safari where parsing a large single bundle causes
// a long blank screen before first paint.
const Bundles = lazy(() => import('./pages/Bundles'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const OrderTracking = lazy(() => import('./pages/OrderTracking'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const BecomeSeller = lazy(() => import('./pages/BecomeSeller'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const PaymentCallback = lazy(() => import('./pages/PaymentCallback'));
const PaymentFailed = lazy(() => import('./pages/PaymentFailed'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={null}>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/bundles" element={<Bundles />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/track-order" element={<OrderTracking />} />
              <Route path="/become-a-seller" element={<BecomeSeller />} />
              <Route path="/payment/callback" element={<PaymentCallback />} />
              <Route path="/order-success" element={<PaymentSuccess />} />
              <Route path="/payment-failed" element={<PaymentFailed />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;

