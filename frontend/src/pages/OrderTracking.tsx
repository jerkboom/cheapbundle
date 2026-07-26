import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Input from '../components/Input';
import api from '../api/axios';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const OrderTracking: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.get(`/orders/track?query=${phone}`);
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  return (
    <>
      <div className="max-w-[1280px] mx-auto px-4 py-8 md:py-16 space-y-8 md:space-y-12">
        <PageHeader title={<>Track Your <span className="text-primary">Order</span></>} description="Enter your phone number to see the status of your bundles." />

        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp}
          className="max-w-2xl mx-auto bg-surface p-8 rounded-[24px] border border-border shadow-md"
        >
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
            <div className="flex-grow w-full">
              <Input 
                label="Phone Number or Reference" 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required 
                placeholder="e.g. 0541234567"
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="submit" disabled={loading}
              className="w-full sm:w-auto bg-primary hover:bg-[#1D4ED8] text-surface font-bold px-10 py-4 rounded-[14px] transition-colors duration-200 shadow-sm disabled:opacity-50 h-[56px] mt-4 sm:mt-0"
            >
              {loading ? 'Searching...' : 'Track'}
            </motion.button>
          </form>
        </motion.div>

        {searched && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-2xl font-bold text-textPrimary mb-6 text-center">Results</h3>
            {orders.length === 0 ? (
              <div className="bg-surface border border-border p-10 rounded-[24px] text-center text-textSecondary text-lg shadow-sm">
                No orders found for this phone number.
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    key={order._id} 
                    className="bg-surface p-4 md:p-6 rounded-[24px] border border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 hover:shadow-md transition-all duration-200"
                  >
                    <div className="w-full">
                      <h4 className="font-bold text-xl text-textPrimary">{order.bundleName} <span className="text-textSecondary font-normal text-sm ml-2">({order.network})</span></h4>
                      <p className="text-textSecondary text-sm mt-1">Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
                      <p className="text-primary font-bold mt-2">GH₵ {order.amount.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                      <div className="flex-1 md:flex-none text-center bg-surfaceSecondary rounded-[12px] p-3 border border-border">
                        <span className="block text-xs text-textSecondary mb-2 uppercase tracking-wider">Payment</span>
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                          order.paymentStatus === 'paid' ? 'bg-success/10 text-success' :
                          order.paymentStatus === 'failed' ? 'bg-danger/10 text-danger' :
                          'bg-warning/10 text-warning'
                        }`}>
                          {order.paymentStatus.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 md:flex-none text-center bg-surfaceSecondary rounded-[12px] p-3 border border-border">
                        <span className="block text-xs text-textSecondary mb-2 uppercase tracking-wider">Delivery</span>
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                          order.status === 'completed' ? 'bg-success/10 text-success' :
                          order.status === 'failed' ? 'bg-danger/10 text-danger' :
                          order.status === 'processing' ? 'bg-secondary/10 text-secondary' :
                          'bg-warning/10 text-warning'
                        }`}>
                          {order.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default OrderTracking;
