import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { 
  ResponsiveContainer, 
  AreaChart, Area, 
  LineChart, Line,
  BarChart, Bar,
  RadialBarChart, RadialBar, PolarAngleAxis
} from 'recharts';
import { cn } from '../../lib/utils';

interface StatWidgetProps {
  title: string;
  value: number;
  suffix?: string;
  icon: React.ElementType;
  trend?: number;
  color: string;
  delay?: number;
  type?: 'circular' | 'bar' | 'area' | 'line';
  miniChartData?: any[];
  percentage?: number;
  subtitle?: string;
}

const colorMap: Record<string, any> = {
  cyan: {
    primary: '#00ffff',
    secondary: '#0099ff',
    gradient: 'from-cyan-400 to-blue-400',
    glow: 'shadow-cyan-400/50',
    bg: 'bg-cyan-400/30',
    icon: 'text-cyan-400 shadow-lg shadow-cyan-400/50',
    border: 'border-cyan-400/50',
  },
  pink: {
    primary: '#ff00ff',
    secondary: '#ff0099',
    gradient: 'from-pink-400 to-purple-400',
    glow: 'shadow-pink-400/50',
    bg: 'bg-pink-400/30',
    icon: 'text-pink-400 shadow-lg shadow-pink-400/50',
    border: 'border-pink-400/50',
  },
  yellow: {
    primary: '#ffff00',
    secondary: '#ff9900',
    gradient: 'from-yellow-400 to-orange-400',
    glow: 'shadow-yellow-400/50',
    bg: 'bg-yellow-400/30',
    icon: 'text-yellow-400 shadow-lg shadow-yellow-400/50',
    border: 'border-yellow-400/50',
  },
  green: {
    primary: '#00ff00',
    secondary: '#00cc00',
    gradient: 'from-green-400 to-teal-400',
    glow: 'shadow-green-400/50',
    bg: 'bg-green-400/30',
    icon: 'text-green-400 shadow-lg shadow-green-400/50',
    border: 'border-green-400/50',
  },
  blue: {
    primary: '#0099ff',
    secondary: '#0066ff',
    gradient: 'from-blue-400 to-indigo-400',
    glow: 'shadow-blue-400/50',
    bg: 'bg-blue-400/30',
    icon: 'text-blue-400 shadow-lg shadow-blue-400/50',
    border: 'border-blue-400/50',
  },
  violet: {
    primary: '#9900ff',
    secondary: '#6600ff',
    gradient: 'from-violet-400 to-purple-400',
    glow: 'shadow-violet-400/50',
    bg: 'bg-violet-400/30',
    icon: 'text-violet-400 shadow-lg shadow-violet-400/50',
    border: 'border-violet-400/50',
  },
};

const generateMiniChartData = (type: string) => {
  if (type === 'area' || type === 'line') {
    return Array.from({ length: 7 }, (_, i) => ({
      day: i,
      value: Math.floor(Math.random() * 50) + 20
    }));
  }
  if (type === 'bar') {
    return Array.from({ length: 5 }, (_, i) => ({
      name: `D${i + 1}`,
      value: Math.floor(Math.random() * 100) + 50
    }));
  }
  return [];
};

export const StatWidget: React.FC<StatWidgetProps> = ({ 
  title, 
  value, 
  suffix, 
  icon: Icon, 
  trend, 
  color, 
  delay = 0,
  type = 'circular',
  miniChartData,
  percentage,
  subtitle
}) => {
  const colors = colorMap[color] || colorMap.cyan;
  const chartData = miniChartData || generateMiniChartData(type);
  const circularData = [{ value: percentage || 75, fill: colors.primary }];

  const renderChart = () => {
    switch (type) {
      case 'circular':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <ResponsiveContainer width={200} height={200}>
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="65%" 
                outerRadius="85%" 
                data={circularData}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  background
                  dataKey="value"
                  cornerRadius={10}
                  fill={colors.primary}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'area':
        return (
          <div className="absolute bottom-0 left-0 right-0 h-20 opacity-50">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={colors.primary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={colors.primary}
                  strokeWidth={2}
                  fill={`url(#gradient-${color})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );

      case 'line':
        return (
          <div className="absolute bottom-0 left-0 right-0 h-20 opacity-50">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={colors.primary}
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );

      case 'bar':
        return (
          <div className="absolute bottom-0 left-0 right-0 h-20 opacity-50">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <Bar dataKey="value" fill={colors.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5, zIndex: 50 }}
      className="relative group cursor-pointer p-4"
      style={{ zIndex: 1 }}
    >
      {/* Glow effect */}
      <motion.div
        className={cn(
          "absolute inset-4 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300",
          colors.bg.replace('/30', '')
        )}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Main card */}
      <div className={cn(
        "relative bg-[var(--dark-surface)] border-2 rounded-3xl",
        colors.border,
        "shadow-2xl",
        colors.glow,
        "max-w-sm mx-auto",
        "overflow-visible"
      )}>
        {/* Clipped background container */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          {/* Background gradient */}
          <div className={cn(
            "absolute inset-0 opacity-5 bg-gradient-to-br",
            colors.gradient
          )} />

          {/* Chart background */}
          {renderChart()}
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 h-48 overflow-visible">
          {/* Icon - positioned absolutely for better control */}
          <motion.div 
            className={cn(
              "absolute top-6 left-6 p-3 rounded-2xl backdrop-blur-sm",
              colors.bg, colors.icon
            )}
            style={{ zIndex: 30 }}
            whileHover={{ 
              x: 15,
              y: -15,
              scale: 1.15,
              rotate: 15,
              zIndex: 40
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Icon className="w-6 h-6 drop-shadow-md" />
          </motion.div>

          {/* Trend indicator - top right */}
          {trend && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.3 }}
              className={cn(
                "absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm",
                trend > 0 ? "bg-green-400/20 text-green-400" : "bg-red-400/20 text-red-400"
              )}
            >
              {trend > 0 ? '+' : ''}{trend}%
            </motion.div>
          )}

          {/* Main content - adjusted spacing */}
          <div className={cn(
            "flex flex-col justify-center h-full",
            type === 'circular' ? 'items-center text-center' : 'items-start pt-16'
          )}>
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">
              {title}
            </h3>
            
            <div className="mb-2">
              <span 
                className="text-4xl font-black"
                style={{ color: colors.primary }}
              >
                <CountUp 
                  end={value} 
                  duration={2} 
                  delay={delay} 
                  separator="," 
                />
              </span>
              {suffix && (
                <span 
                  className="text-2xl font-bold ml-1"
                  style={{ color: colors.secondary }}
                >
                  {suffix}
                </span>
              )}
            </div>

            {subtitle && (
              <p className="text-xs text-gray-500">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
            padding: '2px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </motion.div>
  );
};