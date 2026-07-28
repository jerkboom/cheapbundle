import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import BundleCard from '../components/BundleCard';
import { NetworkLogo } from '../components/NetworkLogo';
import CheckoutModal from '../components/CheckoutModal';
import type { BundleType } from '../components/CheckoutModal';

const Home: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedBundle, setSelectedBundle] = useState<BundleType | null>(null);

  const faqs = [
    {
      q: "How fast is the delivery?",
      a: "Delivery is instant! As soon as your payment is confirmed, your bundle is sent directly to your phone number within seconds."
    },
    {
      q: "Do I need to create an account?",
      a: "No, you don't need an account to buy a bundle. You can simply select a bundle, enter your phone number, pay with Paystack, and receive your bundle instantly."
    },
    {
      q: "What networks do you support?",
      a: "We currently support MTN Ghana, Telecel Ghana, and AirtelTigo."
    },
    {
      q: "Is it safe to pay on this site?",
      a: "Absolutely. We use Paystack for all our transactions, which is one of the most secure and trusted payment gateways in Africa."
    }
  ];

  return (
    <div>
      {/* Network Cards */}
      <section className="px-4 py-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {['MTN Ghana', 'Telecel Ghana', 'AirtelTigo'].map((network, i) => (
            <Link to={`/bundles?network=${network.split(' ')[0]}`} key={network}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.1)' }}
                className="bg-surface border border-border rounded-[18px] p-8 group cursor-pointer transition-all duration-200 shadow-sm"
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="h-10 flex items-center">
                    <NetworkLogo network={network} className="h-full w-auto object-contain" />
                  </div>
                  <ArrowRight className="text-textSecondary group-hover:text-primary transition-colors duration-200" />
                </div>
                <p className="text-textSecondary font-medium">From GHS 2.20</p>
                <div className="mt-8 text-primary font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Browse <ArrowRight size={16} />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Bundles */}
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h4 className="text-primary font-bold tracking-widest text-sm mb-2">POPULAR RIGHT NOW</h4>
            <h2 className="text-4xl font-black text-textPrimary">Featured bundles</h2>
          </div>
          <Link to="/bundles" className="hidden sm:flex text-textSecondary hover:text-primary font-medium items-center gap-2 group transition-colors duration-200">
            See all <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 auto-rows-fr">
          <div className="h-full"><BundleCard network="MTN" size="10GB" price={23.55} category="DATA" validity="Non-Expiry" onClick={(deliveryType, finalPrice) => setSelectedBundle({ network: 'MTN', size: '10GB', finalPrice, deliveryType, category: 'DATA', validity: 'Non-Expiry' })} /></div>
          <div className="h-full"><BundleCard network="Telecel" size="11GB" price={21.79} category="DATA" validity="Non-Expiry" onClick={(deliveryType, finalPrice) => setSelectedBundle({ network: 'Telecel', size: '11GB', finalPrice, deliveryType, category: 'DATA', validity: 'Non-Expiry' })} /></div>
          <div className="h-full sm:col-span-2 lg:col-span-1"><BundleCard network="AirtelTigo" size="10GB" price={34.99} category="DATA" validity="Non-Expiry" onClick={(deliveryType, finalPrice) => setSelectedBundle({ network: 'AirtelTigo', size: '10GB', finalPrice, deliveryType, category: 'DATA', validity: 'Non-Expiry' })} /></div>
        </div>
        
        <Link to="/bundles" className="sm:hidden mt-8 text-textSecondary hover:text-primary font-medium flex items-center justify-center gap-2 group transition-colors duration-200 w-full p-4 border border-border rounded-[14px]">
          See all <ArrowRight size={16} />
        </Link>
      </section>

      {/* How it Works */}
      <section className="px-4 py-16 md:py-20 max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-textPrimary mb-4">How it Works</h2>
          <p className="text-textSecondary text-base md:text-lg">Get your data bundle in four simple steps.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Pick network', desc: 'Select your preferred network provider.' },
            { step: '02', title: 'Choose bundle', desc: 'Find the perfect data plan for your needs.' },
            { step: '03', title: 'Enter phone', desc: 'Input the recipient phone number.' },
            { step: '04', title: 'Pay & receive', desc: 'Checkout securely and get instant delivery.' },
          ].map((item, i) => (
            <motion.div 
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface border border-border rounded-[18px] p-8 relative shadow-sm"
            >
              <div className="text-5xl font-black text-border absolute top-4 right-6">{item.step}</div>
              <div className="w-12 h-12 bg-light rounded-[12px] flex items-center justify-center text-primary font-bold mb-6">
                {i + 1}
              </div>
              <h3 className="text-xl font-bold text-textPrimary mb-2">{item.title}</h3>
              <p className="text-textSecondary">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="px-4 py-10 max-w-7xl mx-auto">
        <div className="bg-surface shadow-sm rounded-[18px] border border-border p-8 md:p-16 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-border">
          <div className="text-center pt-6 sm:pt-0 first:pt-0">
            <h3 className="text-4xl md:text-5xl font-black text-textPrimary mb-2">10,040+</h3>
            <p className="text-textSecondary font-bold">Bundles sold</p>
          </div>
          <div className="text-center pt-6 sm:pt-0">
            <h3 className="text-4xl md:text-5xl font-black text-textPrimary mb-2">&lt; 60s</h3>
            <p className="text-textSecondary font-bold">Average delivery</p>
          </div>
          <div className="text-center pt-6 sm:pt-0">
            <h3 className="text-4xl md:text-5xl font-black text-textPrimary mb-2">24/7</h3>
            <p className="text-textSecondary font-bold">Support</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-24 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-textPrimary">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="bg-surface border border-border rounded-[18px] overflow-hidden shadow-sm"
            >
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full px-6 py-5 text-left flex justify-between items-center text-textPrimary font-bold hover:text-primary transition-colors duration-200"
              >
                {faq.q}
                <ChevronDown className={`transition-transform duration-200 ${activeFaq === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-5 text-textSecondary leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      <CheckoutModal 
        isOpen={selectedBundle !== null} 
        onClose={() => setSelectedBundle(null)} 
        bundle={selectedBundle} 
      />
    </div>
  );
};

export default Home;
