import React, { useState, useEffect } from 'react';
import { NavigationBar } from './NavigationBar';
import { MinimalNav } from './MinimalNav';
import { Sidebar } from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface FlexibleLayoutProps {
  children: React.ReactNode;
  defaultNavType?: 'sidebar' | 'topbar' | 'minimal-dock' | 'minimal-bottom' | 'minimal-floating';
}

export const FlexibleLayout: React.FC<FlexibleLayoutProps> = ({ 
  children, 
  defaultNavType = 'topbar' 
}) => {
  const [navType, setNavType] = useState(defaultNavType);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // On mobile, force minimal bottom navigation
  const effectiveNavType = isMobile ? 'minimal-bottom' : navType;

  return (
    <div className={cn(
      "min-h-screen",
      effectiveNavType === 'sidebar' ? "bg-gray-50" : "bg-[#0a0a0a]"
    )}>
      <AnimatePresence mode="wait">
        {/* Sidebar Layout */}
        {effectiveNavType === 'sidebar' && (
          <motion.div
            key="sidebar-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-screen"
          >
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <main className="flex-1 overflow-y-auto bg-gray-50">
                <div className="p-6">
                  {children}
                </div>
              </main>
            </div>
          </motion.div>
        )}

        {/* Top Bar Layout */}
        {effectiveNavType === 'topbar' && (
          <motion.div
            key="topbar-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <NavigationBar />
            <main className="relative">
              {/* Background Effects */}
              <div className="fixed inset-0 pointer-events-none">
                <div 
                  className="absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                  }}
                />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
              </div>
              
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </div>
            </main>
          </motion.div>
        )}

        {/* Minimal Layouts */}
        {effectiveNavType.startsWith('minimal-') && (
          <motion.div
            key="minimal-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MinimalNav 
              variant={effectiveNavType.replace('minimal-', '') as 'dock' | 'bottom' | 'floating'} 
            />
            <main className="relative">
              {/* Background Effects */}
              <div className="fixed inset-0 pointer-events-none">
                <div 
                  className="absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                  }}
                />
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
              </div>
              
              <div className={cn(
                "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                effectiveNavType === 'minimal-bottom' ? "pb-20 pt-8" : "py-8 pb-28"
              )}>
                {children}
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Type Switcher (Development Only) */}
      {process.env.NODE_ENV === 'development' && !isMobile && (
        <div className="fixed top-4 right-4 z-50 bg-gray-900 border border-gray-700 rounded-lg p-2 space-y-1">
          <p className="text-xs text-gray-400 font-medium mb-2 px-2">Nav Type</p>
          {['sidebar', 'topbar', 'minimal-dock', 'minimal-floating', 'minimal-bottom'].map((type) => (
            <button
              key={type}
              onClick={() => setNavType(type as any)}
              className={cn(
                "block w-full text-left px-3 py-1.5 text-xs rounded transition-colors",
                navType === type 
                  ? "bg-cyan-500/20 text-cyan-400" 
                  : "text-gray-300 hover:bg-white/5"
              )}
            >
              {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};