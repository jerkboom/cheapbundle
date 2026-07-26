import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

import { motion } from 'framer-motion';

const PaymentCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reference = searchParams.get('reference');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) {
        navigate('/payment-failed');
        return;
      }

      try {
        const response = await api.get(`/payments/verify/${reference}`);
        if (response.data.success) {
          navigate(`/order-success?reference=${reference}`);
        } else {
          navigate('/payment-failed');
        }
      } catch (error) {
        console.error('Payment verification failed:', error);
        navigate('/payment-failed');
      }
    };

    verifyPayment();
  }, [reference, navigate]);

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-32 text-center space-y-6 min-h-[60vh] flex flex-col justify-center items-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
      />
      <h2 className="text-2xl font-bold text-textMain">Verifying Payment...</h2>
      <p className="text-textMuted">Please do not close or refresh this page.</p>
    </div>
  );
};

export default PaymentCallback;
