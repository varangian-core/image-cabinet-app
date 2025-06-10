import React from 'react';
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
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
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
  { id: 'home', label: 'Dashboard', icon: Grid3x3, path: '/', color: 'cyan' },
  { id: 'upload', label: 'File Manager', icon: Upload, path: '/upload', color: 'pink' },
  { id: 'gallery', label: 'Gallery', icon: Images, path: '/gallery', color: 'yellow' },
  { id: 'classify', label: 'AI Classify', icon: Brain, path: '/classify', color: 'green' },
  { id: 'cabinets', label: 'Cabinets', icon: FolderOpen, path: '/cabinets', color: 'orange' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings', color: 'purple' },
];

const colorMap = {
  cyan: 'text-cyan-400 hover:text-cyan-300',
  pink: 'text-pink-400 hover:text-pink-300',
  yellow: 'text-yellow-400 hover:text-yellow-300',
  green: 'text-green-400 hover:text-green-300',
  orange: 'text-orange-400 hover:text-orange-300',
  purple: 'text-purple-400 hover:text-purple-300',
};

const activeColorMap = {
  cyan: 'bg-cyan-400/10 border-cyan-400 text-cyan-400',
  pink: 'bg-pink-400/10 border-pink-400 text-pink-400',
  yellow: 'bg-yellow-400/10 border-yellow-400 text-yellow-400',
  green: 'bg-green-400/10 border-green-400 text-green-400',
  orange: 'bg-orange-400/10 border-orange-400 text-orange-400',
  purple: 'bg-purple-400/10 border-purple-400 text-purple-400',
};

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative h-screen flex flex-col transition-all duration-300 overflow-hidden",
        isCollapsed ? "w-20" : "w-64",
        className
      )}
    >
      {/* Celestial gradient background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3a] to-[#0a0a1a]" />
        
        {/* Animated star field */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.1)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(147,51,234,0.1)_0%,_transparent_50%)]" />
        </div>
        
        {/* Animated nebula effect */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Header */}
      <div className="relative p-6 flex items-center justify-between z-10">
        <Link 
          to="/" 
          className={cn(
            "flex items-center gap-3 transition-all duration-300",
            isCollapsed && "justify-center"
          )}
        >
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-8 h-8 text-cyan-400 relative z-10" />
            <motion.div 
              className="absolute inset-0 bg-cyan-400/50 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Image Cabinet
                </h1>
                <p className="text-xs text-gray-400">AI-Powered Organization</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 backdrop-blur-sm"
        >
          <AnimatePresence mode="wait">
            {isCollapsed ? (
              <motion.div
                key="menu"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Menu className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="x"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <X className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      
      {/* Navigation */}
      <nav className="relative flex-1 px-3 pb-3 overflow-y-auto z-10">
        <ul className="space-y-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const isHovered = hoveredItem === item.id;
            const colorClass = colorMap[item.color as keyof typeof colorMap];
            const activeClass = activeColorMap[item.color as keyof typeof activeColorMap];
            
            return (
              <motion.li 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group",
                    "backdrop-blur-sm",
                    isActive 
                      ? "bg-white/10 shadow-lg shadow-black/20" 
                      : "hover:bg-white/5",
                    isCollapsed && "justify-center"
                  )}
                >
                  {/* Active/Hover glow background */}
                  <AnimatePresence>
                    {(isActive || isHovered) && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={cn(
                          "absolute inset-0 rounded-xl blur-xl",
                          item.color === 'cyan' && "bg-cyan-400/20",
                          item.color === 'pink' && "bg-pink-400/20",
                          item.color === 'yellow' && "bg-yellow-400/20",
                          item.color === 'green' && "bg-green-400/20",
                          item.color === 'orange' && "bg-orange-400/20",
                          item.color === 'purple' && "bg-purple-400/20"
                        )}
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Active indicator */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 4, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className={cn(
                          "absolute left-0 top-1/2 -translate-y-1/2 h-8 rounded-r-full",
                          item.color === 'cyan' && "bg-cyan-400",
                          item.color === 'pink' && "bg-pink-400",
                          item.color === 'yellow' && "bg-yellow-400",
                          item.color === 'green' && "bg-green-400",
                          item.color === 'orange' && "bg-orange-400",
                          item.color === 'purple' && "bg-purple-400"
                        )}
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Icon with animation */}
                  <motion.div 
                    className="relative z-10"
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Icon className={cn(
                      "w-5 h-5 transition-all duration-300",
                      isActive 
                        ? item.color === 'cyan' ? "text-cyan-400" :
                          item.color === 'pink' ? "text-pink-400" :
                          item.color === 'yellow' ? "text-yellow-400" :
                          item.color === 'green' ? "text-green-400" :
                          item.color === 'orange' ? "text-orange-400" :
                          "text-purple-400"
                        : colorClass
                    )} />
                    {/* Icon glow */}
                    <AnimatePresence>
                      {(isActive || isHovered) && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={cn(
                            "absolute inset-0 blur-md",
                            item.color === 'cyan' && "bg-cyan-400",
                            item.color === 'pink' && "bg-pink-400",
                            item.color === 'yellow' && "bg-yellow-400",
                            item.color === 'green' && "bg-green-400",
                            item.color === 'orange' && "bg-orange-400",
                            item.color === 'purple' && "bg-purple-400"
                          )}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                  
                  {/* Label with animation */}
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className={cn(
                          "font-medium text-sm transition-all relative z-10",
                          isActive 
                            ? "text-white font-semibold" 
                            : "text-gray-300 group-hover:text-white"
                        )}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {/* Hover effect line */}
                  <motion.div
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Tooltip for collapsed state */}
                  <AnimatePresence>
                    {isCollapsed && isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute left-full ml-3 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm whitespace-nowrap z-50 shadow-xl"
                      >
                        <div className="relative">
                          {item.label}
                          <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-gray-900" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>
      
      {/* Footer */}
      <div className="relative p-4 border-t border-white/10 backdrop-blur-sm z-10">
        <motion.div 
          className={cn(
            "flex items-center gap-3",
            isCollapsed && "justify-center"
          )}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 p-[2px]">
              <div className="w-full h-full rounded-full bg-[#0a0a1a] flex items-center justify-center">
                <span className="text-sm font-bold">JD</span>
              </div>
            </div>
            <motion.div 
              className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0a0a1a]"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-gray-400">Pro Plan</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.aside>
  );
};