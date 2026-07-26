import React from 'react';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', fullWidth = false, className = '', ...props }) => {
  const baseClasses = 'px-6 py-3 min-h-[48px] rounded-[14px] font-semibold transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center';
  
  const variants = {
    primary: 'bg-primary text-surface shadow-md hover:bg-[#1D4ED8] hover:scale-[1.02]',
    secondary: 'bg-surface text-primary border border-primary hover:bg-light',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-surface',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button className={`${baseClasses} ${variants[variant]} ${widthClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
