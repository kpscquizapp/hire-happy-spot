import React from 'react';
import { Link } from 'react-router-dom';
import hirionLogo from '@/assets/hirion-logo.png';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center group">
      <img 
        src={hirionLogo} 
        alt="Hirion - Your Hiring Champion" 
        className="h-14 w-auto transition-transform duration-300 group-hover:scale-105" 
      />
    </Link>
  );
};

export default Logo;
