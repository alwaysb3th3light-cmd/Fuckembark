import React from 'react';
import { createRoot } from 'react-dom/client';

export default function TestShape() {
  return (
    <div style={{ padding: 50, background: '#eee' }}>
      <svg width="200" height="200" viewBox="0 0 100 100" style={{ background: '#fff' }}>
        <path d="M 70 15 L 30 50 L 70 85 L 50 85 L 10 50 L 50 15 Z" fill="#009ad7" />
      </svg>
    </div>
  );
}
