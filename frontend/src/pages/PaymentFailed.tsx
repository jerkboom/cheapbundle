import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, ArrowRight, Home } from 'lucide-react';

const PaymentFailed: React.FC = () => {
  return (
    <div className="max-w-[1280px] mx-auto flex items-center justify-center py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full bg-card border border-borderDark rounded-[3rem] p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-danger/10 blur-[50px] pointer-events-none"></div>
        
        <div className="text-center mb-10 relative z-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-24 h-24 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <XCircle size={48} />
          </motion.div>
          <h1 className="text-4xl font-black text-textMain mb-2">Payment Failed</h1>
          <p className="text-textMuted text-lg">We could not verify your payment.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
          <Link to="/" className="bg-backgroundSecondary hover:bg-background border border-borderDark text-textMain font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors">
            <Home size={18} /> Go Home
          </Link>
          <Link to="/bundles" className="bg-primary hover:bg-primaryHover text-textMain font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors duration-200 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            Try Again <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;
