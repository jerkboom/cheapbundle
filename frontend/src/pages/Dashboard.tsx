import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userInfoStr = localStorage.getItem('userInfo');
    if (!userInfoStr) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userInfoStr));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  if (!user) return (
    <Layout>
      <div className="flex justify-center p-20">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="max-w-[1280px] mx-auto px-4 py-8 md:py-16 space-y-6 md:space-y-8">
        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp}
          className="flex flex-col sm:flex-row justify-between items-center bg-surface p-6 md:p-8 rounded-[24px] border border-border shadow-sm gap-4 sm:gap-6"
        >
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-textPrimary">Welcome, {user.name}</h2>
            <p className="text-primary mt-2 text-lg capitalize font-bold">{user.role} Dashboard</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(37,99,235,0.05)' }} whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="border-2 border-primary/20 text-primary font-bold px-8 py-3 rounded-[14px] transition-colors hover:border-primary/40 bg-surface"
          >
            Logout
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-surface p-6 md:p-8 rounded-[24px] border border-border shadow-sm"
          >
            <h3 className="text-2xl font-bold text-textPrimary mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-primary rounded-full block"></span>
              Profile Information
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center border-b border-border pb-4">
                <span className="text-textSecondary font-medium">Email</span>
                <span className="text-textPrimary font-semibold">{user.email}</span>
              </li>
              <li className="flex justify-between items-center border-b border-border pb-4">
                <span className="text-textSecondary font-medium">Phone</span>
                <span className="text-textPrimary font-semibold">{user.phone}</span>
              </li>
              <li className="flex justify-between items-center pt-2">
                <span className="text-textSecondary font-medium">Role</span>
                <span className="inline-flex px-3 py-1 rounded-full bg-light border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">{user.role}</span>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-surface p-6 md:p-8 rounded-[24px] border border-border shadow-sm flex flex-col justify-center items-center text-center relative overflow-hidden"
          >
            <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            {user.role === 'customer' && (
              <div className="relative z-10 w-full">
                <h3 className="text-3xl font-bold text-textPrimary mb-4">My Orders</h3>
                <p className="text-textSecondary mb-8 text-lg">View and track your previous bundle purchases.</p>
                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/track')}
                  className="w-full bg-primary hover:bg-[#1D4ED8] text-surface font-bold py-4 rounded-[14px] transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Track Orders
                </motion.button>
              </div>
            )}
            {(user.role === 'seller' || user.role === 'admin') && (
              <div className="relative z-10 w-full">
                <h3 className="text-3xl font-bold text-textPrimary mb-4">Manage Bundles</h3>
                <p className="text-textSecondary mb-8 text-lg">Add, edit, or remove data bundles from the platform.</p>
                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary hover:bg-[#1D4ED8] text-surface font-bold py-4 rounded-[14px] transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Manage Catalog
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
