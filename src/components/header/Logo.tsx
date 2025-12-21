
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
          <span className="text-blue-600">HIR</span>
          <span className="text-blue-800">ION</span>
        </div>
      </div>
    </a>
  );
};

export default Logo;
