import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: React.ElementType;
  trend?: number;
  color: 'cyan' | 'pink' | 'yellow' | 'green' | 'orange' | 'purple' | 'blue' | 'red' | 'lime' | 'magenta' | 'teal' | 'violet';
  delay?: number;
}

const colorStyles = {
  cyan: {
    glow: 'bg-cyan-400',
    icon: 'bg-cyan-400/20 text-cyan-400',
    gradient: 'from-cyan-400 to-blue-400',
    text: 'text-cyan-400',
  },
  pink: {
    glow: 'bg-pink-400',
    icon: 'bg-pink-400/20 text-pink-400',
    gradient: 'from-pink-400 to-purple-400',
    text: 'text-pink-400',
  },
  yellow: {
    glow: 'bg-yellow-400',
    icon: 'bg-yellow-400/20 text-yellow-400',
    gradient: 'from-yellow-400 to-orange-400',
    text: 'text-yellow-400',
  },
  green: {
    glow: 'bg-green-400',
    icon: 'bg-green-400/20 text-green-400',
    gradient: 'from-green-400 to-teal-400',
    text: 'text-green-400',
  },
  orange: {
    glow: 'bg-orange-400',
    icon: 'bg-orange-400/20 text-orange-400',
    gradient: 'from-orange-400 to-red-400',
    text: 'text-orange-400',
  },
  purple: {
    glow: 'bg-purple-400',
    icon: 'bg-purple-400/20 text-purple-400',
    gradient: 'from-purple-400 to-pink-400',
    text: 'text-purple-400',
  },
  blue: {
    glow: 'bg-blue-400',
    icon: 'bg-blue-400/20 text-blue-400',
    gradient: 'from-blue-400 to-cyan-400',
    text: 'text-blue-400',
  },
  red: {
    glow: 'bg-red-400',
    icon: 'bg-red-400/20 text-red-400',
    gradient: 'from-red-400 to-pink-400',
    text: 'text-red-400',
  },
  lime: {
    glow: 'bg-lime-400',
    icon: 'bg-lime-400/20 text-lime-400',
    gradient: 'from-lime-400 to-green-400',
    text: 'text-lime-400',
  },
  magenta: {
    glow: 'bg-fuchsia-400',
    icon: 'bg-fuchsia-400/20 text-fuchsia-400',
    gradient: 'from-fuchsia-400 to-purple-400',
    text: 'text-fuchsia-400',
  },
  teal: {
    glow: 'bg-teal-400',
    icon: 'bg-teal-400/20 text-teal-400',
    gradient: 'from-teal-400 to-cyan-400',
    text: 'text-teal-400',
  },
  violet: {
    glow: 'bg-violet-400',
    icon: 'bg-violet-400/20 text-violet-400',
    gradient: 'from-violet-400 to-purple-400',
    text: 'text-violet-400',
  },
};

export const StatCard: React.FC<StatCardProps> = ({ title, value, suffix, icon: Icon, trend, color, delay = 0 }) => {
  const isPositive = trend && trend > 0;
  const styles = colorStyles[color];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group cursor-pointer"
    >
      <div className={cn(
        "absolute inset-0 rounded-3xl opacity-30 blur-2xl transition-all duration-300 group-hover:opacity-50",
        styles.glow
      )} />
      
      <div className="relative bg-[var(--dark-surface)] border-2 border-[var(--dark-border)] rounded-3xl p-8 overflow-hidden">
        {/* Background gradient */}
        <div className={cn(
          "absolute inset-0 opacity-10 bg-gradient-to-br",
          styles.gradient
        )} />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className={cn("p-4 rounded-2xl backdrop-blur-sm", styles.icon)}>
              <Icon className="w-8 h-8" />
            </div>
            
            {trend && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: delay + 0.3 }}
                className={cn(
                  "flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold",
                  isPositive ? "bg-green-400/20 text-green-400" : "bg-red-400/20 text-red-400"
                )}
              >
                {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {Math.abs(trend)}%
              </motion.div>
            )}
          </div>
          
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">{title}</h3>
          <div className={cn("text-5xl font-black", styles.text)}>
            <CountUp end={value} duration={2} delay={delay} separator="," />
            {suffix && <span className="text-4xl ml-1">{suffix}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};