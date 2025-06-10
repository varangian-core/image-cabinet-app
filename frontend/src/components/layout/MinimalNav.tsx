import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { 
  Home, 
  Upload, 
  Images, 
  Brain, 
  Settings,
  FolderOpen,
  Sparkles,
  Grid3x3,
  Command,
  Search,
  LayoutDashboard,
  Layers
} from 'lucide-react';

interface MinimalNavProps {
  variant?: 'bottom' | 'floating' | 'dock';
  className?: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  color: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Grid3x3, path: '/', color: 'cyan' },
  { id: 'upload', label: 'Files', icon: Upload, path: '/upload', color: 'pink' },
  { id: 'gallery', label: 'Gallery', icon: Images, path: '/gallery', color: 'yellow' },
  { id: 'classify', label: 'AI', icon: Brain, path: '/classify', color: 'green' },
  { id: 'cabinets', label: 'Files', icon: FolderOpen, path: '/cabinets', color: 'orange' },
];

export const MinimalNav: React.FC<MinimalNavProps> = ({ variant = 'dock', className }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  if (variant === 'bottom') {
    return (
      <nav className={cn(
        "fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 z-50",
        className
      )}>
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={cn(
                    "relative flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200",
                    isActive ? "text-white" : "text-gray-400"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeBottomTab"
                      className="absolute inset-0 bg-white/10 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <Icon className={cn(
                    "w-6 h-6 relative z-10 transition-colors",
                    isActive && item.color === 'cyan' && "text-cyan-400",
                    isActive && item.color === 'pink' && "text-pink-400",
                    isActive && item.color === 'yellow' && "text-yellow-400",
                    isActive && item.color === 'green' && "text-green-400",
                    isActive && item.color === 'orange' && "text-orange-400"
                  )} />
                  <span className={cn(
                    "text-xs mt-1 relative z-10",
                    isActive ? "font-medium" : "font-normal"
                  )}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    );
  }

  if (variant === 'floating') {
    return (
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", damping: 25 }}
        className={cn(
          "fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900/95 backdrop-blur-xl",
          "border border-white/10 rounded-2xl shadow-2xl shadow-black/50 z-50",
          "px-2 py-2",
          className
        )}
      >
        <div className="flex items-center space-x-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <motion.div
                key={item.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 * index + 0.5 }}
              >
                <Link
                  to={item.path}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "relative flex items-center justify-center w-12 h-12 rounded-xl",
                    "transition-all duration-200",
                    isActive 
                      ? "bg-white/10 text-white" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className={cn(
                      "w-5 h-5",
                      isActive && item.color === 'cyan' && "text-cyan-400",
                      isActive && item.color === 'pink' && "text-pink-400",
                      isActive && item.color === 'yellow' && "text-yellow-400",
                      isActive && item.color === 'green' && "text-green-400",
                      isActive && item.color === 'orange' && "text-orange-400"
                    )} />
                  </motion.div>
                  
                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredItem === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full mb-2 px-3 py-1.5 bg-gray-800 rounded-lg text-xs whitespace-nowrap"
                      >
                        {item.label}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-800 rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            );
          })}
          
          {/* Separator */}
          <div className="w-px h-8 bg-white/10 mx-2" />
          
          {/* Additional Actions */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-12 h-12 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            <Search className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.nav>
    );
  }

  // Dock variant (macOS style)
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", damping: 25 }}
      className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2",
        "bg-black/80 backdrop-blur-2xl",
        "border border-white/10 rounded-2xl shadow-2xl",
        "px-3 py-3",
        className
      )}
      style={{
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      <div className="flex items-center space-x-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const isHovered = hoveredItem === item.id;
          
          return (
            <motion.div
              key={item.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * index + 0.5, type: "spring", damping: 20 }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                to={item.path}
                className="relative block"
              >
                <motion.div
                  animate={{
                    y: isHovered ? -10 : 0,
                    scale: isHovered ? 1.3 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className={cn(
                    "relative flex items-center justify-center w-12 h-12 rounded-xl",
                    "transition-colors duration-200",
                    "bg-gradient-to-b from-white/10 to-white/5",
                    "border border-white/10",
                    isActive && "from-white/20 to-white/10"
                  )}
                >
                  <Icon className={cn(
                    "w-6 h-6",
                    isActive ? "text-white" : "text-gray-300",
                    isActive && item.color === 'cyan' && "text-cyan-400",
                    isActive && item.color === 'pink' && "text-pink-400",
                    isActive && item.color === 'yellow' && "text-yellow-400",
                    isActive && item.color === 'green' && "text-green-400",
                    isActive && item.color === 'orange' && "text-orange-400"
                  )} />
                  
                  {/* Reflection effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 to-transparent opacity-50" />
                </motion.div>
                
                {/* Active indicator dot */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className={cn(
                        "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                        item.color === 'cyan' && "bg-cyan-400",
                        item.color === 'pink' && "bg-pink-400",
                        item.color === 'yellow' && "bg-yellow-400",
                        item.color === 'green' && "bg-green-400",
                        item.color === 'orange' && "bg-orange-400"
                      )}
                    />
                  )}
                </AnimatePresence>
                
                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: -5 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-800/95 backdrop-blur-xl rounded-lg text-xs whitespace-nowrap border border-white/10"
                    >
                      {item.label}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-800/95 rotate-45 border-r border-b border-white/10" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          );
        })}
        
        {/* Divider with glow effect */}
        <div className="relative w-px h-10 mx-2">
          <div className="absolute inset-0 bg-white/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>
        
        {/* Settings */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", damping: 20 }}
          onMouseEnter={() => setHoveredItem('settings')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Link
            to="/settings"
            className="relative block"
          >
            <motion.div
              animate={{
                y: hoveredItem === 'settings' ? -10 : 0,
                scale: hoveredItem === 'settings' ? 1.3 : 1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10"
            >
              <Settings className="w-6 h-6 text-gray-300" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 to-transparent opacity-50" />
            </motion.div>
            
            <AnimatePresence>
              {hoveredItem === 'settings' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: -5 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-800/95 backdrop-blur-xl rounded-lg text-xs whitespace-nowrap border border-white/10"
                >
                  Settings
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-800/95 rotate-45 border-r border-b border-white/10" />
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
};