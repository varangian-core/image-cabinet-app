import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { 
  Search, 
  Bell, 
  Command, 
  Zap,
  Moon,
  Sun,
  Sparkles,
  Plus
} from 'lucide-react';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <header className={cn(
      "relative h-16 bg-[var(--dark-surface)] border-b border-[var(--dark-border)] flex items-center justify-between px-6 z-10",
      className
    )}>
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
      
      {/* Search Section */}
      <div className="flex-1 max-w-2xl relative">
        <div className={cn(
          "relative transition-all duration-300",
          isSearchFocused && "scale-[1.02]"
        )}>
          {/* Search glow effect */}
          {isSearchFocused && (
            <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-2xl" />
          )}
          
          <div className="relative flex items-center">
            <Search className={cn(
              "absolute left-4 w-5 h-5 transition-colors",
              isSearchFocused ? "text-cyan-400" : "text-gray-500"
            )} />
            
            <input
              type="text"
              placeholder="Search images, categories, or use AI prompts..."
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={cn(
                "w-full pl-12 pr-24 py-3 bg-[var(--dark-elevated)] rounded-2xl",
                "border-2 transition-all duration-300 outline-none",
                "placeholder:text-gray-600 text-gray-200",
                isSearchFocused 
                  ? "border-cyan-400/50 shadow-lg shadow-cyan-400/10" 
                  : "border-transparent hover:border-gray-700"
              )}
            />
            
            {/* AI Search indicator */}
            <div className="absolute right-3 flex items-center gap-2">
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-800 rounded-lg border border-gray-700">
                <Command className="w-3 h-3" />
                K
              </kbd>
              <div className="p-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-pink-400">
                <Sparkles className="w-4 h-4 text-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Actions Section */}
      <div className="flex items-center gap-3 ml-6">
        {/* Quick Add Button */}
        <button className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
          <div className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-xl font-medium text-black">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Quick Add</span>
          </div>
        </button>
        
        {/* Theme Toggle */}
        <button className="p-2 rounded-xl hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
          <Moon className="w-5 h-5" />
        </button>
        
        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
          <Bell className="w-5 h-5" />
          {hasNotifications && (
            <>
              <span className="absolute top-1 right-1 w-2 h-2 bg-pink-400 rounded-full" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-pink-400 rounded-full animate-ping" />
            </>
          )}
        </button>
        
        {/* Activity Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--dark-elevated)] rounded-xl border border-gray-800">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-gray-300">
            <span className="text-yellow-400">23</span> processing
          </span>
        </div>
      </div>
    </header>
  );
};