import React, { useState, useContext } from 'react';
import PageHeader from '../components/PageHeader';
import Input from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';
import { AuthContext } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', { name, email, phone, password });
      const { token, ...userData } = data;
      auth?.login(userData, token);
      navigate('/bundles');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-10 md:py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-card p-6 sm:p-10 rounded-[24px] border border-borderDark shadow-2xl"
        >
          <PageHeader title={<>Create <span className="text-primary">Account</span></>} description="Join BundleHub today" />
          {error && <div className="bg-danger/10 border border-danger/20 text-danger p-4 rounded-xl mb-6 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input 
              label="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
            <Input 
              label="Email Address" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <Input 
              label="Phone Number" 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
            />
            <Input 
              label="Password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <motion.button 
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="submit" disabled={loading}
              className="w-full bg-primary hover:bg-primaryHover text-textMain font-bold py-4 rounded-[16px] transition-colors duration-200 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] mt-6 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </motion.button>
          </form>
          <div className="mt-8 text-center text-textMuted">
            Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Register;
