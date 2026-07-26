import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-textPrimary pt-16 md:pt-20 pb-10 mt-16 md:mt-20">
      <div className="max-w-[1280px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16 text-center sm:text-left">
        <div className="flex flex-col gap-4 md:gap-6 items-center sm:items-start">
          <Link to="/" className="flex flex-col">
            <span className="text-3xl font-black text-surface tracking-tight leading-none">
              BundleHub.
            </span>
          </Link>
          <p className="text-textMuted max-w-sm leading-relaxed text-sm">
            Ghana's cheapest and most reliable platform for instant data bundles across MTN, Telecel & AirtelTigo.
          </p>
        </div>
        
        <div className="flex flex-col gap-4 md:gap-6 items-center sm:items-start">
          <h4 className="text-surface font-bold text-lg">Quick Links</h4>
          <ul className="space-y-3 md:space-y-4 text-sm">
            <li><Link to="/" className="text-textMuted hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/bundles" className="text-textMuted hover:text-primary transition-colors">Bundles</Link></li>
            <li><Link to="/track" className="text-textMuted hover:text-primary transition-colors">Track Order</Link></li>
            <li><Link to="/seller" className="text-textMuted hover:text-primary transition-colors">Become a Seller</Link></li>
          </ul>
        </div>
        
        <div className="flex flex-col gap-4 md:gap-6 items-center sm:items-start">
          <h4 className="text-surface font-bold text-lg">Contact</h4>
          <ul className="space-y-3 md:space-y-4 text-sm">
            <li className="text-textMuted">Accra, Ghana</li>
            <li className="text-textMuted">+233 54 123 4567</li>
            <li className="text-textMuted">hello@bundlehub.com</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 md:gap-6 items-center sm:items-start">
          <h4 className="text-surface font-bold text-lg">Support</h4>
          <ul className="space-y-3 md:space-y-4 text-sm">
            <li className="text-textMuted cursor-pointer hover:text-primary transition-colors">FAQ</li>
            <li className="text-textMuted cursor-pointer hover:text-primary transition-colors">24/7 Chat</li>
            <li className="text-textMuted cursor-pointer hover:text-primary transition-colors">Terms & Conditions</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[1280px] mx-auto px-4 pt-8 border-t border-textSecondary/30 text-center flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-textMuted text-sm">&copy; {new Date().getFullYear()} BundleHub Ghana. All rights reserved.</p>
        <div className="flex gap-4">
          <span className="text-textMuted text-sm cursor-pointer hover:text-primary transition-colors">Privacy Policy</span>
          <span className="text-textMuted text-sm cursor-pointer hover:text-primary transition-colors">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
