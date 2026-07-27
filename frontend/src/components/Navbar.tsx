import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const auth = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    auth?.logout();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 h-[80px] w-full bg-surface/90 backdrop-blur-lg border-b border-border shadow-sm flex items-center justify-center"
    >
      <div className="w-full max-w-[1280px] px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl shadow-inner border border-primary/20">
            <svg className="w-6 h-6 text-primary drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5Z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-textPrimary tracking-tight leading-none">
              BundleHub<span className="text-primary">.</span>
            </span>
            <span className="text-[10px] text-primary font-bold tracking-widest mt-1 uppercase">
              Hub • Ghana
            </span>
          </div>
        </Link>
        <div className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
          <Link to="/bundles" className="text-textSecondary hover:text-primary transition-colors duration-300 font-medium">Bundles</Link>
          <Link to="/track-order" className="text-textSecondary hover:text-primary transition-colors duration-300 font-medium">Track Order</Link>
          <Link to="/become-a-seller" className="text-textSecondary hover:text-primary transition-colors duration-300 font-medium">Become a Seller</Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {auth?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 text-textSecondary hover:text-primary transition-colors duration-200 font-medium bg-surface px-4 py-2 rounded-full border border-border"
                >
                  👤 {auth.user.name.split(' ')[0]} ▼
                </button>
                
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-48 bg-surface border border-border rounded-xl shadow-lg py-2 flex flex-col z-50 overflow-hidden"
                    >
                      <Link to="/profile" onClick={() => setDropdownOpen(false)} className="px-4 py-2 text-sm text-textSecondary hover:text-primary hover:bg-surfaceSecondary transition-colors">Profile</Link>
                      <Link to="/track-order" onClick={() => setDropdownOpen(false)} className="px-4 py-2 text-sm text-textSecondary hover:text-primary hover:bg-surfaceSecondary transition-colors">My Orders</Link>
                      {auth.user.role !== 'seller' && (
                        <Link to="/become-a-seller" onClick={() => setDropdownOpen(false)} className="px-4 py-2 text-sm text-textSecondary hover:text-primary hover:bg-surfaceSecondary transition-colors">Become a Seller</Link>
                      )}
                      {(auth.user.role === 'seller' || auth.user.role === 'admin') && (
                        <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="px-4 py-2 text-sm text-textSecondary hover:text-primary hover:bg-surfaceSecondary transition-colors">Dashboard</Link>
                      )}
                      <button onClick={handleLogout} className="px-4 py-2 text-sm text-danger hover:text-red-600 hover:bg-red-50 transition-colors text-left border-t border-border mt-1 pt-3">Logout</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-textSecondary hover:text-primary transition-colors duration-200 font-medium">
                  Sign In
                </Link>
                <Link to="/register" className="px-5 py-2 rounded-[14px] bg-primary text-surface shadow-md hover:shadow-lg hover:scale-[1.02] hover:bg-[#1D4ED8] transition-all duration-200 font-bold">
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <button 
            className="md:hidden text-textPrimary p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-[80px] left-0 w-full bg-surface border-b border-border shadow-lg overflow-hidden flex flex-col items-center py-6 px-6 z-40"
          >
            <div className="flex flex-col gap-6 items-center w-full">
              <Link to="/bundles" onClick={() => setMobileMenuOpen(false)} className="text-xl text-textPrimary hover:text-primary font-bold">Bundles</Link>
              <Link to="/track-order" onClick={() => setMobileMenuOpen(false)} className="text-xl text-textPrimary hover:text-primary font-bold">Track Order</Link>
              <Link to="/become-a-seller" onClick={() => setMobileMenuOpen(false)} className="text-xl text-textPrimary hover:text-primary font-bold">Become a Seller</Link>
              
              <div className="w-full h-px bg-border my-2"></div>
              
              {auth?.user ? (
                <>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="text-lg text-textSecondary hover:text-primary">Profile</Link>
                  <Link to="/track-order" onClick={() => setMobileMenuOpen(false)} className="text-lg text-textSecondary hover:text-primary">My Orders</Link>
                  {(auth.user.role === 'seller' || auth.user.role === 'admin') && (
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-lg text-textSecondary hover:text-primary">Dashboard</Link>
                  )}
                  <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="text-lg text-danger font-bold w-full p-3 bg-red-50 rounded-xl mt-2">Logout</button>
                </>
              ) : (
                <div className="flex flex-col w-full gap-4 mt-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-3 text-lg font-bold text-primary border border-primary rounded-xl">Sign In</Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-3 text-lg font-bold bg-primary text-surface rounded-xl">Sign Up</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
