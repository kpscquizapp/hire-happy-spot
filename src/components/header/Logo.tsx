
import React from 'react';

const Logo = () => {
  return (
    <a href="/" className="flex items-center">
      <img 
        src="/lovable-uploads/635c4f04-521e-4c70-9b0a-7796b57a77bd.png" 
        alt="Hirion Logo" 
        className="h-10 w-auto mr-3" 
      />
      <div className="flex flex-col">
        <div className="text-xl font-bold text-neutral-900">
          <span className="text-teal-600">HIR</span>
          <span>ION</span>
        </div>
        <span className="text-xs text-neutral-500 -mt-1">Hiring Champion</span>
      </div>
    </a>
  );
};

export default Logo;
