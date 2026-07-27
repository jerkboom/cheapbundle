import React from 'react';

interface NetworkLogoProps {
  network: string;
  className?: string;
}

export const NetworkLogo: React.FC<NetworkLogoProps> = ({ network, className = "" }) => {
  if (network === 'MTN' || network === 'MTN Ghana') {
    return (
      <svg className={className} viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="30" rx="58" ry="28" fill="#FFCC00" />
        <text x="60" y="38" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="26" fill="#000000" textAnchor="middle" letterSpacing="-0.5">MTN</text>
      </svg>
    );
  }
  
  if (network === 'Telecel' || network === 'Telecel Ghana') {
    return (
      <svg className={className} viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="30" r="16" fill="#E20010" />
        <path d="M23 18h3v8h3.5v3h-3.5v6.5c0 1.5.5 2 2 2h1.5v3H27c-3 0-4-1.5-4-4.5V29h-2.5v-3H23v-8z" fill="#FFFFFF" />
        <text x="46" y="38" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="24" fill="#E20010" textAnchor="start">telecel</text>
      </svg>
    );
  }
  
  if (network === 'AT' || network === 'AirtelTigo' || network === 'AT Ghana') {
    return (
      <svg className={className} viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="60" y="44" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="42" textAnchor="middle" letterSpacing="-1">
          <tspan fill="#E20010">a</tspan><tspan fill="#0066CC">t</tspan>
        </text>
      </svg>
    );
  }

  return null;
};
