import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import api from '../api/axios';
import Input from './Input';

export interface BundleType {
  network: string;
  size: string;
  price: number;
  category?: string;
  validity?: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  bundle: BundleType | null;
}

const networkColors: Record<string, string> = {
  MTN: 'bg-yellow-500 text-black',
  Telecel: 'bg-red-600 text-white',
  AirtelTigo: 'bg-blue-600 text-white',
};

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, bundle }) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setPhone('');
      setEmail('');
      setLoading(false);
    }
  }, [isOpen]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bundle) return;
    
    // Basic validation
    if (!phone || phone.length < 9) {
      alert('Please enter a valid phone number');
      return;
    }
    
    setLoading(true);
    try {
      const finalEmail = email.trim() !== '' ? email : 'guest@bundlehub.com';
      
      const payload = {
        network: bundle.network,
        bundleName: bundle.size,
        price: bundle.price,
        category: bundle.category || 'data',
        validity: bundle.validity,
        phone,
        email: finalEmail
      };
      console.log("Checkout Payload", payload);

      const { data: paymentData } = await api.post('/payments/initialize', payload);

      const authorizationUrl = paymentData.data?.authorization_url || paymentData.authorization_url;
      window.location.href = authorizationUrl;
    } catch (error: any) {
      console.error("Checkout error:", error);
      const errorMsg = error.response?.data?.message || error.message || 'Checkout failed. Please try again.';
      alert(`Checkout failed: ${errorMsg}`);
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && bundle && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center pointer-events-none p-0 md:p-4">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-surface w-full md:w-[500px] max-h-[90vh] overflow-y-auto pointer-events-auto rounded-t-[24px] md:rounded-[24px] shadow-2xl flex flex-col relative border-t md:border border-border"
            >
              <div className="p-6 border-b border-border flex justify-between items-center sticky top-0 bg-surface/95 backdrop-blur z-10 rounded-t-[24px]">
                <h2 className="text-xl font-bold text-textPrimary">Complete Checkout</h2>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-light rounded-full transition-colors text-textSecondary hover:text-textPrimary"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Order Summary */}
                <div className="bg-light p-4 rounded-[16px] space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-textSecondary font-medium">Network</span>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${networkColors[bundle.network] || 'bg-textPrimary text-surface'}`}>
                      {bundle.network}
                    </div>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-border">
                    <span className="text-textSecondary font-medium">Bundle</span>
                    <span className="font-bold text-textPrimary">
                      {bundle.size} {bundle.validity && <span className="text-textSecondary text-sm ml-1 font-medium">({bundle.validity})</span>}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-textPrimary">Total</span>
                    <span className="text-2xl font-black text-primary">GHS {bundle.price.toFixed(2)}</span>
                  </div>
                </div>

                {/* Form */}
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                  <Input 
                    label="Recipient Phone Number (Required)" 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="e.g. 0241234567"
                    required 
                  />
                  <Input 
                    label="Email (Optional for receipts)" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="e.g. name@example.com"
                  />
                </form>
              </div>

              <div className="p-6 border-t border-border mt-auto bg-surface rounded-b-[24px] sticky bottom-0 z-10">
                <button 
                  form="checkout-form"
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-primary hover:bg-[#1D4ED8] text-surface font-bold py-4 rounded-[14px] transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Processing...
                    </>
                  ) : (
                    `Pay GHS ${bundle.price.toFixed(2)}`
                  )}
                </button>
                <div className="text-center mt-3">
                  <p className="text-textSecondary text-xs font-medium">Secured by Paystack</p>
                  <div className="flex justify-center gap-2 mt-1 text-[10px] text-textMuted uppercase tracking-wider">
                    <span>Mobile Money</span> • <span>Card</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
