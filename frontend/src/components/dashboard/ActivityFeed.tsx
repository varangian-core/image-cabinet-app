import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, Folder } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ActivityItem {
  id: number;
  type: string;
  message: string;
  timestamp: Date;
  icon: React.ElementType;
  color: 'cyan' | 'pink' | 'yellow';
}

const iconMap = {
  upload: Upload,
  classify: Sparkles,
  organize: Folder,
};

const colorStyles = {
  cyan: 'bg-cyan-400/10 text-cyan-400',
  pink: 'bg-pink-400/10 text-pink-400',
  yellow: 'bg-yellow-400/10 text-yellow-400',
};

interface ActivityFeedProps {
  items: ActivityItem[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ items }) => {
  return (
    <div className="space-y-3 max-h-[200px] overflow-y-auto">
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Waiting for activity...</p>
      ) : (
        items.map((item) => {
          const Icon = item.icon;
          const colorClass = colorStyles[item.color];
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className={cn("p-2 rounded-lg", colorClass)}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          );
        })
      )}
    </div>
  );
};