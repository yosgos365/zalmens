import React from 'react';

export const TefillinLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <img 
    src="/logo.png" 
    alt="Zalmen's Tefillin" 
    className={`object-contain shrink-0 ${className}`}
    referrerPolicy="no-referrer"
  />
);

