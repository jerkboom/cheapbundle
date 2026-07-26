import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BundleCard from '../components/BundleCard';
import PageHeader from '../components/PageHeader';
import CheckoutModal from '../components/CheckoutModal';
import type { BundleType } from '../components/CheckoutModal';

const mtnBundles = [
  { size: '4GB', price: 20.00, category: 'STARTER' },
  { size: '500GB', price: 220.00, category: 'MEGA' },
  { size: '1TB', price: 400.00, category: 'MEGA' },
  { size: '8GB', price: 20.66, category: 'DATA' },
  { size: '10GB', price: 23.55, category: 'DATA' },
  { size: '14GB', price: 27.33, category: 'DATA' },
  { size: '17GB', price: 29.99, category: 'DATA' },
  { size: '20GB', price: 34.99, category: 'DATA' },
  { size: '15GB Plus', price: 39.45, category: 'DATA' },
  { size: '20GB + 1200 mins', price: 63.99, category: 'BUSINESS' },
  { size: '30GB + 1350 mins', price: 100.99, category: 'BUSINESS' },
  { size: '40GB + 1550 mins', price: 133.79, category: 'BUSINESS' },
  { size: '50GB + 1700 mins', price: 155.99, category: 'BUSINESS' }
];

const telecelBundles = [
  { size: '8GB', price: 17.45, category: 'DATA' },
  { size: '11GB', price: 21.79, category: 'DATA' },
  { size: '15GB', price: 43.79, category: 'DATA' },
  { size: '20GB +100 mins', price: 79.99, category: 'BUSINESS' },
  { size: '30GB +315 mins', price: 99.99, category: 'BUSINESS' },
  { size: '40GB +550 mins', price: 145.60, category: 'BUSINESS' },
  { size: '50GB +1115 mins', price: 163.99, category: 'BUSINESS' },
  { size: '100GB +1500 mins', price: 330.79, category: 'BUSINESS' }
];

const airteltigoBundles = [
  { size: '7GB', price: 20.50, category: 'DATA' },
  { size: '8GB', price: 22.55, category: 'DATA' },
  { size: '7GB+', price: 26.33, category: 'DATA' },
  { size: '8GB+', price: 29.99, category: 'DATA' },
  { size: '10GB', price: 34.99, category: 'DATA' },
  { size: '15GB', price: 39.45, category: 'DATA' },
  { size: '20GB', price: 66.79, category: 'DATA' },
  { size: '25GB', price: 87.99, category: 'DATA' },
  { size: '30GB', price: 105.79, category: 'DATA' },
  { size: '50GB', price: 155.78, category: 'DATA' }
];

const Bundles: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'MTN' | 'Telecel' | 'AirtelTigo'>('All');
  const [selectedBundle, setSelectedBundle] = useState<BundleType | null>(null);

  const allBundles = [
    ...mtnBundles.map(b => ({ ...b, network: 'MTN' as const })),
    ...telecelBundles.map(b => ({ ...b, network: 'Telecel' as const })),
    ...airteltigoBundles.map(b => ({ ...b, network: 'AirtelTigo' as const }))
  ];

  const filteredBundles = filter === 'All' 
    ? allBundles 
    : allBundles.filter(b => b.network === filter);

  return (
    <div className="pt-8 md:pt-12 pb-16 md:pb-24">
      <div className="max-w-[1280px] mx-auto px-4">
        
        <PageHeader title="Data Bundles" description="Pick a network to see bundles." />

        <div className="flex flex-wrap gap-3 mb-12 justify-center md:justify-start">
          {['All', 'MTN', 'Telecel', 'AirtelTigo'].map((net) => (
            <button
              key={net}
              onClick={() => setFilter(net as any)}
              className={`px-6 py-3 rounded-[14px] font-bold transition-all duration-200 ${
                filter === net 
                  ? 'bg-primary text-surface shadow-md hover:scale-[1.02]' 
                  : 'bg-surface text-textSecondary border border-border hover:bg-light hover:text-primary'
              }`}
            >
              {net === 'All' ? 'All Networks' : net === 'MTN' ? 'MTN Ghana' : net === 'Telecel' ? 'Telecel Ghana' : 'AirtelTigo'}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {filteredBundles.map((bundle, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={`${bundle.network}-${bundle.size}-${i}`}
            >
              <BundleCard 
                network={bundle.network} 
                size={bundle.size} 
                price={bundle.price} 
                category={bundle.category}
                onClick={() => setSelectedBundle({ network: bundle.network, size: bundle.size, price: bundle.price, category: bundle.category })}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <CheckoutModal 
        isOpen={selectedBundle !== null} 
        onClose={() => setSelectedBundle(null)} 
        bundle={selectedBundle} 
      />
    </div>
  );
};

export default Bundles;
