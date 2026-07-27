import React from 'react';
import { motion } from 'framer-motion';
import { NetworkLogo } from './NetworkLogo';


interface BundleCardProps {
  network: 'MTN' | 'Telecel' | 'AirtelTigo';
  size: string;
  price: number;
  category?: string;
  validity?: string;
  onClick?: () => void;
}

const BundleCard: React.FC<BundleCardProps> = ({ network, size, price, category = 'DATA', validity, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.1), 0 8px 10px -6px rgba(37, 99, 235, 0.1)' }}
      className="bg-surface border border-border rounded-[18px] p-6 relative overflow-hidden group transition-all duration-200 shadow-sm flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-8 gap-2 flex-wrap">
        <div className="h-8 flex items-center">
          <NetworkLogo network={network} className="h-full w-auto object-contain" />
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          {validity && (
            <div className="text-primary text-xs font-bold uppercase tracking-wider bg-light px-3 py-1 rounded-[8px] border border-primary/20">
              {validity}
            </div>
          )}
          <div className="text-textMuted text-xs font-medium uppercase tracking-wider bg-surfaceSecondary px-3 py-1 rounded-full border border-border">
            {category}
          </div>
        </div>
      </div>
      
      <div className="mb-2">
        <h3 className="text-3xl font-black text-textPrimary">{size}</h3>
      </div>
      
      <div className="mb-8 flex-grow">
        <span className="text-sm text-textSecondary">GHS </span>
        <span className="text-4xl font-bold text-primary">{price.toFixed(2)}</span>
      </div>
      
      <button 
        onClick={onClick}
        className="w-full py-4 rounded-[14px] bg-light hover:bg-primary text-primary hover:text-surface font-bold flex items-center justify-center gap-2 transition-colors duration-200 mt-auto"
      >
        Buy &rarr;
      </button>
    </motion.div>
  );
};

export default BundleCard;
