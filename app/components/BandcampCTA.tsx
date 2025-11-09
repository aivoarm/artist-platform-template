"use client"; // ⬅️ THIS IS CRUCIAL

import React from 'react';

// Use Tailwind classes here for a clean separation from MDX
export default function BandcampCTA({ albumUrl }: { albumUrl: string }) {
  // Define the base and hover styles using standard React state/hooks if necessary, 
  // but for simple hover effects, Tailwind classes are much easier.
  
  // Using inline styles for direct color manipulation like your original request:
  const baseStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '12px 24px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#262626', // Base color
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
        // The event handlers now work because this component is marked "use client"
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#262626'}
      >
        🎧 Listen & Buy on Bandcamp
      </a>
    </div>
  );
}