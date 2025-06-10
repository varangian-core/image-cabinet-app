import React from 'react';
import { cn } from '../../lib/utils';

interface ContentAreaProps {
  children: React.ReactNode;
  className?: string;
}

export const ContentArea: React.FC<ContentAreaProps> = ({ children, className }) => {
  return (
    <main className={cn(
      "flex-1 bg-[var(--dark-bg)] p-6 overflow-y-auto",
      "relative",
      className
    )}>
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(cyan 1px, transparent 1px),
            linear-gradient(90deg, cyan 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </main>
  );
};