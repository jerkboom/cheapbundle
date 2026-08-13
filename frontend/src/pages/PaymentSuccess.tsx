import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';
import { CheckCircle, Phone, Package, ArrowRight, XCircle, RefreshCcw } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  

  const reference = searchParams.get('reference') || searchParams.get('trxref') || 'N/A';
  
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(reference !== 'N/A');
  const [error, setError] = useState<boolean>(false);

  const fetchOrder = async () => {
    if (reference === "N/A") {
      setError(true);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(false);

      const { data } = await api.get(`/orders/track?query=${reference}`);

      if (Array.isArray(data) && data.length > 0) {
        setOrderData(data[0]);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!orderData && reference !== "N/A") {
      fetchOrder();
    }
  }, [reference, orderData]);

  if (loading) {
    return (
      <div className="max-w-[1280px] mx-auto flex flex-col items-center justify-center min-h-[60vh] py-20 px-4 space-y-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
        <h2 className="text-2xl font-bold text-textMain">Loading Order Info...</h2>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="max-w-[1280px] mx-auto flex items-center justify-center py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-white border border-slate-200 rounded-[24px] p-8 md:p-12 text-center shadow-sm"
        >
          <XCircle size={64} className="text-danger mx-auto mb-6" />
          <h1 className="text-3xl font-black text-textPrimary mb-4">Order Not Found</h1>
          <p className="text-textSecondary mb-8">We couldn't retrieve your order details. Your payment might have been successful, but we can't find the order.</p>
          <button 
            onClick={fetchOrder}
            className="bg-primary hover:bg-[#1D4ED8] text-white font-bold py-4 px-8 rounded-xl inline-flex items-center justify-center gap-2 transition-colors mb-4"
          >
            <RefreshCcw size={20} /> Retry
          </button>
          <div className="mt-4">
            <Link to="/" className="text-primary hover:underline">Go Home</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto flex items-center justify-center py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white border border-slate-200 rounded-[24px] p-8 md:p-10 relative overflow-hidden shadow-sm"
      >
        {/* Success glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-green-500/10 blur-[50px] pointer-events-none"></div>
        
        {/* Success icon & heading */}
        <div className="text-center mb-8 relative z-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-5"
          >
            <CheckCircle size={40} />
          </motion.div>
          <h1 className="text-3xl font-black text-green-600 mb-1">Payment Successful</h1>
          <p className="text-textSecondary">Your bundle is on its way!</p>
        </div>

        {/* Only phone number and bundle */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 mb-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-xs text-textSecondary uppercase font-bold tracking-wider">Phone Number</p>
              <p className="text-textPrimary font-semibold text-lg">{orderData?.phone || 'N/A'}</p>
            </div>
          </div>

          <div className="border-t border-slate-200"></div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Package className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-xs text-textSecondary uppercase font-bold tracking-wider">Bundle</p>
              <p className="text-textPrimary font-semibold text-lg">{orderData?.bundleName || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
          <Link to="/track-order" className="bg-slate-100 hover:bg-slate-200 text-textPrimary font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm">
            Track Order
          </Link>
          <Link to="/bundles" className="bg-primary hover:bg-[#1D4ED8] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm shadow-md">
            Buy Another <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;

