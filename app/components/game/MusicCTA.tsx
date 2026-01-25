"use client"; // ⬅️ Must stay at the top!

import React from 'react';

// Make the component accept label, background color, and URL as props
export default function MusicCTA({ 
    albumUrl, 
    label, 
    baseColor, 
    hoverColor 
}: { 
    albumUrl: string; 
    label: string; 
    baseColor: string; 
    hoverColor: string; 
}) {
  
  const baseStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '12px 24px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: baseColor, 
    borderRadius: '6px',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
      <a 
        href={albumUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        style={baseStyle}
        // Event handlers now work
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = hoverColor}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = baseColor}
      >
        {label}
      </a>
    </div>
  );
}