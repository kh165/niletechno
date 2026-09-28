import React from 'react';

export function EgyptFlag({ className = "w-5 h-3.5", ...props }) {
  return (
    <svg 
      viewBox="0 0 900 600" 
      className={`inline-block object-cover rounded-xs shrink-0 ${className}`} 
      aria-label="علم جمهورية مصر العربية"
      role="img"
      {...props}
    >
      <rect width="900" height="200" fill="#ce1126" />
      <rect y="200" width="900" height="200" fill="#ffffff" />
      <rect y="400" width="900" height="200" fill="#000000" />
      {/* Eagle of Saladin representation */}
      <g transform="translate(450, 300) scale(0.65)">
        <path d="M-20,-40 C-30,-20 -40,10 -25,40 L25,40 C40,10 30,-20 20,-40 Z" fill="#c09a3e" />
        <path d="M-10,-55 C-5,-65 5,-65 10,-55 L15,-40 L-15,-40 Z" fill="#c09a3e" />
        <rect x="-12" y="-10" width="24" height="35" rx="3" fill="#ffffff" stroke="#c09a3e" strokeWidth="2" />
        <rect x="-10" y="-8" width="6.6" height="31" fill="#ce1126" />
        <rect x="-3.3" y="-8" width="6.6" height="31" fill="#ffffff" />
        <rect x="3.3" y="-8" width="6.6" height="31" fill="#000000" />
      </g>
    </svg>
  );
}

export function SaudiFlag({ className = "w-5 h-3.5", ...props }) {
  return (
    <svg 
      viewBox="0 0 900 600" 
      className={`inline-block object-cover rounded-xs shrink-0 ${className}`} 
      aria-label="علم المملكة العربية السعودية"
      role="img"
      {...props}
    >
      <rect width="900" height="600" fill="#006c35" />
      {/* Arabic Script & Sword stylized representation */}
      <g fill="#ffffff">
        <path d="M220,250 C260,230 320,230 360,250 C400,230 460,230 500,250 C540,230 600,230 680,250 C660,270 620,270 580,260 C540,275 480,275 440,260 C400,275 340,275 300,260 C260,270 240,265 220,250 Z" opacity="0.95" />
        {/* Sword */}
        <rect x="300" y="340" width="300" height="8" rx="3" />
        <polygon points="280,344 310,336 310,352" />
        <rect x="580" y="332" width="8" height="24" rx="2" />
        <circle cx="605" cy="344" r="6" />
      </g>
    </svg>
  );
}
