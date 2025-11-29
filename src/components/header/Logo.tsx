
import React from 'react';

const Logo = () => {
  return (
    <a href="/" className="flex items-center group">
      <img 
        src="/lovable-uploads/635c4f04-521e-4c70-9b0a-7796b57a77bd.png" 
        alt="Hirion Logo" 
        className="h-14 w-auto mr-4 transition-transform duration-300 group-hover:scale-105" 
      />
      <div className="flex flex-col">
        <div className="text-2xl font-bold">
          <span className="text-teal-600">HIR</span>
          <span className="text-teal-800">ION</span>
        </div>
        <span className="text-xs text-neutral-500 tracking-wide">Hiring Champion</span>
      </div>
    </a>
  );
};

export default Logo;
