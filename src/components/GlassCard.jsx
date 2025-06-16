// src/components/GlassCard.jsx
import React from 'react';
import './GlassCard.css';   // we’ll make this next

export default function GlassCard({ className = '', children, ...props }) {
  return (
    <div className={`glass-card ${className}`} {...props}>
      {children}
    </div>
  );
}
