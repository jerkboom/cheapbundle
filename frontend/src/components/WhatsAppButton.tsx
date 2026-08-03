import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setShowTooltip(true);
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    window.open(
      "https://wa.me/233541234567?text=Hi%20Cheap%20Bundle%20%F0%9F%91%8B%0A%0AI'm%20interested%20in%20buying%20a%20data%20bundle%20and%20would%20like%20some%20assistance.",
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mb-3 bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-lg shadow-lg border border-gray-100 max-w-[200px] md:max-w-xs text-center"
          >
            Need help? Chat with us on WhatsApp 💬
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Chat with Cheap Bundle on WhatsApp"
        className="flex items-center justify-center w-[56px] h-[56px] sm:w-[60px] sm:h-[60px] md:w-[64px] md:h-[64px] bg-[#25D366] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-8 h-8 md:w-9 md:h-9 text-white"
        >
          <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.062-.301-.15-1.265-.464-2.406-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.098-.202.049-.383-.029-.533-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.198 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.36zM12.002 22.001A9.957 9.957 0 016.91 20.6l-4.52 1.18 1.2-4.4A9.972 9.972 0 1112.002 22z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
};

export default WhatsAppButton;
