import React from 'react';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const BecomeSeller: React.FC = () => {
  return (
    <>
      <div className="max-w-[1280px] mx-auto px-4 py-10 md:py-20">
        <div className="text-center mb-4">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm">
            <Briefcase size={16} /> Partner Program
          </motion.div>
        </div>
        <PageHeader title={<>Turn your network into <span className="text-primary">net worth.</span></>} description="Join the BundleHub seller program and earn commissions on every bundle you sell. Instant payouts, no hidden fees." />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: <DollarSign size={32} />, title: "Lucrative Commissions", desc: "Earn up to 10% on every bundle sold. The more you sell, the higher your tier and commission rate." },
            { icon: <Zap size={32} />, title: "Instant Payouts", desc: "No waiting for the end of the month. Withdraw your earnings to your Mobile Money wallet instantly, 24/7." },
            { icon: <CheckCircle2 size={32} />, title: "Easy Application", desc: "Get approved in minutes. No complex paperwork or physical office required to start selling." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-card border border-borderDark rounded-[18px] p-8 hover:border-primary/30 transition-colors duration-200"
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-[12px] flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-textMain mb-4">{feature.title}</h3>
              <p className="text-textMuted leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-primary rounded-[18px] p-8 sm:p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-textMain">Ready to start earning?</h2>
            <p className="text-textMain/80 text-lg md:text-xl font-medium">Join thousands of sellers across Ghana who are building their business with BundleHub.</p>
            <Link to="/register" className="inline-block bg-background text-textMain font-bold text-base md:text-lg px-8 py-4 md:px-10 md:py-5 rounded-full hover:scale-105 transition-transform duration-200 shadow-2xl">
              Become a Seller
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeSeller;
