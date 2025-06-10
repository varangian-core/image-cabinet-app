import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, BarChart, Bar
} from 'recharts';
import { 
  Upload, Image, Activity, Zap, 
  Folder, Sparkles, Brain, Database,
  TrendingUp, Users, FileCheck, Clock, Tag
} from 'lucide-react';
import { cn } from '../lib/utils';
import { StatCard } from '../components/dashboard/StatCard';
import { StatWidget } from '../components/dashboard/StatWidget';
import { CompactStatWidget } from '../components/dashboard/CompactStatWidget';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';

// Enhanced mock data
const uploadTrendData = [
  { day: 'Mon', uploads: 45, processed: 42 },
  { day: 'Tue', uploads: 52, processed: 48 },
  { day: 'Wed', uploads: 38, processed: 35 },
  { day: 'Thu', uploads: 65, processed: 60 },
  { day: 'Fri', uploads: 48, processed: 45 },
  { day: 'Sat', uploads: 72, processed: 68 },
  { day: 'Sun', uploads: 58, processed: 55 },
];

const categoryData = [
  { name: 'Family', value: 342, color: '#00ffff' },
  { name: 'Work', value: 289, color: '#ff00ff' },
  { name: 'Travel', value: 234, color: '#ffff00' },
  { name: 'Screenshots', value: 198, color: '#00ff00' },
  { name: 'Documents', value: 156, color: '#ff6600' },
  { name: 'Nature', value: 134, color: '#cc00ff' },
  { name: 'Events', value: 112, color: '#0099ff' },
  { name: 'Others', value: 89, color: '#ff0066' },
];

const storageData = [
  { name: 'Used', value: 75, fill: '#00ffff' },
  { name: 'Free', value: 25, fill: '#1a1a1a' },
];

const performanceData = [
  { hour: '00', speed: 12, accuracy: 94 },
  { hour: '04', speed: 8, accuracy: 92 },
  { hour: '08', speed: 24, accuracy: 96 },
  { hour: '12', speed: 32, accuracy: 95 },
  { hour: '16', speed: 28, accuracy: 97 },
  { hour: '20', speed: 18, accuracy: 93 },
];

export const Dashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  const [activityItems, setActivityItems] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const activities = [
        { type: 'upload', message: 'New batch uploaded', icon: Upload, color: 'cyan' as const },
        { type: 'classify', message: 'AI classification completed', icon: Sparkles, color: 'pink' as const },
        { type: 'organize', message: 'Auto-organized into cabinets', icon: Folder, color: 'yellow' as const },
      ];
      
      const randomActivity = activities[Math.floor(Math.random() * activities.length)];
      setActivityItems(prev => [
        { ...randomActivity, id: Date.now(), timestamp: new Date() },
        ...prev.slice(0, 4)
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent mb-4">
          Image Cabinet Dashboard
        </h1>
        <p className="text-xl text-gray-400">Real-time insights into your AI-powered image organization</p>
      </motion.div>

      {/* Main Charts Grid - 2 per row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Upload & Processing Trend */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[var(--dark-surface)] border-2 border-[var(--dark-border)] rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-400/5" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Upload & Processing Activity</h2>
              <div className="flex gap-2">
                {['day', 'week', 'month'].map(range => (
                  <button
                    key={range}
                    onClick={() => setSelectedTimeRange(range)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                      selectedTimeRange === range
                        ? "bg-gradient-to-r from-cyan-400 to-blue-400 text-black"
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={uploadTrendData}>
                <defs>
                  <linearGradient id="uploadGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ffff" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00ffff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="processedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff00ff" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ff00ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="day" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--dark-elevated)',
                    border: '1px solid var(--dark-border)',
                    borderRadius: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="uploads"
                  stroke="#00ffff"
                  fillOpacity={1}
                  fill="url(#uploadGradient)"
                  strokeWidth={3}
                />
                <Area
                  type="monotone"
                  dataKey="processed"
                  stroke="#ff00ff"
                  fillOpacity={1}
                  fill="url(#processedGradient)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
            
            <div className="flex gap-6 mt-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-cyan-400" />
                <span className="text-sm text-gray-400">Uploads</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-pink-400" />
                <span className="text-sm text-gray-400">Processed</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[var(--dark-surface)] border-2 border-[var(--dark-border)] rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400/5 to-purple-400/5" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-6">Category Distribution</h2>
            
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={140}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--dark-elevated)',
                    border: '1px solid var(--dark-border)',
                    borderRadius: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-4xl font-bold">1,554</p>
              <p className="text-sm text-gray-400">Total Images</p>
            </div>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[var(--dark-surface)] border-2 border-[var(--dark-border)] rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-400/5" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-6">AI Performance Metrics</h2>
            
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="hour" stroke="#666" />
                <YAxis yAxisId="left" stroke="#666" />
                <YAxis yAxisId="right" orientation="right" stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--dark-elevated)',
                    border: '1px solid var(--dark-border)',
                    borderRadius: '12px',
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="speed"
                  stroke="#ffff00"
                  strokeWidth={3}
                  dot={{ fill: '#ffff00', r: 6 }}
                  activeDot={{ r: 8 }}
                  name="Speed (img/min)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#00ff00"
                  strokeWidth={3}
                  dot={{ fill: '#00ff00', r: 6 }}
                  activeDot={{ r: 8 }}
                  name="Accuracy %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Storage Usage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-[var(--dark-surface)] border-2 border-[var(--dark-border)] rounded-3xl p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-teal-400/5" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-6">Storage Analytics</h2>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={storageData}>
                    <RadialBar dataKey="value" fill="#00ffff" />
                    <Tooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="text-center mt-4">
                  <p className="text-3xl font-bold text-cyan-400">75%</p>
                  <p className="text-sm text-gray-400">Storage Used</p>
                </div>
              </div>
              
              <div className="space-y-4 flex flex-col justify-center">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Total Capacity</span>
                    <span className="font-bold">500 GB</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Images</span>
                    <span className="font-bold text-pink-400">375 GB</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Thumbnails</span>
                    <span className="font-bold text-yellow-400">45 GB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Metadata</span>
                    <span className="font-bold text-green-400">5 GB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* System Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-12 space-y-8 overflow-visible"
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
          System Overview
        </h2>
        
        {/* Compact Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <CompactStatWidget
            title="Total Images"
            value={12486}
            icon={Image}
            trend={12}
            color="cyan"
            delay={0}
          />
          <CompactStatWidget
            title="Processing"
            value={87}
            icon={Zap}
            trend={-5}
            color="pink"
            delay={0.05}
          />
          <CompactStatWidget
            title="Cabinets"
            value={24}
            icon={Folder}
            trend={8}
            color="yellow"
            delay={0.1}
          />
          <CompactStatWidget
            title="AI Accuracy"
            value={96}
            suffix="%"
            icon={Brain}
            trend={3}
            color="green"
            delay={0.15}
          />
          <CompactStatWidget
            title="Users Online"
            value={8}
            icon={Users}
            trend={15}
            color="blue"
            delay={0.2}
          />
          <CompactStatWidget
            title="Categories"
            value={15}
            icon={Tag}
            trend={20}
            color="violet"
            delay={0.25}
          />
        </div>

        {/* Advanced Visualizations */}
        <div className="grid grid-cols-3 gap-6 overflow-visible">
          <StatWidget
            title="Processing Speed"
            value={24}
            suffix="/min"
            icon={TrendingUp}
            trend={10}
            color="cyan"
            type="area"
            subtitle="2x faster than last month"
            delay={0.3}
          />
          <StatWidget
            title="Storage Analytics"
            value={425}
            suffix="GB"
            icon={Database}
            trend={5}
            color="pink"
            type="circular"
            percentage={75}
            subtitle="75 GB free"
            delay={0.4}
          />
          <StatWidget
            title="Success Rate"
            value={99.2}
            suffix="%"
            icon={FileCheck}
            trend={2}
            color="green"
            type="circular"
            percentage={99}
            subtitle="Zero failures today"
            delay={0.5}
          />
        </div>
      </motion.div>

      {/* Activity Feed - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-[var(--dark-surface)] border-2 border-[var(--dark-border)] rounded-3xl p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Live Activity Stream</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">Live Updates</span>
            </div>
            <Activity className="w-6 h-6 text-yellow-400 animate-spin" />
          </div>
        </div>
        
        <div className="max-h-[300px] overflow-y-auto">
          <ActivityFeed items={activityItems} />
        </div>
      </motion.div>
    </div>
  );
};