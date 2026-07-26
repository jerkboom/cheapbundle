import React from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && <label className="text-sm font-medium text-textMuted tracking-wide">{label}</label>}
      <input 
        className={`bg-backgroundSecondary border ${error ? 'border-danger' : 'border-borderDark'} rounded-[12px] px-5 py-4 text-textMain text-lg placeholder-textMuted/50 focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition-all duration-200 shadow-inner`}
        {...props}
      />
      {error && <span className="text-xs text-danger font-medium">{error}</span>}
    </div>
  );
};

export default Input;
