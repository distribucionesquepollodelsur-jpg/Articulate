import React from 'react';

export const BritishFlag = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 60 30" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z" />
    </clipPath>
    <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
    <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#s)" stroke="#C8102E" strokeWidth="4" />
    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

export const CommonwealthEmblem = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
    <circle cx="50" cy="50" r="30" fill="currentColor" opacity="0.2" />
    <path 
      d="M50 10 L50 90 M10 50 L90 50 M21.7 21.7 L78.3 78.3 M78.3 21.7 L21.7 78.3" 
      stroke="currentColor" 
      strokeWidth="1" 
      opacity="0.3" 
    />
  </svg>
);
