import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NetworkLogo } from './NetworkLogo';

interface BundleCardProps {
  network: 'MTN' | 'Telecel' | 'AirtelTigo';
  size: string;
  price?: number; // Legacy fallback
  standardPrice?: number;
  instantPrice?: number;
  category?: string;
  validity?: string;
  onClick?: (deliveryType: 'standard' | 'instant', finalPrice: number) => void;
}

const BundleCard: React.FC<BundleCardProps> = ({ network, size, price, standardPrice, instantPrice, category = 'DATA', validity, onClick }) => {
  const [delivery, setDelivery] = useState<'standard' | 'instant'>('instant');

  // Fallbacks
  const actualStandard = standardPrice ?? price ?? 0;
  const actualInstant = instantPrice ?? (actualStandard + 5);
  
  const currentPrice = delivery === 'instant' ? actualInstant : actualStandard;

  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      badge: null,
      price: actualStandard,
      eta: 'Few minutes',
    },
    {
      id: 'instant',
      name: 'Instant Delivery',
      badge: 'Recommended',
      price: actualInstant,
      eta: '10–60 sec',
    }
  ];

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.08)' }}
      className="bg-white border border-slate-200 rounded-[24px] p-6 sm:p-8 relative overflow-hidden group transition-all duration-300 shadow-sm flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6 gap-2 flex-wrap">
        <div className="h-8 flex items-center">
          <NetworkLogo network={network} className="h-full w-auto object-contain" />
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          {validity && (
            <div className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider bg-slate-50 px-2 py-1 rounded-[6px] border border-slate-200">
              {validity}
            </div>
          )}
          <div className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider bg-slate-50 px-2 py-1 rounded-full border border-slate-200">
            {category}
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-3xl font-black text-slate-900 tracking-tight">{size}</h3>
      </div>
      
      <div className="mb-8 flex-grow flex flex-col gap-3">
        <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Delivery Option</h4>
        {deliveryOptions.map((option) => {
          const isSelected = delivery === option.id;

          return (
            <label 
              key={option.id}
              className={`relative flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer gap-3 sm:gap-0 ${
                isSelected 
                  ? 'border-blue-200 bg-blue-50/40 shadow-[0_8px_24px_rgba(37,99,235,0.08)]' 
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 hover:shadow-sm'
              }`}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setDelivery(option.id as any); }}
            >
              <div className="flex items-start gap-3 w-full sm:w-auto">
                <div className={`mt-0.5 w-[18px] h-[18px] rounded-full border flex flex-shrink-0 items-center justify-center transition-colors duration-300 ${
                  isSelected ? 'border-primary bg-primary' : 'border-slate-300'
                }`}>
                  {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`font-semibold text-sm tracking-tight ${isSelected ? 'text-primary' : 'text-slate-800'}`}>
                      {option.name}
                    </span>
                    {option.badge && (
                      <span className="bg-blue-100/50 text-primary text-[10px] font-semibold px-2 py-0.5 rounded-md whitespace-nowrap">
                        {option.badge}
                      </span>
                    )}
                  </div>
                  <p className={`text-xs font-medium ${isSelected ? 'text-primary/70' : 'text-slate-500'}`}>
                    {option.eta}
                  </p>
                </div>
              </div>
              <div className="sm:pl-3 text-left sm:text-right ml-[30px] sm:ml-0">
                <p className={`font-semibold text-[15px] tracking-tight whitespace-nowrap ${isSelected ? 'text-primary' : 'text-slate-900'}`}>
                  GHS {option.price.toFixed(2)}
                </p>
              </div>
              <input 
                type="radio" 
                name={`delivery-${network}-${size}`} 
                value={option.id} 
                checked={isSelected} 
                onChange={() => setDelivery(option.id as any)}
                className="sr-only" 
                aria-label={option.name}
              />
            </label>
          );
        })}
      </div>
      
      <div className="mt-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-slate-500 text-xs sm:text-[13px] font-medium mb-3 sm:mb-4 mt-2 text-center">
          <span>Selected:</span>
          <span className="text-slate-900 font-semibold">{delivery === 'instant' ? 'Instant Delivery' : 'Standard Delivery'}</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-slate-900 font-bold whitespace-nowrap">GHS {currentPrice.toFixed(2)}</span>
        </div>
        <button 
          onClick={() => onClick && onClick(delivery, currentPrice)}
          className="w-full h-[48px] rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 bg-primary hover:bg-[#1D4ED8] text-white shadow-md hover:shadow-lg hover:-translate-y-[1px]"
        >
          Continue to Checkout
        </button>
      </div>
    </motion.div>
  );
};

export default BundleCard;
