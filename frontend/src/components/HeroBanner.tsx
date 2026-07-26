import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

const HeroBanner: React.FC = () => {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 px-4 max-w-[1280px] mx-auto flex flex-col items-center text-center">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-light/50 to-transparent pointer-events-none -z-10"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 md:w-96 h-72 md:h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border mb-6 md:mb-8 shadow-sm"
      >
        <Zap size={16} className="text-primary" />
        <span className="text-sm font-medium text-primary">⚡ Instant Delivery</span>
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-7xl font-black text-textPrimary leading-tight mb-4 md:mb-6 max-w-4xl"
      >
        Ghana's <span className="text-primary">cheapest</span> data bundles.
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-base sm:text-lg md:text-xl text-textSecondary max-w-2xl mb-8 md:mb-12"
      >
        MTN, Telecel & AirtelTigo bundles delivered to your phone in seconds. Pay with Paystack — no account required.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
      >
        <Link to="/bundles" className="w-full sm:w-auto px-8 py-4 rounded-[14px] bg-primary text-surface font-bold text-lg hover:shadow-lg hover:bg-[#1D4ED8] hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 group min-h-[48px]">
          Buy Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link to="/track-order" className="w-full sm:w-auto px-8 py-4 rounded-[14px] bg-surface text-primary font-bold text-lg border border-primary hover:bg-light transition-all duration-200 flex items-center justify-center min-h-[48px]">
          Track Order
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroBanner;
