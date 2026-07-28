import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BundleCard from '../components/BundleCard';
import PageHeader from '../components/PageHeader';
import CheckoutModal from '../components/CheckoutModal';
import type { BundleType } from '../components/CheckoutModal';

const mtnBundles = [
  { size: '4GB', standardPrice: 20, instantPrice: 25, category: 'STARTER', validity: 'Non-Expiry' },
  { size: '500GB', standardPrice: 220, instantPrice: 225, category: 'MEGA', validity: '30 Days' },
  { size: '1TB', standardPrice: 400, instantPrice: 405, category: 'MEGA', validity: 'Monthly' },
  { size: '8GB', standardPrice: 20.66, instantPrice: 25.66, category: 'DATA', validity: 'Non-Expiry' },
  { size: '10GB', standardPrice: 23.55, instantPrice: 28.55, category: 'DATA', validity: 'Non-Expiry' },
  { size: '14GB', standardPrice: 27.33, instantPrice: 32.33, category: 'DATA', validity: 'Non-Expiry' },
  { size: '17GB', standardPrice: 29.99, instantPrice: 34.989999999999995, category: 'DATA', validity: 'Non-Expiry' },
  { size: '20GB', standardPrice: 34.99, instantPrice: 39.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '15GB Plus', standardPrice: 39.45, instantPrice: 44.45, category: 'DATA', validity: 'Non-Expiry' },
  { size: '20GB + 1200 mins', standardPrice: 63.99, instantPrice: 68.99000000000001, category: 'BUSINESS', validity: 'Monthly' },
  { size: '30GB + 1350 mins', standardPrice: 100.99, instantPrice: 105.99, category: 'BUSINESS', validity: 'Monthly' },
  { size: '40GB + 1550 mins', standardPrice: 133.79, instantPrice: 138.79, category: 'BUSINESS', validity: 'Monthly' },
  { size: '50GB + 1700 mins', standardPrice: 155.99, instantPrice: 160.99, category: 'BUSINESS', validity: 'Monthly' },
  { size: '5GB', standardPrice: 20, instantPrice: 25, category: 'DATA', validity: '7 Days' },
  { size: '12GB', standardPrice: 25, instantPrice: 30, category: 'DATA', validity: '14 Days' },
  { size: '25GB', standardPrice: 40, instantPrice: 45, category: 'DATA', validity: '30 Days' },
  { size: '40GB', standardPrice: 60, instantPrice: 65, category: 'DATA', validity: 'Monthly' },
  { size: '25GB', standardPrice: 45, instantPrice: 50, category: 'DATA', validity: 'Non-Expiry' },
  { size: '30GB', standardPrice: 52, instantPrice: 57, category: 'DATA', validity: 'Non-Expiry' },
  { size: '40GB', standardPrice: 65, instantPrice: 70, category: 'DATA', validity: 'Non-Expiry' },
  { size: '50GB', standardPrice: 78, instantPrice: 83, category: 'DATA', validity: 'Non-Expiry' },
  { size: '75GB', standardPrice: 105, instantPrice: 110, category: 'DATA', validity: 'Non-Expiry' },
  { size: '100GB', standardPrice: 130, instantPrice: 135, category: 'DATA', validity: 'Non-Expiry' },
  { size: '150GB', standardPrice: 175, instantPrice: 180, category: 'DATA', validity: 'Non-Expiry' },
  { size: '200GB', standardPrice: 220, instantPrice: 225, category: 'DATA', validity: 'Non-Expiry' },
  { size: '250GB', standardPrice: 255, instantPrice: 260, category: 'DATA', validity: 'Non-Expiry' },
  { size: '300GB', standardPrice: 290, instantPrice: 295, category: 'DATA', validity: 'Non-Expiry' },
  { size: '400GB', standardPrice: 330, instantPrice: 335, category: 'DATA', validity: 'Non-Expiry' },
  { size: '500GB', standardPrice: 350, instantPrice: 355, category: 'MEGA', validity: 'Non-Expiry' },
  { size: '750GB', standardPrice: 380, instantPrice: 385, category: 'MEGA', validity: 'Non-Expiry' },
  { size: '1TB', standardPrice: 400, instantPrice: 405, category: 'MEGA', validity: 'Non-Expiry' }
];

const telecelBundles = [
  { size: '8GB', standardPrice: 17.45, instantPrice: 22.45, category: 'DATA', validity: 'Non-Expiry' },
  { size: '11GB', standardPrice: 21.79, instantPrice: 26.79, category: 'DATA', validity: 'Non-Expiry' },
  { size: '15GB', standardPrice: 43.79, instantPrice: 48.79, category: 'DATA', validity: 'Non-Expiry' },
  { size: '20GB +100 mins', standardPrice: 79.99, instantPrice: 84.99, category: 'BUSINESS', validity: 'Monthly' },
  { size: '30GB +315 mins', standardPrice: 99.99, instantPrice: 104.99, category: 'BUSINESS', validity: 'Monthly' },
  { size: '40GB +550 mins', standardPrice: 145.6, instantPrice: 150.6, category: 'BUSINESS', validity: 'Monthly' },
  { size: '50GB +1115 mins', standardPrice: 163.99, instantPrice: 168.99, category: 'BUSINESS', validity: 'Monthly' },
  { size: '100GB +1500 mins', standardPrice: 330.79, instantPrice: 335.79, category: 'BUSINESS', validity: 'Monthly' },
  { size: '10GB', standardPrice: 20, instantPrice: 25, category: 'DATA', validity: '7 Days' },
  { size: '18GB', standardPrice: 30, instantPrice: 35, category: 'DATA', validity: '14 Days' },
  { size: '30GB', standardPrice: 50, instantPrice: 55, category: 'DATA', validity: '30 Days' },
  { size: '50GB', standardPrice: 80, instantPrice: 85, category: 'DATA', validity: 'Monthly' },
  { size: '25GB', standardPrice: 45, instantPrice: 50, category: 'DATA', validity: 'Non-Expiry' },
  { size: '30GB', standardPrice: 52, instantPrice: 57, category: 'DATA', validity: 'Non-Expiry' },
  { size: '40GB', standardPrice: 65, instantPrice: 70, category: 'DATA', validity: 'Non-Expiry' },
  { size: '50GB', standardPrice: 78, instantPrice: 83, category: 'DATA', validity: 'Non-Expiry' },
  { size: '75GB', standardPrice: 105, instantPrice: 110, category: 'DATA', validity: 'Non-Expiry' },
  { size: '100GB', standardPrice: 130, instantPrice: 135, category: 'DATA', validity: 'Non-Expiry' },
  { size: '150GB', standardPrice: 175, instantPrice: 180, category: 'DATA', validity: 'Non-Expiry' },
  { size: '200GB', standardPrice: 220, instantPrice: 225, category: 'DATA', validity: 'Non-Expiry' },
  { size: '250GB', standardPrice: 255, instantPrice: 260, category: 'DATA', validity: 'Non-Expiry' },
  { size: '300GB', standardPrice: 290, instantPrice: 295, category: 'DATA', validity: 'Non-Expiry' },
  { size: '400GB', standardPrice: 330, instantPrice: 335, category: 'DATA', validity: 'Non-Expiry' },
  { size: '500GB', standardPrice: 350, instantPrice: 355, category: 'MEGA', validity: 'Non-Expiry' },
  { size: '750GB', standardPrice: 380, instantPrice: 385, category: 'MEGA', validity: 'Non-Expiry' },
  { size: '1TB', standardPrice: 400, instantPrice: 405, category: 'MEGA', validity: 'Non-Expiry' }
];

const airteltigoBundles = [
  { size: '7GB', standardPrice: 18.5, instantPrice: 23.5, category: 'DATA', validity: 'Non-Expiry' },
  { size: '8GB', standardPrice: 19.99, instantPrice: 24.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '7GB+', standardPrice: 19.5, instantPrice: 24.5, category: 'DATA', validity: 'Non-Expiry' },
  { size: '8GB+', standardPrice: 21, instantPrice: 26, category: 'DATA', validity: 'Non-Expiry' },
  { size: '10GB', standardPrice: 22.5, instantPrice: 27.5, category: 'DATA', validity: 'Non-Expiry' },
  { size: '15GB', standardPrice: 26.99, instantPrice: 31.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '20GB', standardPrice: 32.99, instantPrice: 37.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '6GB', standardPrice: 17.5, instantPrice: 22.5, category: 'DATA', validity: '7 Days' },
  { size: '12GB', standardPrice: 24.5, instantPrice: 29.5, category: 'DATA', validity: '14 Days' },
  { size: '20GB', standardPrice: 31.99, instantPrice: 36.989999999999995, category: 'DATA', validity: '30 Days' },
  { size: '40GB', standardPrice: 57.99, instantPrice: 62.99, category: 'DATA', validity: 'Monthly' },
  { size: '25GB', standardPrice: 39.99, instantPrice: 44.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '30GB', standardPrice: 46.99, instantPrice: 51.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '40GB', standardPrice: 58.99, instantPrice: 63.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '50GB', standardPrice: 73.99, instantPrice: 78.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '75GB', standardPrice: 95.99, instantPrice: 100.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '100GB', standardPrice: 122.99, instantPrice: 127.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '150GB', standardPrice: 165.99, instantPrice: 170.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '200GB', standardPrice: 205.99, instantPrice: 210.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '250GB', standardPrice: 235.99, instantPrice: 240.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '300GB', standardPrice: 265.99, instantPrice: 270.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '400GB', standardPrice: 305.99, instantPrice: 310.99, category: 'DATA', validity: 'Non-Expiry' },
  { size: '500GB', standardPrice: 335, instantPrice: 340, category: 'MEGA', validity: 'Non-Expiry' },
  { size: '750GB', standardPrice: 355, instantPrice: 360, category: 'MEGA', validity: 'Non-Expiry' },
  { size: '1TB', standardPrice: 385, instantPrice: 390, category: 'MEGA', validity: 'Non-Expiry' }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <PageHeader title="Data Bundles" description="Pick a network to see bundles." />

        <div className="flex flex-wrap gap-3 mb-6 justify-center md:justify-start">
          {['All', 'MTN', 'Telecel', 'AirtelTigo'].map((net) => (
            <button
              key={net}
              onClick={() => setNetworkFilter(net as any)}
              className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                networkFilter === net 
                  ? 'bg-primary text-white shadow-md hover:scale-[1.02]' 
                  : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-primary'
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
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                validityFilter === val 
                  ? 'bg-slate-800 text-white shadow-md' 
                  : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              {val === 'All' ? 'All Validities' : val}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
                price={bundle.standardPrice} 
                category={bundle.category}
                validity={bundle.validity}
                onClick={(deliveryType, finalPrice) => setSelectedBundle({ network: bundle.network, size: bundle.size, finalPrice, deliveryType, category: bundle.category, validity: bundle.validity })}
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
