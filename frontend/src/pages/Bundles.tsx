import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, History } from 'lucide-react';
import Fuse from 'fuse.js';
import BundleCard from '../components/BundleCard';
import PageHeader from '../components/PageHeader';
import CheckoutModal from '../components/CheckoutModal';
import type { BundleType } from '../components/CheckoutModal';

const mtnBundles = [
  { size: '1GB', standardPrice: 6, instantPrice: 11, category: 'STARTER', validity: 'Non-Expiry' },
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
  { size: '1GB', standardPrice: 6, instantPrice: 11, category: 'STARTER', validity: 'Non-Expiry' },
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
  { size: '1GB', standardPrice: 6, instantPrice: 11, category: 'STARTER', validity: 'Non-Expiry' },
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

const baseBundles = [
  ...mtnBundles.map(b => ({ ...b, network: 'MTN' as const })),
  ...telecelBundles.map(b => ({ ...b, network: 'Telecel' as const })),
  ...airteltigoBundles.map(b => ({ ...b, network: 'AirtelTigo' as const }))
];

// Enrich bundles with searchable strings for Fuse
const searchableBundles = baseBundles.map(b => {
  let networkAlias = b.network;
  if (b.network === 'Telecel') networkAlias += ' Vodafone Telecell';
  if (b.network === 'AirtelTigo') networkAlias += ' Airtel Tigo AT airteltigo';
  if (b.network === 'MTN') networkAlias += ' mtnn ghana';
  
  let sizeAlias = b.size.replace('GB', ' GB').replace('TB', ' TB');
  
  let validityAlias = b.validity;
  if (b.validity === 'Non-Expiry') validityAlias += ' non expiry noexpiry no expiry nonexp';
  if (b.validity === 'Monthly') validityAlias += ' 30 days month';
  
  const priceStr = `${b.standardPrice} ${b.standardPrice.toFixed(2)} ${b.instantPrice} ${b.instantPrice.toFixed(2)}`;
  const deliveryAlias = 'instant fast quick immediate standard normal regular';
  
  const searchString = `${networkAlias} ${sizeAlias} ${b.category} ${validityAlias} ${priceStr} ${deliveryAlias}`.toLowerCase();
  
  return { ...b, searchString };
});

const Bundles: React.FC = () => {
  const [networkFilter, setNetworkFilter] = useState<'All' | 'MTN' | 'Telecel' | 'AirtelTigo'>('All');
  const [validityFilter, setValidityFilter] = useState<'All' | 'Non-Expiry' | '30 Days' | '14 Days' | '7 Days' | 'Monthly'>('All');
  const [selectedBundle, setSelectedBundle] = useState<BundleType | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Load recent searches on mount
  useEffect(() => {
    const saved = localStorage.getItem('bundlehub_recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Save recent searches
  const saveRecentSearch = (query: string) => {
    if (!query.trim()) return;
    const q = query.trim().toLowerCase();
    const newRecent = [q, ...recentSearches.filter(s => s !== q)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('bundlehub_recent_searches', JSON.stringify(newRecent));
  };

  const removeRecentSearch = (e: React.MouseEvent, query: string) => {
    e.stopPropagation();
    const newRecent = recentSearches.filter(s => s !== query);
    setRecentSearches(newRecent);
    localStorage.setItem('bundlehub_recent_searches', JSON.stringify(newRecent));
  };

  const clearHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.removeItem('bundlehub_recent_searches');
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim().toLowerCase());
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle outside click for suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Memoize Fuse instances and perform AND-logic fuzzy search
  const filteredBundles = useMemo(() => {
    // 1. First apply strict categorical filters
    let results = searchableBundles;
    if (networkFilter !== 'All') {
      results = results.filter(b => b.network === networkFilter);
    }
    if (validityFilter !== 'All') {
      results = results.filter(b => b.validity === validityFilter);
    }

    // 2. If no search, return filtered
    if (!debouncedSearch) return results;

    // 3. AND-logic Fuzzy Search: Tokenize search into words
    const tokens = debouncedSearch.split(/\s+/).filter(Boolean);
    
    // For each token, run a fuzzy search on the remaining results
    let currentResults = [...results];
    
    for (const token of tokens) {
      if (currentResults.length === 0) break;
      const fuse = new Fuse(currentResults, {
        keys: ['searchString'],
        threshold: 0.35, // forgiving for typos like mtnn, instat
        ignoreLocation: true,
        includeScore: true
      });
      
      const searchRes = fuse.search(token);
      currentResults = searchRes.map(res => res.item);
    }
    
    return currentResults;
  }, [debouncedSearch, networkFilter, validityFilter]);

  // Handle enter key to save search
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveRecentSearch(searchQuery);
      setIsFocused(false);
      (document.activeElement as HTMLElement)?.blur();
    }
  };

  const executeSearch = (query: string) => {
    setSearchQuery(query);
    setDebouncedSearch(query.toLowerCase());
    saveRecentSearch(query);
    setIsFocused(false);
  };

  return (
    <div className="pt-8 md:pt-12 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <PageHeader title="Data Bundles" description="Pick a network to see bundles." />

        {/* Smart Search Bar */}
        <div ref={searchContainerRef} className="w-full max-w-[600px] mx-auto mb-10 relative z-30">
          <div className={`relative flex items-center w-full h-[52px] rounded-xl border bg-white transition-all overflow-hidden ${
            isFocused 
              ? 'border-primary ring-4 ring-primary/10 shadow-md' 
              : 'border-slate-200 shadow-sm hover:border-slate-300'
          }`}>
            <div className={`pl-4 ${isFocused ? 'text-primary' : 'text-slate-400'}`}>
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search bundles (e.g. 10GB, MTN, Non-Expiry)"
              className="w-full h-full pl-3 pr-10 outline-none text-slate-900 placeholder-slate-400 bg-transparent text-sm sm:text-base font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  searchContainerRef.current?.querySelector('input')?.focus();
                }}
                className="absolute right-3 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Search Suggestions & History Dropdown */}
          <AnimatePresence>
            {isFocused && (searchQuery.length > 0 || recentSearches.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
                className="absolute top-[60px] left-0 w-full bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden py-2 z-40"
              >
                {searchQuery.length === 0 && recentSearches.length > 0 ? (
                  <div>
                    <div className="flex justify-between items-center px-4 py-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Searches</span>
                      <button onClick={clearHistory} className="text-xs text-primary hover:underline font-medium">Clear all</button>
                    </div>
                    {recentSearches.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => executeSearch(s)}
                        className="w-full px-4 py-2.5 flex justify-between items-center hover:bg-slate-50 transition-colors text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <History size={16} className="text-slate-400" />
                          <span className="text-slate-700 font-medium text-sm">{s}</span>
                        </div>
                        <div 
                          role="button"
                          onClick={(e) => removeRecentSearch(e, s)}
                          className="p-1 text-slate-300 hover:text-danger hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <X size={14} />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div>
                    {/* Auto-suggestions based on current typing */}
                    {filteredBundles.slice(0, 5).map((b, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          const suggestion = `${b.network} ${b.size} ${b.validity === 'Non-Expiry' ? 'Non-Expiry' : ''}`.trim();
                          executeSearch(suggestion);
                        }}
                        className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left"
                      >
                        <Search size={16} className="text-slate-400" />
                        <span className="text-slate-700 font-medium text-sm">
                          {b.network} <span className="font-bold text-slate-900">{b.size}</span> {b.validity === 'Non-Expiry' && '- Non-Expiry'}
                        </span>
                      </button>
                    ))}
                    {filteredBundles.length === 0 && (
                      <div className="px-4 py-6 text-center text-slate-500 text-sm">
                        No suggestions found
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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

        {filteredBundles.length > 0 ? (
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
                  searchQuery={debouncedSearch}
                  onClick={(deliveryType, finalPrice) => setSelectedBundle({ network: bundle.network, size: bundle.size, finalPrice, deliveryType, category: bundle.category, validity: bundle.validity })}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex flex-col items-center justify-center py-20 px-4 text-center"
          >
            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-5 shadow-sm">
              <Search size={28} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No bundles found</h3>
            <p className="text-slate-500 mb-6 max-w-sm">
              We couldn't find anything matching "<span className="font-semibold text-slate-700">{searchQuery}</span>". Try searching for <span className="font-semibold text-slate-700">MTN</span>, <span className="font-semibold text-slate-700">10GB</span>, <span className="font-semibold text-slate-700">Non-Expiry</span>, or <span className="font-semibold text-slate-700">Starter</span>.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setNetworkFilter('All');
                setValidityFilter('All');
              }}
              className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm focus:ring-2 focus:ring-primary/20"
            >
              Clear Search
            </button>
          </motion.div>
        )}
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
