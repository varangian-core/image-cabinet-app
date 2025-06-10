import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  { id: 'upload', label: 'Upload', icon: Upload, path: '/upload', color: 'pink' },
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

  return (
    <aside className={cn(
      "relative bg-[var(--dark-surface)] border-r border-[var(--dark-border)] h-screen flex flex-col transition-all duration-300",
      isCollapsed ? "w-20" : "w-64",
      className
    )}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-pink-500/5 pointer-events-none" />
      
      {/* Header */}
      <div className="relative p-6 flex items-center justify-between">
        <Link 
          to="/" 
          className={cn(
            "flex items-center gap-3 transition-all duration-300",
            isCollapsed && "justify-center"
          )}
        >
          <div className="relative">
            <Sparkles className="w-8 h-8 text-cyan-400" />
            <div className="absolute inset-0 blur-md bg-cyan-400/50" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                Image Cabinet
              </h1>
              <p className="text-xs text-gray-500">AI-Powered Organization</p>
            </div>
          )}
        </Link>
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400"
        >
          {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="relative flex-1 px-3 pb-3 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const colorClass = colorMap[item.color as keyof typeof colorMap];
            const activeClass = activeColorMap[item.color as keyof typeof activeColorMap];
            
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={cn(
                    "relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                    "hover:bg-white/5 border-2 border-transparent",
                    isActive ? activeClass : "hover:border-white/10",
                    isCollapsed && "justify-center"
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full transition-all",
                      item.color === 'cyan' && "bg-cyan-400",
                      item.color === 'pink' && "bg-pink-400",
                      item.color === 'yellow' && "bg-yellow-400",
                      item.color === 'green' && "bg-green-400",
                      item.color === 'orange' && "bg-orange-400",
                      item.color === 'purple' && "bg-purple-400"
                    )} />
                  )}
                  
                  <div className="relative">
                    <Icon className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "" : colorClass
                    )} />
                    {isActive && (
                      <div className={cn(
                        "absolute inset-0 blur-md",
                        item.color === 'cyan' && "bg-cyan-400/50",
                        item.color === 'pink' && "bg-pink-400/50",
                        item.color === 'yellow' && "bg-yellow-400/50",
                        item.color === 'green' && "bg-green-400/50",
                        item.color === 'orange' && "bg-orange-400/50",
                        item.color === 'purple' && "bg-purple-400/50"
                      )} />
                    )}
                  </div>
                  
                  {!isCollapsed && (
                    <span className={cn(
                      "font-medium text-sm transition-all",
                      isActive ? "" : "text-gray-300 group-hover:text-white"
                    )}>
                      {item.label}
                    </span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 rounded-md text-xs whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                      {item.label}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Footer */}
      <div className="relative p-4 border-t border-[var(--dark-border)]">
        <div className={cn(
          "flex items-center gap-3",
          isCollapsed && "justify-center"
        )}>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-pink-400 p-[2px]">
              <div className="w-full h-full rounded-full bg-[var(--dark-surface)] flex items-center justify-center">
                <span className="text-sm font-bold">JD</span>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[var(--dark-surface)]" />
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-500">Pro Plan</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};