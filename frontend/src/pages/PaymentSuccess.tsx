import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Phone, FileText, Clock, ArrowRight } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference') || searchParams.get('trxref') || 'N/A';
  
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    if (reference !== 'N/A') {
      api.get(`/orders/track?query=${reference}`).then(res => {
        if (res.data && res.data.length > 0) {
          setOrderData(res.data[0]);
        }
      }).catch(err => console.error(err));
    }
  }, [reference]);

  return (
    <>
      <div className="max-w-[1280px] mx-auto flex items-center justify-center py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-card border border-borderDark rounded-[3rem] p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-success/10 blur-[50px] pointer-events-none"></div>
          
          <div className="text-center mb-10 relative z-10">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle size={48} />
            </motion.div>
            <h1 className="text-4xl font-black text-textMain mb-2">Payment Successful</h1>
            <p className="text-textMuted text-lg">Your payment has been verified.</p>
          </div>

          <div className="bg-backgroundSecondary border border-borderDark rounded-3xl p-6 space-y-4 mb-10 relative z-10">
            <div className="flex items-center gap-4 border-b border-borderDark pb-4">
              <Package className="text-primary" size={24} />
              <div>
                <p className="text-xs text-textSecondary uppercase font-bold tracking-wider">Bundle</p>
                <p className="text-textMain font-medium">{orderData?.bundle?.size || 'N/A'} {orderData?.bundle?.network || ''}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 border-b border-borderDark pb-4">
              <Phone className="text-primary" size={24} />
              <div>
                <p className="text-xs text-textSecondary uppercase font-bold tracking-wider">Recipient</p>
                <p className="text-textMain font-medium">{orderData?.phoneNumber || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-b border-borderDark pb-4">
              <FileText className="text-primary" size={24} />
              <div>
                <p className="text-xs text-textSecondary uppercase font-bold tracking-wider">Reference</p>
                <p className="text-textMain font-medium font-mono text-sm">{reference}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 border-b border-borderDark pb-4">
              <CheckCircle className="text-primary" size={24} />
              <div>
                <p className="text-xs text-textSecondary uppercase font-bold tracking-wider">Status</p>
                <p className="text-textMain font-medium capitalize">{orderData?.status || 'Processing'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <Clock className="text-primary" size={24} />
              <div>
                <p className="text-xs text-textSecondary uppercase font-bold tracking-wider">Estimated delivery</p>
                <p className="text-success font-bold">Under 60 seconds</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            <Link to="/track-order" className="bg-backgroundSecondary hover:bg-background border border-borderDark text-textMain font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors">
              Track Order
            </Link>
            <Link to="/bundles" className="bg-primary hover:bg-primaryHover text-textMain font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors duration-200 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              Buy Another Bundle <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default PaymentSuccess;
