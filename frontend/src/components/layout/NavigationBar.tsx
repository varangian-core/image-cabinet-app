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
  Menu,
  X,
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  Plus,
  User,
  LogOut,
  HelpCircle
} from 'lucide-react';

interface NavigationBarProps {
  className?: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  color: string;
  description?: string;
}

const navItems: NavItem[] = [
  { 
    id: 'home', 
    label: 'Dashboard', 
    icon: Grid3x3, 
    path: '/', 
    color: 'cyan',
    description: 'Overview & Analytics'
  },
  { 
    id: 'upload', 
    label: 'File Manager', 
    icon: Upload, 
    path: '/upload', 
    color: 'pink',
    description: 'Manage your files'
  },
  { 
    id: 'gallery', 
    label: 'Gallery', 
    icon: Images, 
    path: '/gallery', 
    color: 'yellow',
    description: 'Browse collection'
  },
  { 
    id: 'classify', 
    label: 'AI Classify', 
    icon: Brain, 
    path: '/classify', 
    color: 'green',
    description: 'Smart organization'
  },
  { 
    id: 'cabinets', 
    label: 'Cabinets', 
    icon: FolderOpen, 
    path: '/cabinets', 
    color: 'orange',
    description: 'File management'
  },
];

export const NavigationBar: React.FC<NavigationBarProps> = ({ className }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      {/* Desktop Navigation Bar */}
      <nav className={cn(
        "relative bg-black/90 backdrop-blur-xl border-b border-white/10",
        className
      )}>
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 0% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 0% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
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
                <div className="hidden md:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                    Image Cabinet
                  </h1>
                </div>
              </Link>

              {/* Desktop Navigation Items */}
              <div className="hidden md:flex items-center ml-10 space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={cn(
                        "relative px-4 py-2 rounded-lg transition-all duration-200 group",
                        "flex items-center space-x-2",
                        isActive 
                          ? "bg-white/10 text-white" 
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-pink-400/20 rounded-lg"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                      
                      <Icon className={cn(
                        "w-4 h-4 relative z-10",
                        isActive && item.color === 'cyan' && "text-cyan-400",
                        isActive && item.color === 'pink' && "text-pink-400",
                        isActive && item.color === 'yellow' && "text-yellow-400",
                        isActive && item.color === 'green' && "text-green-400",
                        isActive && item.color === 'orange' && "text-orange-400"
                      )} />
                      <span className="text-sm font-medium relative z-10">{item.label}</span>
                      
                      {/* Hover tooltip */}
                      <AnimatePresence>
                        {!isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-gray-900 rounded-lg text-xs whitespace-nowrap pointer-events-none z-50"
                          >
                            {item.description}
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Quick Add */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg text-black font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </motion.button>

              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full animate-ping" />
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              >
                <AnimatePresence mode="wait">
                  {isDarkMode ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Profile Dropdown */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-pink-400 p-[2px]">
                    <div className="w-full h-full rounded-md bg-black flex items-center justify-center">
                      <span className="text-xs font-bold text-white">JD</span>
                    </div>
                  </div>
                  <ChevronDown className={cn(
                    "w-4 h-4 text-gray-400 transition-transform hidden sm:block",
                    isProfileOpen && "rotate-180"
                  )} />
                </motion.button>

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden z-50"
                    >
                      <div className="p-3 border-b border-gray-800">
                        <p className="text-sm font-medium text-white">John Doe</p>
                        <p className="text-xs text-gray-400">john@example.com</p>
                      </div>
                      <div className="p-1">
                        <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors">
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors">
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors">
                          <HelpCircle className="w-4 h-4" />
                          <span>Help</span>
                        </button>
                        <div className="border-t border-gray-800 mt-1 pt-1">
                          <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-md transition-colors">
                            <LogOut className="w-4 h-4" />
                            <span>Sign out</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 z-40"
            >
              <div className="max-w-3xl mx-auto p-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search images, categories, or use AI prompts..."
                    autoFocus
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 transition-colors"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    <kbd className="px-2 py-1 text-xs bg-white/10 rounded border border-white/20 text-gray-400">ESC</kbd>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-gray-900 border-l border-white/10"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h2 className="text-lg font-semibold text-white">Menu</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              
              <nav className="p-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={toggleMobileMenu}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                        isActive 
                          ? "bg-white/10 text-white" 
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <Icon className={cn(
                        "w-5 h-5",
                        isActive && item.color === 'cyan' && "text-cyan-400",
                        isActive && item.color === 'pink' && "text-pink-400",
                        isActive && item.color === 'yellow' && "text-yellow-400",
                        isActive && item.color === 'green' && "text-green-400",
                        isActive && item.color === 'orange' && "text-orange-400"
                      )} />
                      <div className="flex-1">
                        <p className="font-medium">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                    </Link>
                  );
                })}
                
                <div className="border-t border-white/10 mt-4 pt-4">
                  <Link
                    to="/settings"
                    onClick={toggleMobileMenu}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                  </Link>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};