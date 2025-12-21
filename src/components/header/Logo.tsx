
import React from 'react';

const Logo = () => {
  return (
    <a href="/" className="flex items-center group">
      <img 
        src="/lovable-uploads/hirion-logo.png" 
        alt="Hirion Logo" 
        className="h-14 w-auto transition-transform duration-300 group-hover:scale-105" 
      />
    </a>
  );
};

export default Logo;
