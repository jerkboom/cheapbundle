import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: React.ReactNode;
  description: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="text-center space-y-4 mb-12">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-black text-textMain"
      >
        {title}
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-textMuted text-xl max-w-2xl mx-auto"
      >
        {description}
      </motion.p>
    </div>
  );
};

export default PageHeader;
