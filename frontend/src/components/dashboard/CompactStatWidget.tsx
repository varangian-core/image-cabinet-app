import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CompactStatWidgetProps {
  title: string;
  value: number;
  suffix?: string;
  icon: React.ElementType;
  trend?: number;
  color: string;
  delay?: number;
}

const colorMap: Record<string, any> = {
  cyan: {
    primary: '#00ffff',
    gradient: 'from-cyan-400/20 to-cyan-400/5',
    icon: 'text-cyan-400 bg-cyan-400/20',
    iconGlow: 'shadow-cyan-400/50',
  },
  pink: {
    primary: '#ff00ff',
    gradient: 'from-pink-400/20 to-pink-400/5',
    icon: 'text-pink-400 bg-pink-400/20',
    iconGlow: 'shadow-pink-400/50',
  },
  yellow: {
    primary: '#ffff00',
    gradient: 'from-yellow-400/20 to-yellow-400/5',
    icon: 'text-yellow-400 bg-yellow-400/20',
    iconGlow: 'shadow-yellow-400/50',
  },
  green: {
    primary: '#00ff00',
    gradient: 'from-green-400/20 to-green-400/5',
    icon: 'text-green-400 bg-green-400/20',
    iconGlow: 'shadow-green-400/50',
  },
  blue: {
    primary: '#0099ff',
    gradient: 'from-blue-400/20 to-blue-400/5',
    icon: 'text-blue-400 bg-blue-400/20',
    iconGlow: 'shadow-blue-400/50',
  },
  violet: {
    primary: '#9900ff',
    gradient: 'from-violet-400/20 to-violet-400/5',
    icon: 'text-violet-400 bg-violet-400/20',
    iconGlow: 'shadow-violet-400/50',
  },
  orange: {
    primary: '#ff6600',
    gradient: 'from-orange-400/20 to-orange-400/5',
    icon: 'text-orange-400 bg-orange-400/20',
    iconGlow: 'shadow-orange-400/50',
  },
  red: {
    primary: '#ff0066',
    gradient: 'from-red-400/20 to-red-400/5',
    icon: 'text-red-400 bg-red-400/20',
    iconGlow: 'shadow-red-400/50',
  },
};

export const CompactStatWidget: React.FC<CompactStatWidgetProps> = ({ 
  title, 
  value, 
  suffix, 
  icon: Icon, 
  trend, 
  color, 
  delay = 0
}) => {
  const colors = colorMap[color] || colorMap.cyan;
  const isPositive = trend && trend > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -2, zIndex: 30 }}
      className="relative group cursor-pointer"
      style={{ zIndex: 1 }}
    >
      <div className={cn(
        "relative bg-[var(--dark-surface)] border border-[var(--dark-border)] rounded-2xl p-4",
        "hover:border-opacity-50 transition-all duration-300",
        `hover:border-${color}-400/50`
      )}>
        {/* Background gradient */}
        <div className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br",
          colors.gradient
        )} />

        <div className="relative z-10 flex items-center gap-4">
          {/* Icon */}
          <motion.div 
            className={cn("p-3 rounded-xl shadow-lg", colors.icon, colors.iconGlow)}
            whileHover={{ 
              scale: 1.1,
              rotate: 10
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Icon className="w-5 h-5 drop-shadow-sm" />
          </motion.div>

          {/* Content */}
          <div className="flex-1">
            <p className="text-xs text-gray-500 uppercase tracking-wider">{title}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span 
                className="text-2xl font-bold"
                style={{ color: colors.primary }}
              >
                <CountUp 
                  end={value} 
                  duration={2} 
                  delay={delay} 
                  separator="," 
                />
                {suffix && <span className="text-xl ml-1">{suffix}</span>}
              </span>
              {trend && (
                <span className={cn(
                  "flex items-center gap-0.5 text-xs font-medium",
                  isPositive ? "text-green-400" : "text-red-400"
                )}>
                  {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(trend)}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};