import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Input from '../components/Input';
import api from '../api/axios';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const networkColors: Record<string, string> = {
  MTN: 'bg-yellow-500 text-black',
  Telecel: 'bg-red-600 text-white',
  AirtelTigo: 'bg-blue-600 text-white',
};

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bundle = location.state as { network: string; size: string; price: number } | null;
  
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!bundle) {
      navigate('/bundles');
    }
  }, [bundle, navigate]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bundle) return;
    
    setLoading(true);
    try {
      const payload = {
        network: bundle.network,
        bundleName: bundle.size,
        price: bundle.finalPrice,
        deliveryType: bundle.deliveryType,
        category: bundle.category || 'data',
        validity: bundle.validity,
        phone,
        email: email.trim() !== '' ? email.trim() : undefined
      };
      
      const { data: paymentData } = await api.post('/payments/initialize', payload);

      const authorizationUrl = paymentData.data?.authorization_url || paymentData.authorization_url;
      window.location.href = authorizationUrl;
    } catch (error: any) {
      console.error("Checkout error:", error);
      const errorMsg = error.response?.data?.message || error.message || 'Checkout failed. Please try again.';
      alert(`Checkout failed: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  if (!bundle) return null;

  return (
    <>
      <div className="max-w-[1280px] mx-auto px-4 py-8 md:py-16 space-y-8 md:space-y-16">
        <PageHeader title={<>Complete <span className="text-primary">Checkout</span></>} description="Review your order and enter payment details." />

        <motion.div 
          variants={staggerContainer} initial="hidden" animate="visible"
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full"
        >
          <motion.div variants={fadeUp} className="bg-surface p-6 md:p-8 rounded-[24px] border border-border shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-textPrimary mb-6">Order Summary</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-border pb-4">
                <span className="text-textSecondary font-medium">Network</span>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${networkColors[bundle.network] || 'bg-textPrimary text-surface'}`}>
                  {bundle.network}
                </div>
              </div>
              <div className="flex justify-between border-b border-border pb-4">
                <span className="text-textSecondary font-medium">Bundle</span>
                <span className="font-bold text-textPrimary">{bundle.size}</span>
              </div>
              <div className="flex justify-between pt-4">
                <span className="text-xl font-bold text-textPrimary">Total</span>
                <span className="text-3xl font-black text-primary">GHS {bundle.price.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={fadeUp} className="bg-surface p-6 md:p-8 rounded-[24px] border border-border shadow-sm">
            <h2 className="text-2xl font-bold text-textPrimary mb-4 md:mb-6">Payment Details</h2>
            <form onSubmit={handleCheckout} className="space-y-6">
              <Input 
                label="Recipient Phone Number (Required)" 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required 
              />
              <Input 
                label="Email (Optional)" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <motion.button 
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                type="submit" disabled={loading}
                className="w-full bg-primary hover:bg-[#1D4ED8] text-surface font-bold py-4 rounded-[14px] transition-colors duration-200 shadow-md hover:shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : `Pay GHS ${bundle.price.toFixed(2)} with Paystack`}
              </motion.button>
              <div className="text-center pt-2">
                <p className="text-textSecondary text-xs font-medium">Secured by Paystack</p>
                <div className="flex justify-center gap-2 mt-1 text-xs text-textMuted">
                  <span>Mobile Money</span> • <span>Card</span> • <span>USSD</span>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Checkout;
