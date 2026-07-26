import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BundleCard from '../components/BundleCard';
import PageHeader from '../components/PageHeader';
import CheckoutModal from '../components/CheckoutModal';
import type { BundleType } from '../components/CheckoutModal';

const mtnBundles = [
  { size: '4GB', price: 20.00, category: 'STARTER', validity: 'Non-Expiry' },
  { size: '500GB', price: 220.00, category: 'MEGA', validity: '30 Days' },
  { size: '1TB', price: 400.00, category: 'MEGA', validity: 'Monthly' },
  { size: '8GB', price: 20.66, category: 'DATA', validity: 'Non-Expiry' },
  { size: '10GB', price: 23.55, category: 'DATA', validity: 'Non-Expiry' },
  { size: '14GB', price: 27.33, category: 'DATA', validity: 'Non-Expiry' },
  { size: '17GB', price: 29.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '20GB', price: 34.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '15GB Plus', price: 39.45, category: 'DATA', validity: 'Non-Expiry' },
  { size: '20GB + 1200 mins', price: 63.99, category: 'BUSINESS', validity: 'Monthly' },
  { size: '30GB + 1350 mins', price: 100.99, category: 'BUSINESS', validity: 'Monthly' },
  { size: '40GB + 1550 mins', price: 133.79, category: 'BUSINESS', validity: 'Monthly' },
  { size: '50GB + 1700 mins', price: 155.99, category: 'BUSINESS', validity: 'Monthly' },
  { size: '5GB', price: 20.00, category: 'DATA', validity: '7 Days' },
  { size: '12GB', price: 25.00, category: 'DATA', validity: '14 Days' },
  { size: '25GB', price: 40.00, category: 'DATA', validity: '30 Days' },
  { size: '40GB', price: 60.00, category: 'DATA', validity: 'Monthly' },
  { size: '25GB', price: 45.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '30GB', price: 52.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '40GB', price: 65.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '50GB', price: 78.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '75GB', price: 105.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '100GB', price: 130.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '150GB', price: 175.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '200GB', price: 220.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '250GB', price: 255.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '300GB', price: 290.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '400GB', price: 330.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '500GB', price: 350.00, category: 'MEGA', validity: 'Non-Expiry' },
  { size: '750GB', price: 380.00, category: 'MEGA', validity: 'Non-Expiry' },
  { size: '1TB', price: 400.00, category: 'MEGA', validity: 'Non-Expiry' }
];

const telecelBundles = [
  { size: '8GB', price: 17.45, category: 'DATA', validity: 'Non-Expiry' },
  { size: '11GB', price: 21.79, category: 'DATA', validity: 'Non-Expiry' },
  { size: '15GB', price: 43.79, category: 'DATA', validity: 'Non-Expiry' },
  { size: '20GB +100 mins', price: 79.99, category: 'BUSINESS', validity: 'Monthly' },
  { size: '30GB +315 mins', price: 99.99, category: 'BUSINESS', validity: 'Monthly' },
  { size: '40GB +550 mins', price: 145.60, category: 'BUSINESS', validity: 'Monthly' },
  { size: '50GB +1115 mins', price: 163.99, category: 'BUSINESS', validity: 'Monthly' },
  { size: '100GB +1500 mins', price: 330.79, category: 'BUSINESS', validity: 'Monthly' },
  { size: '10GB', price: 20.00, category: 'DATA', validity: '7 Days' },
  { size: '18GB', price: 30.00, category: 'DATA', validity: '14 Days' },
  { size: '30GB', price: 50.00, category: 'DATA', validity: '30 Days' },
  { size: '50GB', price: 80.00, category: 'DATA', validity: 'Monthly' },
  { size: '25GB', price: 45.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '30GB', price: 52.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '40GB', price: 65.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '50GB', price: 78.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '75GB', price: 105.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '100GB', price: 130.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '150GB', price: 175.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '200GB', price: 220.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '250GB', price: 255.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '300GB', price: 290.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '400GB', price: 330.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '500GB', price: 350.00, category: 'MEGA', validity: 'Non-Expiry' },
  { size: '750GB', price: 380.00, category: 'MEGA', validity: 'Non-Expiry' },
  { size: '1TB', price: 400.00, category: 'MEGA', validity: 'Non-Expiry' }
];

const airteltigoBundles = [
  { size: '7GB', price: 18.50, category: 'DATA', validity: 'Non-Expiry' },
  { size: '8GB', price: 19.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '7GB+', price: 19.50, category: 'DATA', validity: 'Non-Expiry' },
  { size: '8GB+', price: 21.00, category: 'DATA', validity: 'Non-Expiry' },
  { size: '10GB', price: 22.50, category: 'DATA', validity: 'Non-Expiry' },
  { size: '15GB', price: 26.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '20GB', price: 32.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '6GB', price: 17.50, category: 'DATA', validity: '7 Days' },
  { size: '12GB', price: 24.50, category: 'DATA', validity: '14 Days' },
  { size: '20GB', price: 31.99, category: 'DATA', validity: '30 Days' },
  { size: '40GB', price: 57.99, category: 'DATA', validity: 'Monthly' },
  { size: '25GB', price: 39.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '30GB', price: 46.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '40GB', price: 58.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '50GB', price: 73.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '75GB', price: 95.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '100GB', price: 122.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '150GB', price: 165.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '200GB', price: 205.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '250GB', price: 235.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '300GB', price: 265.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '400GB', price: 305.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '500GB', price: 335.00, category: 'MEGA', validity: 'Non-Expiry' },
  { size: '750GB', price: 355.00, category: 'MEGA', validity: 'Non-Expiry' },
  { size: '1TB', price: 385.00, category: 'MEGA', validity: 'Non-Expiry' }
];

const Bundles: React.FC = () => {
  const [networkFilter, setNetworkFilter] = useState<'All' | 'MTN' | 'Telecel' | 'AirtelTigo'>('All');
  const [validityFilter, setValidityFilter] = useState<'All' | 'Non-Expiry' | '30 Days' | '14 Days' | '7 Days' | 'Monthly'>('All');
  const [selectedBundle, setSelectedBundle] = useState<BundleType | null>(null);

  const allBundles = [
    ...mtnBundles.map(b => ({ ...b, network: 'MTN' as const })),
    ...telecelBundles.map(b => ({ ...b, network: 'Telecel' as const })),
    ...airteltigoBundles.map(b => ({ ...b, network: 'AirtelTigo' as const }))
  ];

  let filteredBundles = networkFilter === 'All' 
    ? allBundles 
    : allBundles.filter(b => b.network === networkFilter);

  if (validityFilter !== 'All') {
    filteredBundles = filteredBundles.filter(b => b.validity === validityFilter);
  }

  return (
    <div className="pt-8 md:pt-12 pb-16 md:pb-24">
      <div className="max-w-[1280px] mx-auto px-4">
        
        <PageHeader title="Data Bundles" description="Pick a network to see bundles." />

        <div className="flex flex-wrap gap-3 mb-6 justify-center md:justify-start">
          {['All', 'MTN', 'Telecel', 'AirtelTigo'].map((net) => (
            <button
              key={net}
              onClick={() => setNetworkFilter(net as any)}
              className={`px-6 py-3 rounded-[14px] font-bold transition-all duration-200 ${
                networkFilter === net 
                  ? 'bg-primary text-surface shadow-md hover:scale-[1.02]' 
                  : 'bg-surface text-textSecondary border border-border hover:bg-light hover:text-primary'
              }`}
            >
              {net === 'All' ? 'All Networks' : net === 'MTN' ? 'MTN Ghana' : net === 'Telecel' ? 'Telecel Ghana' : 'AirtelTigo'}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-12 justify-center md:justify-start">
          {['All', 'Non-Expiry', '30 Days', '14 Days', '7 Days', 'Monthly'].map((val) => (
            <button
              key={val}
              onClick={() => setValidityFilter(val as any)}
              className={`px-4 py-2 rounded-[14px] text-sm font-bold transition-all duration-200 ${
                validityFilter === val 
                  ? 'bg-textPrimary text-surface shadow-md' 
                  : 'bg-surface text-textSecondary border border-border hover:bg-light hover:text-textPrimary'
              }`}
            >
              {val === 'All' ? 'All Validities' : val}
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
                validity={bundle.validity}
                onClick={() => setSelectedBundle({ network: bundle.network, size: bundle.size, price: bundle.price, category: bundle.category, validity: bundle.validity })}
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
